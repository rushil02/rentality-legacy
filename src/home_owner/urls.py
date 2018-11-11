from django.urls import path

from home_owner.views import shortlisted_tenants, ShortlistView

app_name = 'home_owner'

urlpatterns = [
    path('sl', shortlisted_tenants, name='shortlist'),
    path('sl2', ShortlistView.as_view(), name='shortlist_2'),

]
