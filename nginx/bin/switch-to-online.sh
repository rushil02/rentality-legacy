#!/bin/sh

cp -f /home/bin/online.conf /etc/nginx/conf.d/default.conf

echo "Checking for 'web' service ..."
sh /home/bin/wait-for-web.sh
echo "Checking for 'frontend' files ..."
sh /home/bin/wait-for-frontend-initial-build.sh

sh /docker-entrypoint.sh nginx -s reload
