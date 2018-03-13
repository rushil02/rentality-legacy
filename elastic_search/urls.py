from django.urls import path
from rest_framework import routers

from elastic_search.views import suggestions

# TODO: need routers?
# router = routers.DefaultRouter()
# router.register(r'location_sg', suggestions)

app_name = 'es'

urlpatterns = [
    path('location_sugg', suggestions, name='loc_sugg'),

]