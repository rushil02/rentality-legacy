from django.urls import path

from home_owner.views.api.public import HomeOwnerInfoPublicView

app_name = 'home_owner'

urlpatterns = [
    # APIs v2
    path('gen-info/<uuid:house_uuid>', HomeOwnerInfoPublicView.as_view(), name='public_info'),
]
