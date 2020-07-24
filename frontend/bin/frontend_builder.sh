#!/bin/sh

node /app/bin/wait_for_backend.js
echo "*************** Building gatsby ( $(date '+%d/%m/%Y %H:%M:%S') ) ... ***************"
cd /app && gatsby build --log-pages --write-to-file
echo "*************** Task completed ( $(date '+%d/%m/%Y %H:%M:%S') ) ***************"

