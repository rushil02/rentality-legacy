import os

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.core.files.storage import FileSystemStorage
from django.http import Http404, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render, redirect
from house.models import House
from house.serializer import HouseSerializer
from messaging.forms import MessageForm
from messaging.views import save_message, save_new_thread
from user_custom.forms import EditProfileForm
from django.contrib import messages


def info(request, house_uuid):
    try:
        house = House.objects.prefetch_related('tags').get(uuid=house_uuid)
    except House.DoesNotExist:
        raise Http404("House does not exist.")
    else:
        if request.method == 'POST':
            message_form = MessageForm(request.POST)
            if request.user.is_authenticated:
                if message_form.is_valid():
                    try:
                        save_new_thread(request, house, message=message_form.data['content'])
                    except AssertionError:
                        messages.add_message(request, messages.INFO, 'You cannot send yourself a message')
                    else:
                        messages.add_message(request, messages.SUCCESS,
                                             'Your message has been sent to the property owner.')
                        message_form = MessageForm()
                    context = {'house': house, 'msg_form': message_form}
                    return render(request, 'house/info.html', context)
                else:
                    context = {'house': house, 'msg_form': message_form}
                    return render(request, 'house/info.html', context)
            else:
                return redirect(settings.LOGIN_URL + '?next=' + request.get_full_path())
        else:
            message_form = MessageForm()
            context = {'house': house, 'msg_form': message_form}
            return render(request, 'property/detail.html', context)
