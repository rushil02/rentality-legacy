from django.urls import path

from elastic_search.views import suggestions, search_house, HouseSearchView

app_name = 'es'

urlpatterns = [
    path('location_sugg', suggestions, name='loc_sugg'),
    path('house', search_house, name='house_search'),
    path('house/search', HouseSearchView.as_view(), name='house_search_2'),
]
