from django.urls import path

from house.views import info

app_name = 'house'

urlpatterns = [
    path('info/<uuid:house_uuid>', info, name='info'),
]
