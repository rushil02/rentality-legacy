from django.urls import path

from tenant.views import home, shortlisted_houses, HousePreferenceCreateView, info, search_tenant_page, \
    search_tenant_api

app_name = 'tenant'

urlpatterns = [
    path('info/<uuid:house_pref_uuid>', info, name='info'),
    path('pref', HousePreferenceCreateView.as_view(), name='house_pref'),
    path('sl', shortlisted_houses, name='shortlist'),
    path('search', search_tenant_page, name='search'),
    path('search-api', search_tenant_api, name='search_api')
]
