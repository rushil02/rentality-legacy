FROM node:14-alpine

ARG dev_mode=false
ENV GATSBY_TELEMETRY_DISABLED=1

# Required if accessing packages on git via npm
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true

RUN npm install -g npm@latest

RUN npm install -g gatsby-cli

WORKDIR /app

COPY ext_lib ./ext_lib
COPY ./app/package*.json ./

RUN npm ci

COPY ./app/gatsby-*.js ./
COPY ./app/.env.* ./
COPY ./app/.prettier* ./
COPY ./start_dev.sh ./
COPY ./app/src ./src

CMD ["gatsby", "build"]
