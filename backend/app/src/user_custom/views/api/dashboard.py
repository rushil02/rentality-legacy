from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from house.serializers.read import HouseShortInfoSerializer
from house.models import House
from application.models import Application
from application.serializers import ApplicationSerializer, HouseMetaDeserializer
from cities.models import PostalCode
from cities_custom.serializers import PostalCodeVerboseOnlySerializer


class GetAllHouseListings(APIView):
    """
    Used to get all house listings owned by current user
    """
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = request.user
        houses = House.objects.objects_from_owner(user)
        serializer = HouseShortInfoSerializer(houses, many=True)
        return Response(serializer.data)


# FIXME
class GetAllBookings(APIView):
    """
    Used to get all booking listings submitted by current user
    """
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = request.user
        applications = Application.objects.filter(tenant__user=user)
        result = []
        for app in applications:
            app_serialized = ApplicationSerializer(app).data
            house_meta_deserializer = HouseMetaDeserializer(data=app.house_meta)
            house_meta_deserializer.is_valid(raise_exception=True)
            app_serialized['house_meta'] = house_meta_deserializer.validated_data
            postal_location = PostalCode.objects.get(id=app.house_meta['location']['id'])
            app_serialized['house_meta']['location'] = PostalCodeVerboseOnlySerializer(postal_location).data
            result.append(app_serialized)

        return Response(result)


