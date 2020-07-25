FROM nginx:alpine

COPY ./config/backend.routes.conf /etc/nginx/backend.routes.conf
COPY ./config/frontend.routes.conf /etc/nginx/frontend.routes.conf

COPY ./config/maintenance.conf /home/bin/maintenance.conf
COPY ./config/production.conf /home/bin/online.conf

COPY ./bin/maintenance_site /var/www/maintenance

COPY ./bin/switch-to-*.sh ./bin/entrypoint.sh ./bin/wait-for-*.sh /home/bin/

ENTRYPOINT ["/home/bin/entrypoint.sh"]