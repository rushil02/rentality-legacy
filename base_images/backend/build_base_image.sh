#!/bin/bash

usage() { echo "Usage: $0 [-p ] to push image. Make sure to run docker login registry.gitlab.com" 1>&2; exit 1; }

VERSION=$(cat ./VERSION)

docker build -t registry.gitlab.com/rushil0195/rentality/backend-geo-base:latest .

while getopts ":p" o; do
    case "${o}" in
        p)
            docker push registry.gitlab.com/rushil0195/rentality/backend-geo-base:v"$VERSION"
            ;;
        *)
            usage
            ;;
    esac
done
