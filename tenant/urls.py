from django.urls import path

from tenant.views import home, shortlisted_houses, HousePreferenceCreateView, info, search_tenant_page, \
    search_tenant_api, HousePreferenceCreateView2, HousePreferenceCreateView3

app_name = 'tenant'

urlpatterns = [
    path('info/<uuid:house_pref_uuid>', info, name='info'),
    # FIXME: use form wizards and change add/edit urls
    path('pref', HousePreferenceCreateView.as_view(), name='house_pref'),
    path('pref2', HousePreferenceCreateView2.as_view(), name='house_pref_2'),
    path('pref3', HousePreferenceCreateView3.as_view(), name='house_pref_3'),
    path('sl', shortlisted_houses, name='shortlist'),
    path('search', search_tenant_page, name='search'),
    path('search-api', search_tenant_api, name='search_api')
]
