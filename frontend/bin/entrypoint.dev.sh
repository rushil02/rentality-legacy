#!/bin/sh

cp -f /run/secrets/COMM_ENV /app/.env.development
unset GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES
node /app/bin/wait_for_backend.js
gatsby develop -H 0.0.0.0 -p 8000

