#!/usr/bin/env bash

echo "Installing GEOS"
wget http://download.osgeo.org/geos/geos-3.6.2.tar.bz2
tar xjf geos-3.6.2.tar.bz2
cd geos-3.6.2
./configure
make
sudo make install
sudo ldconfig
cd ..