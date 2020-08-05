FROM nginx:1.19.1-alpine

COPY ./config/backend.routes.conf /etc/nginx/backend.routes.conf
COPY ./config/frontend.routes.conf /etc/nginx/frontend.routes.conf

COPY ./config/maintenance.prod.conf /home/bin/maintenance.conf
COPY ./config/production.conf /home/bin/online.conf

COPY ./bin/maintenance_site /var/www/maintenance

COPY ./bin/switch-to-*.sh ./bin/entrypoint.sh ./bin/wait-for-*.sh /home/bin/

RUN ["chmod", "+x", "/home/bin/entrypoint.sh", "/home/bin/wait-for-frontend-initial-build.sh", "/home/bin/wait-for-web.sh", "/home/bin/switch-to-online.sh", "/home/bin/switch-to-maintenance.sh"]

ENTRYPOINT ["/home/bin/entrypoint.sh"]