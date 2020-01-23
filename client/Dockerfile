FROM node:latest
WORKDIR /client
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build
RUN yarn global add serve
CMD serve -s build -l 3000
EXPOSE 3000