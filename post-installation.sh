#!/bin/bash
docker-compose exec web sh sync_services.sh

read -p "Import Cities Data? [y/n]" opt

if [ "$opt" = "y" ]; then
    docker-compose exec web python manage.py loaddata cities_dump.json
fi

# read -p "Import Postal Codes? [y/n]" opt

# if [ "$opt" = "y" ]; then
#     docker-compose exec web python manage.py cities --import=postal_code
# fi

# read -p "Import Countries? [y/n]" opt

# if [ "$opt" = "y" ]; then
#     docker-compose exec web python manage.py cities --import=country
# fi

read -p "Create Superuser? [y/n]" opt

if [ "$opt" = "y" ]; then
    docker-compose exec web python manage.py createsuperuser
fi