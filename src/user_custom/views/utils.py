from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from user_custom.serializers.common import UserTimezoneSerializer
from django.conf import settings


@api_view(['POST'])
@permission_classes((AllowAny,))
def set_timezone(request):
    serializer = UserTimezoneSerializer(data=request.data)
    if serializer.is_valid():
        request.session['django_timezone'] = serializer.validated_data['tz']
        return Response(status=status.HTTP_200_OK)
    else:
        invalid_value = serializer.data['tz']

        # FIXME: check before deploy
        invalid_pairs = {
            'Africa/Asmera': 'Africa/Nairobi',
            'America/Indianapolis': 'America/Indiana/Indianapolis',
            'America/Montreal': 'America/Toronto',
            'Asia/Calcutta': 'Asia/Kolkata',
            'Asia/Chongqing': 'Asia/Shanghai',
            'Asia/Harbin': 'Asia/Shanghai',
            'Asia/Istanbul': 'Europe/Istanbul',
            'Asia/Katmandu': 'Asia/Kathmandu',
            'Asia/Macao': 'Asia/Macau',
            'Atlantic/Faeroe': 'Atlantic/Faroe',
            'Australia/Canberra': 'Australia/Sydney',
            'Australia/NSW': 'Australia/Sydney',
            'Australia/North': 'Australia/Darwin',
            'Australia/Queensland': 'Australia/Brisbane',
            'Australia/South': 'Australia/Adelaide',
            'Australia/Tasmania': 'Australia/Hobart',
            'Australia/Victoria': 'Australia/Melbourne',
            'Australia/West': 'Australia/Perth',
            'Chile/Continental': 'America/Santiago',
            'Pacific/Samoa': 'Pacific/Pago_Pago',
            'US/Samoa': 'Pacific/Pago_Pago',
        }
        if invalid_value in invalid_pairs:
            request.session['django_timezone'] = invalid_pairs[invalid_value]
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_stripe_publishable_key(request):
    return Response({'publishable_key': settings.STRIPE_PUBLISHABLE_KEY}, status=status.HTTP_200_OK)


def create_user_for_anon(first_name, email, send_mail=True, **kwargs):
    user_class = get_user_model()
    password = user_class.objects.make_random_password()

    user = user_class.objects.create_user(
        email=email, password=password,
        first_name=first_name, last_name=kwargs.get('last_name', None)
    )

    user_profile = user.userprofile
    user_profile.sex = kwargs.get('sex', 'O')
    user_profile.contact_num = kwargs.get('contact_num', None)
    user_profile.save()

    # send password via mail
    print(password)

    if send_mail:
        ...  # TODO: send email
    return user
