from django.urls import path

from tenant.views import HousePreference, home, shortlisted_houses

app_name = 'tenant'

urlpatterns = [
    path('', home, name='home'),
    path('pref', HousePreference.as_view(), name='house_pref'),
    path('sl', shortlisted_houses, name='shortlist'),
]
