#!/bin/sh

# Use this file to run gatsby's server with prod built files by
# replacing `entrypoint` in docker-compose.yml

node /app/bin/wait_for_backend.js
gatsby build --log-pages --write-to-file
gatsby serve -H 0.0.0.0 -p 8000
