#!/usr/bin/env bash

now=$(date +%Y%m%d%H%M%Z)
f_name="sql_dump_$now.sql"
pg_dump rentality > ${f_name}
dropdb rentality
python manag.py migrate
sudo systemctl daemon-reload
sudo systemctl restart gunicorn_rentality
sudo systemctl restart nginx
python manage.py createsuperuser