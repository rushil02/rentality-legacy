from django.urls import path

from messaging.views import messages

# from .views import index, room

urlpatterns = [
    # path('', index, name='index'),
    # path('<str:room_name>/', room, name='room'),
    path('msgs', messages, name='messages')
]
