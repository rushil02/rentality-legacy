#!/bin/sh

INDEX_FILE=/var/www/rentality.com.au/index.html

while true; do
    if [ -f "$INDEX_FILE" ]; then
        echo "Frontend is available!"
        break
    else
        echo "Waiting ... (5)"
        sleep 5
    fi
done
