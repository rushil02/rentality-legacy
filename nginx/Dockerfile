FROM nginx:alpine

COPY ./config/backend.routes.conf /etc/nginx/backend.routes.conf
COPY ./config/frontend.routes.conf /etc/nginx/frontend.routes.conf
COPY ./config/production.conf /etc/nginx/conf.d/default.conf