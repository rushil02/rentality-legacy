#!/usr/bin/env bash

read -p "REMOVE ALL previous web contaienrs? [y/n] :" opt

if [ "$opt" = "y" ]; then
    docker container stop $(docker container ls -aq --filter ancestor=registry.gitlab.com/rushil0195/rentality/web)
fi

echo "Starting new Container..."
docker run -itd --entrypoint=sh --volume="$PWD"/src:/rentality/src --volume="$PWD"/secrets:/run/secrets registry.gitlab.com/rushil0195/rentality/web

CONTAINER_ID=$(docker ps -q --filter ancestor=registry.gitlab.com/rushil0195/rentality/web --filter status=running | head -n 1)

echo "Working with container: $CONTAINER_ID"

docker exec "$CONTAINER_ID" apk add gcc musl-dev postgresql-dev build-base python-dev py-pip curl
docker exec "$CONTAINER_ID" curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py --output /tmp/get-poetry.py
docker exec "$CONTAINER_ID" python /tmp/get-poetry.py

docker attach $CONTAINER_ID