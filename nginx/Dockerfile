FROM nginx:alpine

COPY ./certs /etc/nginx/certs

COPY ./config/common.conf /etc/nginx/conf.d/common.conf
COPY ./config/production.conf /etc/nginx/conf.d/default.conf