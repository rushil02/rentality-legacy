from django.urls import path

from landlord.views import shortlisted_tenants, ShortlistView
from .views import home

app_name = 'landlord'

urlpatterns = [
    path('', home, name='home'),
    path('sl', shortlisted_tenants, name='shortlist'),
    path('sl2', ShortlistView.as_view(), name='shortlist_2'),

]
