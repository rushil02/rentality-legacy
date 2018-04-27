#!/usr/bin/env bash

echo "Warning: Setup only tested for Ubuntu 16.04 and is for development only"
echo "*Starting setup*"

base_dir="$(dirname $(pwd)))"
dir="$(dirname $(base_dir))"

read -p "Ask before every install? [y/n]" main_opt

sudo apt-get update
sudo apt-get install wget unzip python3-pip python3-dev libpq-dev nginx

if [ "$main_opt" = "y" ]; then
    read -p "Install PostgreSQL? [y/n]" opt
else 
    opt="y"
fi

if [ "$opt" = "y" ]; then
    echo Installing Resources
    sudo add-apt-repository "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -sc)-pgdg main"
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
    sudo apt-get update
    sudo apt-get install postgresql-9.6 postgresql-contrib-9.6
else
    echo "PostgreSQL not installed via script"
fi


if [ "$main_opt" = "y" ]; then
    read -p "Setup PostgreSQL DB? [y/n]" opt
fi

if [ "$opt" = "y" ]; then
    sudo -u postgres createuser root
    sudo -u postgres createdb rentality
    sudo -u postgres psql -U postgres -d postgres -c "alter user root with password 'root';"
    sudo -u postgres psql -U postgres -d postgres -c "grant all privileges on database rentality to root;"
else
    echo "PostgreSQL not setup via script"
fi

lib_path="$dir/libs"


if [ "$main_opt" = "y" ]; then
    read -p "Setup ElasticSearch? [y/n]" opt
fi

if [ "$opt" = "y" ]; then
    zip_path="$lib_path/_zips"

    mkdir -p ${zip_path}

    es_file_path="$zip_path/elasticsearch-6.2.2.zip"

    wget  -O "$es_file_path" "https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.2.2.zip"

    unzip "$es_file_path" -d "$lib_path"

    ${lib_path}/elasticsearch-6.2.2/bin/elasticsearch -d
    jps | grep Elasticsearch
else
    echo "Elasticsearch not instantiated via script"
fi

sudo -H pip3 install --upgrade pip

env_path="$dir/env_py3"

sudo apt-get install python3-venv

python3 -m venv "$env_path"

source ${env_path}/bin/activate

pip3 install --upgrade pip

pip3 install wheel
pip3 install gunicorn

sudo apt-get install binutils libproj-dev gdal-bin python-gdal libgeoip1

cd "$lib_path"

if [ "$main_opt" = "y" ]; then
    read -p "Install GEOS for spatial DB? [y/n]" opt
fi

if [ "$opt" = "y" ]; then
    echo "Installing GEOS"
    wget http://download.osgeo.org/geos/geos-3.4.2.tar.bz2
    tar xjf geos-3.4.2.tar.bz2
    cd geos-3.4.2
    ./configure
    make
    sudo make install
    sudo ldconfig
    cd ..
else
    echo "GEOS plugin not setup via script"
fi


if [ "$main_opt" = "y" ]; then
    read -p "Install  PROJ.4 for spatial DB? [y/n]" opt
fi

if [ "$opt" = "y" ]; then
    echo "Installing PROJ.4"
    wget http://download.osgeo.org/proj/proj-4.9.1.tar.gz
    wget http://download.osgeo.org/proj/proj-datumgrid-1.5.tar.gz
    tar xzf proj-4.9.1.tar.gz
    cd proj-4.9.1/nad
    tar xzf ../../proj-datumgrid-1.5.tar.gz
    cd ..
    ./configure
    make
    sudo make install
    sudo ldconfig
    cd ..
else
    echo "PROJ.4 plugin was not setup via script"
fi



if [ "$main_opt" = "y" ]; then
    read -p "Install  GDAL for spatial DB? [y/n]" opt
fi

if [ "$opt" = "y" ]; then
    echo "Installing GDAL"
    wget http://download.osgeo.org/gdal/2.2.2/gdal-2.2.2.tar.gz
    tar xzf gdal-2.2.2.tar.gz
    cd gdal-2.2.2
    ./configure
    make
    sudo make install
    sudo ldconfig
    cd ..
else
    echo "GDAL plugin was not setup via script"
fi


export LD_LIBRARY_PATH=/usr/local/lib

cd "$base_dir"

if [ "$main_opt" = "y" ]; then
    read -p "Install PIP requirements? [y/n]" opt
fi

if [ "$opt" = "y" ]; then
    pip3 install -r requirements.txt
else
    echo "PIP requirements were not installed via script"
fi


python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic
python manage.py initialize_site
python manage.py cities --import=postal_code
read -p "Create Superuser? [y/n]" opt

if [ "$opt" = "y" ]; then
    python manage.py createsuperuser
fi


