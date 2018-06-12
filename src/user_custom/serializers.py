import pytz
from rest_framework import serializers


class UserTimezoneSerializer(serializers.Serializer):
    tz_choices = tuple([tuple([str(x), str(x)]) for x in pytz.common_timezones])
    tz = serializers.ChoiceField(choices=tz_choices)
