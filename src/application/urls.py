from django.urls import path
from application.views import create_react
from application.views import create, HouseDetailViewForApplication

app_name = 'application'

urlpatterns = [
    path('<uuid:house_uuid>', create, name='create'),
    path('get-house-detail/<uuid:house_uuid>', HouseDetailViewForApplication.as_view(), name='house-detial-view-application'),
    path('create/<uuid:house_uuid>', create_react, name='create'),
    path('summary/<uuid:house_uuid>', create_react, name='summary'),
]
