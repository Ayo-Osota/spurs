FROM node:alpine

WORKDIR /api

COPY package.json ./

RUN npm install