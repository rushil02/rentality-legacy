from django.urls import path

from home_owner.views import shortlisted_tenants, ShortlistView, home_owner_account_details, application_detail
from home_owner.views.api.public import HomeOwnerInfoPublicView

app_name = 'home_owner'

urlpatterns = [
    # path('sl', shortlisted_tenants, name='shortlist'),
    # path('sl2', ShortlistView.as_view(), name='shortlist_2'),
    # path('account/', home_owner_account_details, name='account_details'),
    # path('application/<uuid:application_uuid>', application_detail, name='application_detail'),

    # APIs v2
    path('gen-info/<uuid:house_uuid>', HomeOwnerInfoPublicView.as_view(), name='public_info'),
]
