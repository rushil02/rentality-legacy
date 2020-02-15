FROM registry.gitlab.com/rushil0195/rentality/shared:latest as shared

FROM node:11-alpine

# Required if accessing packages on git via npm
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN npm install -g npm@latest

WORKDIR /app

COPY ext_lib ./ext_lib
COPY ./package*.json ./

RUN npm ci

COPY webpack.config.js .

COPY src ./src

COPY --from=shared /shared/PUBLIC_KEYS /run/secrets/PUBLIC_KEYS

RUN ["npm", "run", "build"]