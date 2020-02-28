from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK
from rest_framework.views import APIView
from rest_framework.response import Response

from application.models import Application
from application.serializers import ApplicationCreateSerializer
from house.models import House
from user_custom.views import create_user_for_anon


class InitiateBookingView(APIView):
    """
    Initiate Application by Tenant for executing intent
    """

    def post(self, request, house_uuid):
        try:
            house = House.objects.get(uuid=house_uuid)
        except House.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)

        user = request.user
        application = ApplicationCreateSerializer(data=request.data)

        if application.is_valid(raise_exception=True):
            print(application.validated_data)
            if not user.is_authenticated:
                tenant_user = create_user_for_anon(**application.validated_data['tenant_details'], send_mail=True)
            else:
                tenant_user = user

            # TODO: Do calculations
            application = Application(
                house=house,
                tenant=tenant_user.tenant,
                rent=house.get_rent(),
                date=(
                    application.validated_data['booking_info']['start_date'],
                    application.validated_data['booking_info']['end_date']
                ),


            )
            application.save()

        response_data = {}
        return Response(response_data, status=HTTP_200_OK)
        # house_math_obj = HouseMath.build(house)
        # house.business_config = house_math_obj.get_business_config()
        # errors = house_math_obj.validate()
        # if errors:
        #     raise ...
        # else:
        #     house.save()
        #     return ...  # 200/201 Response
