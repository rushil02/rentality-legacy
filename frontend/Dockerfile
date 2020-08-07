FROM node:14-alpine

ENV GATSBY_TELEMETRY_DISABLED=1 \
    GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true

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

COPY ./app/gatsby-*.js ./app/.prettier* ./app/.babelrc ./
COPY ./app/src ./src

COPY ./bin ./bin

COPY ./bin/cronjobs /etc/crontabs/root

RUN ["chmod", "+x", "./bin/entrypoint.sh", "./bin/frontend_builder.sh"]

ENTRYPOINT [ "./bin/entrypoint.sh" ]
