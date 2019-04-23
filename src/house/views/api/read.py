from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from house.helpers import get_available_dates
from house.models import House, Rule
from house.serializers import NetAvailableDatesSerailizer, RuleSerializer

class NetAvailableDatesView(APIView):
    serializer_class = NetAvailableDatesSerailizer

    def get(self, request, house_uuid):
        house = get_object_or_404(House.objects.all(), uuid=house_uuid)
        from_year = request.query_params.get('from_year', default=None)
        till_year = request.query_params.get('till_year', default=None)
        result = get_available_dates(house, from_year=from_year, till_year=till_year)
        serializer = self.serializer_class(result, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RulesView(APIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = RuleSerializer

    def get(self, request):
        rules = Rule.objects.all()
        serializer = self.serializer_class(rules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)