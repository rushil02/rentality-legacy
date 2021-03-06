from rest_framework import serializers
from user_custom.models import UserProfile
from django.contrib.auth import get_user_model


class UserProfileSerializer(serializers.ModelSerializer):
    account_type = serializers.SerializerMethodField()  # Field is read_only=True

    class Meta:
        model = UserProfile
        fields = (
            'contact_num', 'sex', 'dob', 'billing_street_address', 'billing_postcode', 'billing_country',
            'account_type', 'profile_pic', 'business_name'
        )

    def get_account_type(self, obj):
        return obj.get_account_type_display()

    def update(self, instance, validated_data):
        instance.contact_num = self.validated_data.get('contact_num', instance.contact_num)
        instance.sex = self.validated_data.get('sex', instance.sex)
        instance.dob = self.validated_data.get('dob', instance.dob)
        instance.billing_street_address = self.validated_data.get('billing_street_address',
                                                                  instance.billing_street_address)
        instance.billing_postcode = self.validated_data.get('billing_postcode', instance.billing_postcode)

        instance.business_name = self.validated_data.get('business_name', instance.business_name)
        instance.save()
        if not instance.billing_country:
            try:
                billing_country = validated_data.pop('billing_country')
            except KeyError:
                raise serializers.ValidationError({'billing_country': ["This field is required."]})
            else:
                if billing_country:
                    instance.billing_country = billing_country
                else:
                    raise serializers.ValidationError({'billing_country': ["This field is required."]})

        return super(UserProfileSerializer, self).update(instance, validated_data)


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', 'email')
        read_only_fields = ('email',)


class ProfileImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('profile_pic',)


class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', )


class UserProfilePublicSerializer(serializers.ModelSerializer):
    personality_tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='verbose')
    user = UserPublicSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ('personality_tags', 'profile_pic', 'business_name', 'user')
