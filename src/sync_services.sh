#!/bin/sh

python manage.py collectstatic --noinput
python manage.py migrate
python manage.py initialize_site