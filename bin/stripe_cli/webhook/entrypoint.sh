#!/bin/sh

stripe login
hostIP=$(ip route show | awk '/default/ {print $3}')
stripe listen --forward-to $hostIP:8000/api/pg/ev-hook/st/m71iJ5vJ6reOpeGGGC6030y11W9T45qv  # TODO: Set 'external_access_key' from secrets/COMM_ENV
