#!/bin/sh

cd /rentality/app/src && celery -A rentality worker -l info