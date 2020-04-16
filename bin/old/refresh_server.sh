#!/usr/bin/env bash

now=$(date +%Y%m%d%H%M%Z)
f_name="../sql_dump/sql_dump_$now.sql"
pg_dump rentality > ${f_name}
dropdb rentality
sudo -u postgres createdb rentality
sudo -u postgres psql -U postgres -d postgres -c "grant all privileges on database rentality to root;"
python manage.py migrate
sudo systemctl daemon-reload
sudo systemctl restart gunicorn_rentality
sudo systemctl restart nginx
python manage.py createsuperuser