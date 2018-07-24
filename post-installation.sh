#!/bin/bash
docker-compose exec web sh sync_services.sh

read -p "Import Postal Codes? [y/n]" opt

if [ "$opt" = "y" ]; then
    docker-compose exec web python manage.py cities --import=postal_code
fi

read -p "Create Superuser? [y/n]" opt

if [ "$opt" = "y" ]; then
    docker-compose exec web python manage.py createsuperuser
fi