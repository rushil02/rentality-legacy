from django.urls import path

from elastic_search.views.api.blogs import BlogSearchView
from elastic_search.views.api.house import HouseSearchView
from elastic_search.views.api.location import suggestions


app_name = 'es'

urlpatterns = [
    path('location_sugg', suggestions, name='loc_sugg'),
    path('house/search', HouseSearchView.as_view(), name='house_search'),
    path('blog', BlogSearchView.as_view(), name='blog_search'),

]
