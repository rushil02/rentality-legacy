#!/bin/sh

# Refer: https://docs.djangoproject.com/en/2.2/ref/contrib/gis/install/geolibs/

apk add --virtual .build-deps --no-cache linux-headers build-base
apk add binutils

wget http://download.osgeo.org/geos/geos-3.7.3.tar.bz2
tar xjf geos-3.7.3.tar.bz2
cd geos-3.7.3 && ./configure && make && make install
cd ..

wget http://download.osgeo.org/proj/proj-5.2.0.tar.gz
wget http://download.osgeo.org/proj/proj-datumgrid-1.8.tar.gz
tar xzf proj-5.2.0.tar.gz
cd proj-5.2.0/nad && tar xzf ../../proj-datumgrid-1.8.tar.gz
cd .. && ./configure && make && make install
cd ..

wget http://download.osgeo.org/gdal/2.3.3/gdal-2.3.3.tar.gz
tar xzf gdal-2.3.3.tar.gz
cd gdal-2.3.3 && ./configure && make && make install
cd ..

apk --purge del .build-deps

rm -rf ./geos* ./proj* ./gdal*
