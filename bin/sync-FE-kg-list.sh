#!/usr/bin/env bash

CONTAINER_ID=$(docker ps -q --filter ancestor=rentality/frontend | head -n 1)

echo "Working with container: $CONTAINER_ID"

docker cp "$CONTAINER_ID":/app/package.json ./frontend/app/package.json
docker cp "$CONTAINER_ID":/app/package-lock.json ./frontend/app/package-lock.json

echo "package.json & package-lock.json Synced"

