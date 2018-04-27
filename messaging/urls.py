from django.urls import path

from messaging.views import messages, MessageView, CreateMessageView

# from .views import index, room

app_name = 'messaging'

urlpatterns = [
    path('', messages, name='messages'),
    path('messages/<uuid>', MessageView.as_view(), name='thread_messages'),
    path('send/', CreateMessageView.as_view(), name='send_message'),
]
