from django.contrib.contenttypes.models import ContentType
from django.db.models import Subquery, OuterRef
from django.http import Http404
from django.shortcuts import render

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR

from house.models import House
from messaging.forms import MessageForm
from messaging.models import Thread, Message
from messaging.serializers import MessageSerializer, CreateMessageSerializer
from tenant.models import HousePreference


# @csrf_exempt
# def get_thread_messages(request, thread_uuid):
#     if request.method == 'GET':
#         messages = Message.objects.filter(thread__uuid=thread_uuid)
#         serializer = MessageSerializer(messages, many=True)
#         return JsonResponse(serializer.data, safe=False)
#     elif request.method == 'POST':
#         thread = Thread.objects.get(uuid=thread_uuid)
#         data = JSONParser().parse(request)
#         serializer = MessageSerializer(data=data)
#         if serializer.is_valid():
#             m = Message(thread=thread, user=request.user, content=serializer.validated_data['content'])
#             m.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)


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
        thread = Thread.objects.get_by_obj(obj=entity, initiator=user)
    except Thread.DoesNotExist:
        thread = Thread.objects.create_new_thread(entity, user)

    try:
        recipient = thread.threaduser_set.exclude(user=request.user)[0]
    except IndexError:
        recipient = request.user

    Message.objects.create(thread=thread, content=text, sender=user, recipient=recipient)


class MessageView(GenericAPIView, ListModelMixin):
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Message.objects.filter(thread__uuid=self.kwargs['uuid'])

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class CreateMessageView(GenericAPIView):
    serializer_class = CreateMessageSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        uuid = serializer.validated_data['thread_uuid']
        content = serializer.validated_data['content']
        thread = Thread.objects.get(uuid=uuid)
        try:
            recipient = thread.threaduser_set.exclude(user=request.user)[0]
        except IndexError:
            recipient = request.user
        Message.objects.create(
            thread=thread,
            content=content,
            sender=request.user,
            recipient=recipient
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
