#!/bin/sh

python manage.py collectstatic --noinput # why is this supposed to happen in every container or via every container -- Should be moved to Dockerfile
gunicorn rentality.wsgi -b 0.0.0.0:8000
