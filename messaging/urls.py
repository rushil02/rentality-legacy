from django.urls import path

from messaging.views import messages, get_thread_messages

# from .views import index, room

app_name = 'messaging'

urlpatterns = [
    # path('', index, name='index'),
    # path('<str:room_name>/', room, name='room'),
    path('', messages, name='messages'),
    path('messages/<thread_uuid>', get_thread_messages, name='thread_messages'),
]
