from django.urls import path

from utils.api_utils import location_list, LocationAutocomplete
from house.views import info, add_edit_house, search_house_page, search_house_api, add_house_main, remove_house_ask, \
    delete_listing, remove_listing, mark_as_leased, create

app_name = 'house'

urlpatterns = [
    path('info/<uuid:house_uuid>', info, name='info'),
    path('add/', create, name='create'),
    path('add/<uuid:house_uuid>/', create, name='create_edit'),

    path('edit/<int:form_num>/<uuid:uuid>', add_edit_house, name='edit'),
    path('search', search_house_page, name='search_house'),
    path('search-api', search_house_api, name='search_house_api'),
    path('postal-location', LocationAutocomplete.as_view(), name='postal_code_api'),
    path('remove-ask/<uuid:house_uuid>', remove_house_ask, name='remove_house_ask'),
    path('del/<uuid:house_uuid>', delete_listing, name='delete_house'),
    path('rem/<uuid:house_uuid>', remove_listing, name='remove_house'),
    path('leased-confirm/<uuid:house_uuid>', mark_as_leased, name='mark_leased_ask'),

]
