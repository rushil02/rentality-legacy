#!/usr/bin/env bash

echo "Warning: Setup only tested for Ubuntu 16.04 and is for development only"
echo "*Starting setup*"

dir="$(dirname $(pwd))"

read -p "Install PostgreSQL? [y/n]" opt

if [ "$opt" = "y" ]; then
    echo Installing Resources
    sudo apt-get update
    sudo apt-get install postgresql postgresql-contrib
else
    echo "PostgreSQL not installed via script"
fi

sudo -u postgres createuser root
sudo -u postgres createdb rentality
sudo -u postgres psql -U postgres -d postgres -c "alter user root with password 'root';"
sudo -u postgres psql -U postgres -d postgres -c "grant all privileges on database rentality to root;"


lib_path="$dir/libs"

zip_path="$lib_path/_zips"

mkdir -p zip_path

es_file_path="$zip_path/elasticsearch-6.2.2.zip"

wget  -O "$es_file_path" "https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.2.2.zip"

unzip "$es_file_path" -d "$lib_path"

${lib_path}/elasticsearch-6.2.2/bin/elasticsearch -d
jps | grep Elasticsearch


sudo apt-get install python3

env_path="$dir/env_py3"

sudo apt-get install python3-venv

python3 -m venv "$env_path"
source ${env_path}/bin/activate

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py initialize_site
python manage.py runserver


