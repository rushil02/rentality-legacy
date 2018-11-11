from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.decorators import login_required

from home_owner.models import HomeOwnerProfile
from home_owner.serializers import ShortListSerializer


@login_required
def home(request):
    return HttpResponse("Home Owner Home Page")


@login_required()
def shortlisted_tenants(request):
    house_pref = request.user.home_owner.shortlist.all()
    return render(request, 'home_owner/shortlisted.html', {'shortlisted': house_pref})


class ShortlistView(generics.ListCreateAPIView):
    queryset = HomeOwnerProfile.objects.all()
    serializer_class = ShortListSerializer
