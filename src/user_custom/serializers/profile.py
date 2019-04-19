from rest_framework import serializers
from user_custom.models import UserProfile
from django.contrib.auth import get_user_model

from cities.models import PostalCode


class UserProfileSerializer(serializers.ModelSerializer):
    billing_country = serializers.StringRelatedField(read_only=True)
    billing_postcode = serializers.CharField(source='billing_postcode.code')

    class Meta:
        model = UserProfile
        fields = ('contact_num', 'sex', 'dob', 'billing_street_address', 'billing_postcode', 'billing_country', 'account_type', 'profile_pic')
    
    def validate_billing_postcode(self, value):
        try:
            postal_code = PostalCode.objects.filter(code=value)[0]
            return postal_code
        except IndexError:
            raise serializers.ValidationError("Postal Code does not exist.")
    
    def update(self, instance, validated_data):
        instance.contact_num = self.validated_data.get('contact_num', instance.contact_num)
        instance.sex = self.validated_data.get('sex', instance.sex)
        instance.dob = self.validated_data.get('dob', instance.dob)
        instance.billing_street_address = self.validated_data.get('billing_street_address', instance.billing_street_address)
        instance.billing_postcode = self.validated_data.get('billing_postcode', {}).get('code', instance.billing_postcode)
        instance.account_type = self.validated_data.get('account_type', instance.account_type)
        instance.save()
        return instance


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', 'email')
        read_only_fields = ('email',)