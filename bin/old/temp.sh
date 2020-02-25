#!/usr/bin/env bash

# NOT FOR AUTOMATION; REFERENCE SCRIPT ONLY

docker cp ./bin/sql_dump_201807271237UTC.sql "$(docker-compose ps -q postgres)":/home/dump.sql


# for resetting database in maintenance mode
psql rentality < sql_dump_201804300314UTC.sql
# migrate
# databack