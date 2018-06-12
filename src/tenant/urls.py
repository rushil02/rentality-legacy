from django.urls import path

from custom_package.api_utils import CityLocationAutocomplete, LocationAutocomplete
from tenant.views import home, shortlisted_houses, info, search_tenant_page, \
    search_tenant_api, add_preference_main, add_edit_pref, mark_as_selected

app_name = 'tenant'

urlpatterns = [
    path('info/<uuid:house_pref_uuid>', info, name='info'),
    # FIXME: use form wizards and change add/edit urls
    path('add/', add_preference_main, name='add'),
    path('edit/<int:form_num>/<uuid:uuid>', add_edit_pref, name='edit'),
    path('sl', shortlisted_houses, name='shortlist'),
    path('search', search_tenant_page, name='search'),
    path('search-api', search_tenant_api, name='search_api'),
    path('city-location', CityLocationAutocomplete.as_view(), name='city_name_api'),
    path('selected-confirm/<uuid:hp_uuid>', mark_as_selected, name='mark_selected_ask'),

]
