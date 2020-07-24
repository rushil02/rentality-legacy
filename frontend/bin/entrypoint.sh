#!/bin/sh

node /app/bin/wait_for_backend.js
gatsby build --log-pages --write-to-file

echo "Starting cron service ..."
crond -f -d 8
