from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.decorators import login_required

from landlord.models import LandlordProfile
from landlord.serializers import ShortListSerializer


@login_required
def home(request):
    return HttpResponse("Landlord Home Page")


@login_required()
def shortlisted_tenants(request):
    house_pref = request.user.landlord.shortlist.all()
    return render(request, 'landlord/shortlisted.html', {'shortlisted': house_pref})


class ShortlistView(generics.ListCreateAPIView):
    queryset = LandlordProfile.objects.all()
    serializer_class = ShortListSerializer
