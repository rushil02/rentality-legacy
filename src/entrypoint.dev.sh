#!/bin/sh

#python manage.py collectstatic --noinput
python -Wa manage.py runserver 0.0.0.0:8000 --insecure
