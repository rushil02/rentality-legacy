#!/bin/sh

node /app/bin/wait_for_backend.js
unset GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES
gatsby develop -H 0.0.0.0 -p 8000
