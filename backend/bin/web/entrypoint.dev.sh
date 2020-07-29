#!/bin/sh

cd /rentality/app/src || (echo "Error - Could not find folder '/rentality/app/src'"; exit 1)

python manage.py check_services --postgres --es --rabbitMQ
python -Wa manage.py runserver 0.0.0.0:8000 --insecure
