from django.urls import path
from application.views import create_react
from application.views import create, HouseDetailViewForApplication, PaymentForApplication

app_name = 'application'

urlpatterns = [
    path('<uuid:house_uuid>', create, name='create'),
    path('get-house-detail/<uuid:house_uuid>', HouseDetailViewForApplication.as_view(), name='house-detial-view-application'),
    path('create/<uuid:house_uuid>', create_react, name='create'),
    path('payment/<uuid:application_uuid>', PaymentForApplication.as_view(), name='payment-for-application'),
]
