#!/bin/bash

docker-compose exec web python manage.py check
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py update_site

read -p "Create Superuser? [y/n]" opt

if [ "$opt" = "y" ]; then
    docker-compose exec web python manage.py createsuperuser
fi