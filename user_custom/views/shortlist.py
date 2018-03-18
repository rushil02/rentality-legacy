from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import View
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from essentials.models import Notification
from essentials.serializers import NotificationSerializer
from house.models import House
from tenant.models import HousePreference


@api_view(['GET'])
def shortlist(request, entity=None, uuid=None):
    if entity and uuid:
        if entity == "house":
            key = "housing_shortlist"

            if request.user.is_authenticated:
                entity_model = request.user.tenant

            try:
                obj = House.objects.get(uuid=uuid)
            except (House.MultipleObjectsReturned, House.DoesNotExist):
                return Response(status=status.HTTP_400_BAD_REQUEST)

        elif entity == "tenant":
            if request.user.is_authenticated:
                entity_model = request.user.landlord

            try:
                obj = HousePreference.objects.get(uuid=uuid)
            except (HousePreference.MultipleObjectsReturned, HousePreference.DoesNotExist):
                return Response(status=status.HTTP_400_BAD_REQUEST)
            key = "tenant_shortlist"
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if request.user.is_authenticated:
            entity_model.shortlist.add(obj)
            entity_model.save()
        else:
            try:
                request.session[key].append(obj.id)
            except KeyError:
                request.session[key] = [obj.id, ]

        return Response(status=status.HTTP_202_ACCEPTED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


def shortlist_view(request):
    if request.user.is_authenticated:

        shortlisted_tenants = request.user.landlord.shortlist.all()
        shortlisted_houses = request.user.tenant.shortlist.all()
        applied = []  # FIXME
        offers = []

        context = {
            'tenants': shortlisted_tenants,
            'houses': shortlisted_houses,
            'applied': applied,
            'offers': offers
        }

        return render(request, 'user_common/shortlist/auth.html', context)

    else:

        # TODO: test

        t_ids = request.session.setdefault('tenant_shortlist', [])
        h_ids = request.session.setdefault('housing_shortlist', [])

        shortlisted_tenants = HousePreference.objects.filter(id__in=list(t_ids))
        shortlisted_houses = House.objects.filter(id__in=list(h_ids))

        context = {
            'tenants': shortlisted_tenants,
            'houses': shortlisted_houses,
        }

        return render(request, 'user_common/shortlist/anon.html', context)
