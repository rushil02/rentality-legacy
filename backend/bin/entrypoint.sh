#!/bin/sh

gunicorn rentality.wsgi -b 0.0.0.0:8000
