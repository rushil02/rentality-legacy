#!/usr/bin/env bash

sudo systemctl daemon-reload
sudo systemctl restart gunicorn_rentality
sudo systemctl restart nginx
