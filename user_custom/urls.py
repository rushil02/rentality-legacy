from django.urls import path

from .views import user_details

urlpatterns = [
    path('', user_details, name='user_details'),
]
