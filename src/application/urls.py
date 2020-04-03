from django.urls import path
# from application.views import create_react, CreateApplicationView, BookingAmountView, \
#     application_completion
from application.views.api.tenant import InitiateBookingView, ExecuteIntentBookingView, GetApplicationDetails
from application.views.api.info import BookingAmountView

app_name = 'application'

urlpatterns = [
    # path('create-app/<uuid:house_uuid>', CreateApplicationView.as_view(), name='create-application'),
    # path('create/<uuid:house_uuid>', create_react, name='create'),
    # path('summary/<uuid:house_uuid>', create_react, name='summary'),
    # path('comp', application_completion, name='app_complete'),

    # APIs
    path('initiate/<uuid:house_uuid>', InitiateBookingView.as_view(), name='initiate_application'),
    path('exec-intent/<uuid:house_uuid>/<uuid:app_uuid>',
         ExecuteIntentBookingView.as_view(), name='tenant_execute_intent'),
    path('amount/<uuid:house_uuid>', BookingAmountView.as_view(), name='booking_amount'),
    path('application-info-list/<uuid:application_uuid>', GetApplicationDetails.as_view(), name='application_info_list')
    # path('api/create/<uuid:house_uuid>', name='create'),
]
