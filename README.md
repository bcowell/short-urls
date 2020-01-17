# short-urls

## Overview
A React/Node app to reduce the length of a URL

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
Backend REST API accepts a URL and returns a shortened URL

Accessing or requesting a shortened URL redirects to the full URL

Frontend is a simple input that allows the user to enter a URL and view the shortened version

### Data Model

### Possible Limitations

### Performance

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
    - Change destination URL after the fact
    - Monitor link health & uptime

## License
MIT