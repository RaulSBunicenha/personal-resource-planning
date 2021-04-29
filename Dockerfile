FROM node:15-alpine

RUN npm i -g nodemon

WORKDIR /dev-app

COPY package.json /dev-app/package.json

RUN npm install

COPY . /dev-app/