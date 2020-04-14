from django.urls import path
from application.views.api.tenant import InitiateBookingView, ExecuteIntentBookingView, GetApplicationDetails
from application.views.api.info import BookingAmountView

app_name = 'application'

urlpatterns = [
    # APIs
    path('initiate/<uuid:house_uuid>', InitiateBookingView.as_view(), name='initiate_application'),
    path('exec-intent/<uuid:house_uuid>/<uuid:app_uuid>',
         ExecuteIntentBookingView.as_view(), name='tenant_execute_intent'),
    path('amount/<uuid:house_uuid>', BookingAmountView.as_view(), name='booking_amount'),
    path('application-info-list/<uuid:application_uuid>', GetApplicationDetails.as_view(), name='application_info_list')
]
