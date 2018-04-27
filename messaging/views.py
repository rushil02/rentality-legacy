from django.contrib.contenttypes.models import ContentType
from django.db.models import Subquery, OuterRef
from django.http import Http404, JsonResponse
from django.shortcuts import render
from django.utils.safestring import mark_safe
import json

from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_202_ACCEPTED

from house.models import House
from messaging.forms import MessageForm
from messaging.models import Thread, Message
from messaging.serializers import MessageSerializer
from tenant.models import HousePreference


def index(request):
    return render(request, 'messaging/index.html', {})


def room(request, room_name):
    return render(request, 'messaging/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name))
    })


@csrf_exempt
def get_thread_messages(request, thread_uuid):
    if request.method == 'GET':
        messages = Message.objects.filter(thread__uuid=thread_uuid)
        serializer = MessageSerializer(messages, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        thread = Thread.objects.get(uuid=thread_uuid)
        data = JSONParser().parse(request)
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            m = Message(thread=thread, user=request.user, content=serializer.validated_data['content'])
            m.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


# FIXME: Reverse relation, though revise messaging model for better optimization
def messages(request):
    user = request.user
    houses = House.objects.filter(landlord__user=user)
    house_preferences = HousePreference.objects.filter(tenant__user=user)
    h_ids = [house.id for house in houses]
    hp_ids = [hp.id for hp in house_preferences]
    context = dict(form=MessageForm())
    try:
        house_threads = Thread.objects.filter(
            content_type=ContentType.objects.get_for_model(houses[0]),
            object_id__in=h_ids
        ).annotate(latest_msg=Subquery(
            Message.objects.filter(thread=OuterRef('id')).order_by('-send_time').values('content')[:1]))
    except IndexError:
        context['house_threads'] = []
    else:
        print(house_threads[0].__dict__)
        context['house_threads'] = house_threads

    try:
        hp_threads = Thread.objects.filter(
            content_type=ContentType.objects.get_for_model(house_preferences[0]),
            object_id__in=hp_ids
        ).annotate(latest_msg=Subquery(
            Message.objects.filter(thread=OuterRef('id')).order_by('-send_time').values('content')[:1]))
    except IndexError:
        context['hp_threads'] = []
    else:
        context['hp_threads'] = hp_threads

    return render(request, 'messaging/messages.html', context)


# FIXME: test use cases
def save_message(request, text, entity):
    user = request.user
    try:
        thread = Thread.objects.get_by_obj(obj=entity, sender=user)
    except Thread.DoesNotExist:
        thread = Thread.objects.create(entity=entity, sender=user)

    Message.objects.create(thread=thread, content=text, user=user)
