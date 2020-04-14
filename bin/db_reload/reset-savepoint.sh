#!/usr/bin/env bash

# Test migrations using this script with production database schema and migration history.
# Load single dump file "*dump*.sql" in parent folder of this script, be sure there is only one such file.
# Be sure to comment out / disable migration service in docker-compose

# TODO: use schema files isntead

docker-compose down; docker volume prune -f; docker-compose up -d --build postgres
dump_file="$(find . -type f -iname "*dump*.sql"  |  head -n 1)"
echo "Using dump file - $dump_file"
echo "Waiting for postgres to start ... (20)"
sleep 20
docker-compose exec -T postgres psql rentality < "$dump_file"

docker-compose up -d --build

# TODO: ask before migrating
echo "Waiting for container to start ... (3)"
sleep 3
docker-compose exec web python manage.py check
docker-compose exec web python manage.py migrate
echo "Opening web container ... "
docker-compose exec web sh