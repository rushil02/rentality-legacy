#!/usr/bin/env bash

echo "Dumping Data"
now=$(date +%Y%m%d%H%M%Z)
f_name="../sql_dump/sql_dump_$now.sql"
pg_dump rentality > ${f_name}
echo "Done"

git pull

echo "Activating Python Virtual Environment"
source ../py3_env_rentality/bin/activate
echo "Done"

pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic
python manage.py initialize_site

echo "Reloading daemon"
sudo systemctl daemon-reload
echo "Done"
echo "Restarting Gunicorn"
sudo systemctl restart gunicorn_rentality
echo "Done"
echo "Restarting Nginx"
sudo systemctl restart nginx
echo "Done"
