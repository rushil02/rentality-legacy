#!/bin/sh

cp -f /run/secrets/COMM_ENV /app/.env.production
node /app/bin/wait_for_backend.js
gatsby build --log-pages --write-to-file

echo "Starting cron service ..."
crond -f -d 8
