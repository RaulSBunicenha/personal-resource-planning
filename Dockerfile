FROM node:10

RUN npm i -g nodemon

WORKDIR /dev-app

COPY package.json /dev-app/package.json

RUN npm install

COPY . /dev-app/
