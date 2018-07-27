#!/bin/sh

# FIXME: https://docs.djangoproject.com/en/2.0/ref/contrib/gis/install/geolibs/

apk add --no-cache linux-headers build-base
wget http://download.osgeo.org/geos/geos-3.6.2.tar.bz2
tar xjf geos-3.6.2.tar.bz2
cd geos-3.6.2; ./configure; make; make install
cd ..

wget http://download.osgeo.org/proj/proj-4.9.3.tar.gz
wget http://download.osgeo.org/proj/proj-datumgrid-1.5.tar.gz
tar xzf proj-4.9.3.tar.gz
tar xzf proj-datumgrid-1.5.tar.gz
cd proj-4.9.3; ./configure; make; make install
cd ..

wget http://download.osgeo.org/gdal/2.3.0/gdal-2.3.0.tar.gz
tar xzf gdal-2.3.0.tar.gz
cd gdal-2.3.0; ./configure; make; make install