from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.http import Http404
from django.shortcuts import render, redirect, reverse

from house.forms import ApplyForm
from house.models import House
from django.contrib import messages


@login_required
def remove_from_public(request, house_uuid):
    try:
        house = House.active_objects.objects_from_owner(user=request.user).get(uuid=house_uuid)
    except House.DoesNotExist:
        raise Http404("House does not exist.")
    else:
        house.set_status('I')
        house.save()
        messages.add_message(request, messages.SUCCESS, "Your house has been removed from Public Listing.")
        return redirect(reverse('user:dashboard'))


@login_required
def delete(request, house_uuid):
    try:
        house = House.objects.objects_from_owner(user=request.user).get(uuid=house_uuid)
    except House.DoesNotExist:
        raise Http404("House does not exist.")
    else:
        house.set_status('D')
        house.save()
        messages.add_message(request, messages.SUCCESS, "Your house information has been deleted.")
        return redirect(reverse('user:dashboard'))
