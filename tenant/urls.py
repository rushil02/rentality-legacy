from django.urls import path

from tenant.views import home, shortlisted_houses, HousePreferenceCreateView, info

app_name = 'tenant'

urlpatterns = [
    path('', home, name='home'),
    path('info/<uuid:house_pref_uuid>', info, name='info'),
    path('pref', HousePreferenceCreateView.as_view(), name='house_pref'),
    path('sl', shortlisted_houses, name='shortlist'),
]
