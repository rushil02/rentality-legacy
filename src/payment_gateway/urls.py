from django.urls import path

from payment_gateway.views.api.home_owner import GetPGDetails
from .views.api.home_owner import AddHomeOwnerView

app_name = 'payment_gateway'

urlpatterns = [
    path('get-pg/<uuid:house_uuid>', GetPGDetails.as_view(), name='get_pg_details'),
    path('add-ho-acc/<str:pg_code>/<uuid:house_uuid>', AddHomeOwnerView.as_view(), name='add_ho'),

]