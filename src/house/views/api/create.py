from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from house.helpers import get_available_dates
from house.models import Availability, House
from house.serializers import AvailabilityPublicSerializer, NetAvailableDatesSerailizer


class AvailabilityView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = AvailabilityPublicSerializer

    def get(self, request, house_uuid):
        objs = Availability.objects.filter(house__uuid=house_uuid)
        serializer = self.serializer_class(objs, many=True)
        return Response(serializer.data)

    def post(self, request, house_uuid):
        serializer = self.serializer_class(request.data, many=True)
        if serializer.is_valid(raise_exception=True):
            house = get_object_or_404(House.objects.all(), uuid=house_uuid)
            serializer.save(house=house)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
