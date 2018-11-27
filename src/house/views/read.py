from django.http import Http404
from django.shortcuts import render, redirect
from house.models import House


def info(request, house_uuid):
    try:
        house = House.objects.select_related('home_owner__user', 'home_owner__user__userprofile').get(uuid=house_uuid)
    except House.DoesNotExist:
        raise Http404("House does not exist.")
    else:
        return render(request, 'property/detail.html', {'house': house})
