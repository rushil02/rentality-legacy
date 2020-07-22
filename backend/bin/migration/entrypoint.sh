#!/bin/sh

cd /rentality/app/src || (echo "Error - Could not find folder '/rentality/app/src'"; exit 1)

python manage.py collectstatic --noinput
python manage.py check_services --postgres
python manage.py migrate --noinput

cd /rentality/bin && python service_active_webhook.py

# FIXME: should be in separate container with live parallel data availability
#python /rentality/app/src/manage.py es_init --noinput
