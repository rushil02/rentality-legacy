#!/bin/bash
docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py initialize_site
docker-compose exec web python manage.py cities --import=postal_code
read -p "Create Superuser? [y/n]" opt

if [ "$opt" = "y" ]; then
    docker-compose exec web python manage.py createsuperuser
fi