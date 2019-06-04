from django.urls import path
from rest_framework import routers

from elastic_search.views import suggestions, search_house, HouseSearchView

# TODO: need routers?
# router = routers.DefaultRouter()
# router.register(r'location_sg', suggestions)

app_name = 'es'

urlpatterns = [
    path('location_sugg', suggestions, name='loc_sugg'),
    path('house', search_house, name='house_search'),
    path('house/search', HouseSearchView.as_view(), name='house_search_2'),
]
