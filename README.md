# short-urls

## Overview
A React/Node app to reduce the length of a URL.

Takes any URL and creates a relatively shortened version that's easier to share.

The shortened hash is generated be encoding an auto-incremented ID in our database.

When the shortened URL is visited we decode the hash back into the ID, fetch the original URL and redirect the user.

## Usage

### Quickstart with docker

Build the individual dockerfiles 

```docker-compose build```

Deploy the stack

```docker-compose up -d```

The following apps will be started 

```
client - http://localhost:3000
server - http://localhost:3001
mongo  - http://localhost:27017
```
Running
```docker-compose down``` will bring down the apps and clean up the containers.


### Development
Both client and server need to be installed before running in development mode

#### ```yarn```
#### ```yarn start```
#### ```docker run -d -p 27017:27017 mongo```

## Architecture
With the following requirements
1. Backend REST API that accepts a URL and returns a shortened URL
2. Accessing a shortened URL issues a 301 and redirects to the full URL
3. Frontend includes an input that allows the user to enter a URL and view the shortened version

My first thoughts
- Expected traffic volume
- Choice of algorithm
- What's the length of the shortened URL?
- Type of database to store links
- Single machine or distributed
- Should links expire?

At the most rudimentary level we could implement a URL shortener by just generating a random string. 
We can guarantee the URLs uniqueness by just doing a lookup in the database and choosing another random string in the odd case of collision.
This obviously doesn't scale very well to handle a lot of URLs.

Another approach would be to generate ids based on timestamp, which you could build on the fly. A counter + timestamp + IP/server address + random number would work well in distributed, large-scale systems.

For this project I've decided to keep it simple and above all else I value no collisions. So I've incorporated the "Hashids" library.

### Hashids
[Hashids](https://hashids.org/) is a small open-source library that generates short, unique, non-sequential ids from numbers.

It converts numbers like 347 into strings like “yr8”, or array of numbers like [27, 986] into “3kTMd”.

You can also decode those ids back.

#### Features
1. Create short unique ids from numbers (positive numbers & zero).
2. Allow custom alphabet as well as salt — so ids are unique only to you.
4. Code is tiny (~350 lines), fast and does not depend on external libraries.
5. Avoids generating the most common english curse words.

### Database

We need a database as we must persist the full-length destination of the shortened URL. 
Fetching the URLs from the database is our first bottleneck. So the type of database could have a large impact on the overall speed of creating and accessing links.

I debated between three types of databases to store the URLs.

1. Relational (T-SQL)
2. NoSQL (MongoDB)
3. In-memory cache (Redis)

In the end I chose MongoDB for the data mostly for it's quick setup, fast writes and simple queries. I've also never used it before and it seemed like a good time to try it out!
I believe redis would also have been a good choice, but long term storage is a bit of an issue. I think redis would be better used as a cache in addition to another database to speed up URL retrievals.
Relational databases have the benefit of human-readable operations and generally I prefer normalization in larger scale projects.
I think if this were to become a long term project I would transition to a relational database.

#### Data Model
##### links 
A collection use to store the URLs and their respective unique ID
```
{
    "_id": 1,
    "url": "https://info-mongodb-com.s3.us-east-1.amazonaws.com/MongoDB_Architecture_Guide.pdf",
    "createdAt": "Fri Jan 17 20:20:37.257",
}
```

##### clicks 
A collection to store the amount of URL redirects.
```
{
    "linkID": 1,
    "clicks": 10
}
```

Obviously to scale this links.createdAt would be stored in either UTC or epoch.

## More thoughts

The next bottleneck will be processing the actual web requests. To fix this, we could scale up to multiple web servers. Having a load balancer in front of our servers that distributes incoming requests would also help. Having multiple servers adds complexity that we'll need to consider, but most technologies are built to scale really well.

Using an ID column in our database as a counter to hash URLs, as you shorten more URLS the counter increases. We could run into problems here using distributed storage if a previous ID is re-used. Adding unique identifiers to machines is a way around this and gives you the benefit of being able to link a hash back to a physical machine.

A larger alphabet would mean URLs shorter possible URLs as there are more unique strings on the same length.
At the same time we should also consider that if these are public links that we probably don't want them to contain curse words.

As the namespace grows the links get longer. We could periodically clean up old links that aren't getting hits. 
It would also be possible on creation to limit the lifetime of the shortened URLs.

## Further Questions
- If we wanted to develop multiple API usage tiers, what are our options? How would this affect the frontend?
    - Free tier with maximum amount of click-throughs (or pay per use model)
    - Varying levels (hobbyist/starter/pro/enterprise) that scale allowed usage
    - Pay for extras (analytics, custom domains)
    - The frontend would have to be protected with auth in order to validate the user's API tier and usage
    - Backend would also need protected and make use of auth headers on request
- If this was an open service how could it be monetized? What features would need to be added?
    - Offer link branding (customize your shortened domain)
    - Improve UX
    - More analytics (# clicks, location, timestamps, peak times by day/month/etc, all displayed in a dashboard)
    - Change destination URL after the fact (edit/delete)
    - Monitor link health & uptime

## License
MIT