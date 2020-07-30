#!/bin/sh

cd /rentality/app/src || (echo "Error - Could not find folder '/rentality/app/src'"; exit 1)

python manage.py check_services --postgres --rabbitMQ --es
celery -A rentality worker -l info
