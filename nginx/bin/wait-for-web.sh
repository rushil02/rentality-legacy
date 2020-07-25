#!/bin/sh

while true; do
    STATUS=$(curl -s -o /dev/null -w '%{http_code}' web:8000)
    if [ "$STATUS" -eq 200 ]; then
        echo "Web is available!"
        break
    else
        echo "Waiting ... (2)"
        sleep 2
    fi
done
