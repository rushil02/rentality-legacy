#!/usr/bin/env bash

# for resetting database in maintenance mode
pg_dump rentality > sql_dump_201804300314UTC.sql
# migrate
# databack