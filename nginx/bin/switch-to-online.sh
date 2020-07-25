#!/bin/sh

cp -f /home/bin/online.conf /etc/nginx/conf.d/default.conf
sh /docker-entrypoint.sh nginx -s reload
