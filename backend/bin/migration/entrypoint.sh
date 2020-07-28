#!/bin/sh

cd /rentality/app/src || (echo "Error - Could not find folder '/rentality/app/src'"; exit 1)

python manage.py collectstatic --noinput
python manage.py check_services --postgres
python manage.py migrate --noinput

echo "Notifier settings: $NOTIFIER_WEBHOOK"

if test "$NOTIFIER_WEBHOOK" -eq 1; then
    cd /rentality/bin/migration && python service_active_webhook.py
else
    echo "NOTIFIER_WEBHOOK is 0. Notifier webhook is not started. Service will now stop."
fi

