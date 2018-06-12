#!/bin/sh

python manage.py collectstatic --noinput
python manage.py makemigrations
gunicorn rentality.wsgi -b 0.0.0.0:8000
