from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from user_custom.serializers import UserTimezoneSerializer
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
