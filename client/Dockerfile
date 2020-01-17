FROM node:latest
WORKDIR /client
COPY package*.json ./
RUN yarn install

# Only copy over the node files we need from the above image
# this can reduce the size of your final image by ~35MB or so
FROM node:alpine
COPY --from=0 /client .
COPY . .
RUN yarn run build
RUN yarn global add serve
CMD serve -s build -l 3000
EXPOSE 3000