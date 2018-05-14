from django.contrib.auth.decorators import login_required
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.db.models import Subquery, OuterRef, Prefetch, prefetch_related_objects
from django.http import Http404
from django.shortcuts import render
from django.db import IntegrityError
from django.utils import timezone

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from house.models import House
from messaging.forms import MessageForm
from messaging.models import Thread, Message, ThreadUser, ThreadUserMessage
from messaging.serializers import MessageSerializer, CreateMessageSerializer, ReadAtUpdateSerializer
from tenant.models import HousePreference


@login_required
def messages(request):
    user = request.user

    context = dict(form=MessageForm())
    try:
        threads = Thread.objects.filter(threaduser__user=user).annotate(
            latest_msg=Subquery(
                Message.objects.filter(thread=OuterRef('id')).order_by('-send_time').values('content')[:1])
        ).prefetch_related(Prefetch(
            'threaduser_set', queryset=ThreadUser.objects.exclude(user=user), to_attr='other_users')
        )
    except IndexError:
        context['threads'] = []
    else:
        context['threads'] = threads

    return render(request, 'messaging/messages.html', context)


def save_message(request, text, thread_uuid=None, user=None, thread=None):
    if user is None:
        user = request.user

    try:
        if not thread:
            thread = Thread.objects.get(uuid=thread_uuid)
    except Thread.DoesNotExist:
        raise Http404('Thread does not exist')

    marker = True
    for thread_user in thread.threaduser_set.all():
        if user == thread_user.user:
            marker = False
            break
        else:
            continue

    if marker:
        raise Http404('Thread does not exist')

    message = Message.objects.create(thread=thread, content=text)

    li = []
    for thread_user in thread.threaduser_set.all():
        if thread_user.user == user:
            obj = ThreadUserMessage(user=thread_user, message=message, sender=True)
        else:
            obj = ThreadUserMessage(user=thread_user, message=message)
        li.append(obj)
    ThreadUserMessage.objects.bulk_create(li)

    return message


def get_default_thread_user_list(user, entity):
    return [user, entity.get_owner()]


def save_new_thread(request, entity, thread_user_list=None, user=None, message=None):
    if user is None:
        user = request.user

    if thread_user_list is None:
        thread_user_list = get_default_thread_user_list(user, entity)

    try:
        thread = Thread.objects.create_new_thread(entity, thread_user_list, creator=user)
    except IntegrityError:
        thread = Thread.objects.get_by_obj(entity, creator=user)
    if message:
        save_message(request, message, thread_uuid=None, user=user, thread=thread)


class MessageView(GenericAPIView, ListModelMixin):
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated,)

    # FIXME !urgent! : add pagination [or latest n + new]

    def get_queryset(self):
        return Message.objects.filter(thread__uuid=self.kwargs['uuid'])

    def get(self, request, *args, **kwargs):
        obj = self.list(request, *args, **kwargs)
        return obj


class MessageReadAtUpdateView(GenericAPIView):
    serializer_class = ReadAtUpdateSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        uuid = serializer.validated_data['thread_uuid']
        thread_messages = serializer.validated_data['messages']
        try:
            thread = Thread.objects.get(uuid=uuid)
        except Thread.DoesNotExist:
            return Response({'details': 'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            message_users = ThreadUserMessage.objects.filter(
                user__user=request.user,
                user__thread=thread,
                message_id__in=thread_messages,
            )
            if message_users:
                message_users.filter(read_at=None).update(read_at=timezone.now())
            else:
                raise ValueError
        except ValueError:
            return Response({'details': 'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class CreateMessageView(GenericAPIView):
    serializer_class = CreateMessageSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        uuid = serializer.validated_data['thread_uuid']
        content = serializer.validated_data['content']
        save_message(request, content, thread_uuid=uuid)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


def message_count(user):
    return ThreadUserMessage.objects.filter(user__user=user, read_at=None, sender=False).count()
