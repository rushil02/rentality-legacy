#!/usr/bin/env bash

docker-compose up -d --build postgres
schema_dump_file="$(find . -type f -iname "schema_dump_*.sql"  |  head -n 1)"
data_dump_file="$(find . -type f -iname "init_data_dump_*.sql"  |  head -n 1)"

echo "Using dump files - $schema_dump_file and $data_dump_file"
echo "Waiting for postgres to start ... (20)"
sleep 20
docker-compose exec -T postgres psql rentality < "$schema_dump_file"
docker-compose exec -T postgres psql rentality < "$data_dump_file"
