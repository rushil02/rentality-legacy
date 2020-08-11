#!/bin/sh

# Use this file to run gatsby's server with prod built files by
# replacing `entrypoint` in docker-compose.yml

cp -f /run/secrets/COMM_ENV /app/.env.production
unset GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES
node /app/bin/wait_for_backend.js
gatsby build --log-pages --write-to-file
gatsby serve -H 0.0.0.0 -p 8000
