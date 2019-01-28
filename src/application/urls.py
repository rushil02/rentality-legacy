from django.urls import path
from application.views import create_react, HouseDetailViewForApplication, CreateApplicationView, PaymentForApplication, \
    BookingAmountView

app_name = 'application'

urlpatterns = [
    path('get-house-detail/<uuid:house_uuid>', HouseDetailViewForApplication.as_view(), name='house-detial-view-application'),
    path('create-app/<uuid:house_uuid>', CreateApplicationView.as_view(), name='create-application'),
    path('create/<uuid:house_uuid>', create_react, name='create'),
    path('summary/<uuid:house_uuid>', create_react, name='summary'),
    path('payment/<uuid:application_uuid>', PaymentForApplication.as_view(), name='payment-for-application'),

    # APIs
    path('amount/<uuid:house_uuid>', BookingAmountView.as_view(), name='booking_amount'),
    # path('api/create/<uuid:house_uuid>', name='create'),

]
