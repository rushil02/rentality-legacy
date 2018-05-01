from django.urls import path

from custom_package.api_utils import location_list, LocationAutocomplete
from house.views import info, add_edit_house, search_house_page, search_house_api, add_house_main

app_name = 'house'

urlpatterns = [
    path('info/<uuid:house_uuid>', info, name='info'),
    path('add/', add_house_main, name='add'),
    path('edit/<int:form_num>/<uuid:uuid>', add_edit_house, name='edit'),
    path('search', search_house_page, name='search_house'),
    path('search-api', search_house_api, name='search_house_api'),
    path('postal-location', LocationAutocomplete.as_view(), name='postal_code_api')
]
