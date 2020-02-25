from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
from house.serializers.read import HouseShortInfoSerializer
from house.models import House
from application.models import Application
from application.serializers import ApplicationSerializer


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


class GetAllBookings(APIView):
    """
    Used to get all booking listings submitted by current user
    """
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = request.user
        applications = Application.objects.filter(tenant__user=user)
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)


