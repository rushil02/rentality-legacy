#!/usr/bin/env bash

read -p "REMOVE ALL previous frontend contaienrs? [y/n] :" opt

if [ "$opt" = "y" ]; then
    docker container stop $(docker container ls -aq --filter ancestor=registry.gitlab.com/rushil0195/rentality/frontend)
fi

echo "Starting new Container..."
docker run -it --entrypoint=sh --volume="$PWD"/frontend:/app registry.gitlab.com/rushil0195/rentality/frontend
