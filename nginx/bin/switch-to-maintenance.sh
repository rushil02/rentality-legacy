#!/bin/sh

cp -f /home/bin/maintenance.conf /etc/nginx/conf.d/default.conf
sh /docker-entrypoint.sh nginx -s reload
