from django.urls import path

from landlord.views import shortlisted_tenants, ShortlistView

app_name = 'landlord'

urlpatterns = [
    path('sl', shortlisted_tenants, name='shortlist'),
    path('sl2', ShortlistView.as_view(), name='shortlist_2'),

]
