#!/bin/sh

node /app/bin/wait_for_backend.js
gatsby develop -H 0.0.0.0 -p 8000
