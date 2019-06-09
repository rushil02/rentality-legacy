import pytz
from django.contrib.auth import get_user_model
from rest_framework import serializers

from user_custom.models import PersonalityTag, UserProfile


class UserTimezoneSerializer(serializers.Serializer):
    tz_choices = tuple([tuple([str(x), str(x)]) for x in pytz.common_timezones])
    tz = serializers.ChoiceField(choices=tz_choices)


class PersonalityTagSerializer(serializers.Serializer):
    verbose = serializers.CharField()
    id = serializers.IntegerField(required=False, allow_null=True)
    checked = serializers.BooleanField()

    def create(self, validated_data):
        """
        Create and return a new `Facility` instance, given the validated data.
        """
        if not validated_data.get('id', None):
            if validated_data["checked"] is False:
                try:
                    obj = PersonalityTag.objects.get(verbose=validated_data['verbose'])
                except PersonalityTag.DoesNotExist:
                    return None, False
            else:
                obj, created = PersonalityTag.objects.get_or_create(verbose=validated_data['verbose'])

        else:
            try:
                obj = PersonalityTag.objects.get(id=validated_data['id'], verbose=validated_data['verbose'])
            except PersonalityTag.DoesNotExist as e:
                raise e  # TODO: test this exception

        return obj, validated_data["checked"]


#FIXME: To be removed
class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', 'email')


#FIXME: To be removed
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('contact_num', 'sex')
