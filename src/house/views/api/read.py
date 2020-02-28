from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from house.helpers import get_available_dates, get_unavailable_dates
from house.models import House
from house.serializers.read import AllHouseDetailsPublicSerializer, DateRangeSerializer


class NetAvailableDatesView(APIView):
    serializer_class = DateRangeSerializer

    def get(self, request, house_uuid):
        house = get_object_or_404(House.objects.all(), uuid=house_uuid)
        from_year = request.query_params.get('from_year', default=None)
        till_year = request.query_params.get('till_year', default=None)
        result = get_available_dates(house, from_year=from_year, till_year=till_year)
        serializer = self.serializer_class(result, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class NetUnavailableDatesView(APIView):
    serializer_class = DateRangeSerializer

    def get(self, request, house_uuid):
        house = get_object_or_404(House.objects.all(), uuid=house_uuid)
        # from_year = request.query_params.get('from_year', default=None)
        # till_year = request.query_params.get('till_year', default=None)
        result = get_unavailable_dates(house)
        serializer = self.serializer_class(result, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class HouseDetailsPublicView(APIView):
    serializer_class = AllHouseDetailsPublicSerializer

    def get(self, request, house_uuid):
        house = get_object_or_404(House.objects.all(), uuid=house_uuid)
        serializer = self.serializer_class(house)
        return Response(serializer.data, status=status.HTTP_200_OK)
