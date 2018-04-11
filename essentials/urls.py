from django.urls import path

from essentials.views import notification

urlpatterns = [
    path('notifications', notification, name='notifications_all')
]
