#!/bin/sh

cp -f /home/bin/maintenance.conf /etc/nginx/conf.d/default.conf
sh /docker-entrypoint.sh nginx

echo "Checking for 'web' service ..."
sh /home/bin/wait-for-web.sh
echo "Checking for 'frontend' files ..."
sh /home/bin/wait-for-frontend-initial-build.sh

echo "Killing maintenance page ..."
nginx -s stop

echo "Switching online ..."
cp -f /home/bin/online.conf /etc/nginx/conf.d/default.conf
sh /docker-entrypoint.sh nginx -g "daemon off;"
