from django.urls import path

from landlord.views import shortlisted_tenants
from .views import home

app_name = 'landlord'

urlpatterns = [
    path('', home, name='home'),
    path('sl', shortlisted_tenants, name='shortlist'),

]
