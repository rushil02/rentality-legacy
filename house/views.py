from django.http import Http404
from django.shortcuts import render

from house.models import House


def info(request, house_uuid):
    print(house_uuid)
    try:
        house = House.objects.get(uuid=house_uuid)
    except House.DoesNotExist:
        raise Http404("House does not exist.")
    else:
        return render(request, 'house/info.html', {'house': house})
