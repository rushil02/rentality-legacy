from django.shortcuts import render, get_object_or_404
from django.views.decorators.http import require_GET
from rest_framework.views import APIView
from house.models import House
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from house.serializers import HouseSerializerForApplication
from datetime import datetime
from django.http import Http404


@require_GET
def create(request, house_uuid):
    house = get_object_or_404(House, uuid=house_uuid)
    context = {
        'house': house,
        'move_in_date': '02 Oct 2018',
        'move_out_date': '28 Oct 2018',
        'guests': 2,
        'weeks': 4.7,
    }

    return render(request, 'application/apply.html', context)


class HouseDetailViewForApplication(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = HouseSerializerForApplication

    def calculate_rent(self, house, start_date, end_date, promo_code):
        # FIXME: Add rent calculation Logic
        self.amounts = {
            'calculated_rent': 500,
            'service_fee': 700,
            'total_rent': 1200
        }

    def get_object(self, *args, **kwargs):
        house_uuid = self.kwargs['house_uuid']
        try:
            house = House.active_objects.get(uuid=house_uuid)
        except:
            raise Http404
        
        return house
    
    def get_serializer(self, instance):
        return self.serializer_class(instance)
    
    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        start_date = datetime.strptime(request.GET['start_date'], '%Y-%m-%dT%H:%M:%S.%fZ')
        end_date = datetime.strptime(request.GET['end_date'], '%Y-%m-%dT%H:%M:%S.%fZ')
        promo_code = request.GET.get('promo_code', None)

        self.calculate_rent(instance, start_date, end_date, promo_code)

        self.amounts['house'] = serializer.data
        return Response(self.amounts)