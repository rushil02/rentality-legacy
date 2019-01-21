from django.urls import path
from application.views import create, HouseDetailViewForApplication, CreateApplicationView

app_name = 'application'

urlpatterns = [
    path('<uuid:house_uuid>', create, name='create'),
    path('get-house-detail/<uuid:house_uuid>', HouseDetailViewForApplication.as_view(), name='house-detial-view-application'),
    path('', CreateApplicationView.as_view(), name='create-application'),
]
