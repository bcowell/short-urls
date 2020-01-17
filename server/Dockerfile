FROM node:latest
WORKDIR /server
COPY package*.json ./
RUN yarn install

# Only copy over the node files we need from the above image
# this can reduce the size of your final image by ~35MB or so
FROM node:alpine
COPY --from=0 /server .
COPY . .
RUN yarn run build
CMD [ "yarn", "serve" ]
EXPOSE 3001