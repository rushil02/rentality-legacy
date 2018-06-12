from django.urls import path

from messaging.views import messages, MessageView, CreateMessageView, MessageReadAtUpdateView

# from .views import index, room

app_name = 'messaging'

urlpatterns = [
    path('', messages, name='messages'),
    path('messages/<uuid>', MessageView.as_view(), name='thread_messages'),
    path('send/', CreateMessageView.as_view(), name='send_message'),
    path('msg-update/', MessageReadAtUpdateView.as_view(), name='update_message'),
]
