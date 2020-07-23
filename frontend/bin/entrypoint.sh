#!/bin/sh

node /app/bin/wait_for_backend.js
gatsby build

echo "Starting cron service ..."
crond -f -d 8
