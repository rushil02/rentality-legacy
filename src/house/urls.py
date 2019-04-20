from django.urls import path

from house.serializers import HouseDetailsPublicSerializer
from house.views.api.create import EditHouseView, FormOptionsView, AvailabilityView, AvailabilityListView, \
    CreateHouseView
from house.views.old import search_house_page, search_house_api
from utils.api_utils import location_list, LocationAutocomplete
from house.views import info, create, edit, ImageUploadView, FacilityView, NearbyFacilitiesView, \
    home_owner_account_details, WelcomeTagView, apply_temp, remove_from_public, delete, HouseDetailPublicView, \
    ImagesPublicView, ThumbnailPublicView

from house.views.api import NetAvailableDatesView, create_react

app_name = 'house'

urlpatterns = [
    path('info/<uuid:house_uuid>', info, name='info'),
    path('add/', create, name='create'),
    path('add/<uuid:house_uuid>/', edit, name='create_edit'),
    path('images/<uuid:house_uuid>/', ImageUploadView.as_view(), name='add_house_images'),
    path('facilities/<uuid:house_uuid>/', FacilityView.as_view(), name='facility'),
    path('nearby_facilities/<uuid:house_uuid>/', NearbyFacilitiesView.as_view(), name='nearby_facility'),
    path('payment_details/<uuid:house_uuid>/', home_owner_account_details, name='payment'),
    path('welcome_tags/<uuid:house_uuid>/', WelcomeTagView.as_view(), name='welcome_tags'),

    # path('edit/<int:form_num>/<uuid:uuid>', add_edit_house, name='edit'),
    path('search', search_house_page, name='search_house'),
    path('search-api', search_house_api, name='search_house_api'),
    path('postal-location', LocationAutocomplete.as_view(), name='postal_code_api'),
    path('del/<uuid:house_uuid>', delete, name='delete_object'),
    path('rem/<uuid:house_uuid>', remove_from_public, name='remove_public'),

    # FIXME: Remove
    path('test/<uuid:house_uuid>', NetAvailableDatesView.as_view(), name='test'),

    # React Entry-points
    path('create/', create_react, name='create_react'),
    path('edit/<uuid:house_uuid>', create_react, name='create_react_edit'),

    # APIs
    path('detail/<uuid:house_uuid>', HouseDetailPublicView.as_view(), name='detail_api'),
    path('all-images/<uuid:house_uuid>', ImagesPublicView.as_view(), name='all_images'),
    path('thumbnail/<uuid:house_uuid>', ThumbnailPublicView.as_view(), name='thumbnail'),
    path('current-availability/<uuid:house_uuid>', NetAvailableDatesView.as_view(), name='curr_avail'),

    # Creation APIs
    path('create/api', CreateHouseView.as_view(), name='create_api'),
    path('create/edit/<uuid:house_uuid>', EditHouseView.as_view(), name='edit_api'),
    path('form-options', FormOptionsView.as_view(), name='create_form_options'),
    path('availability/list/<uuid:house_uuid>', AvailabilityListView.as_view(), name='availability_info_api'),
    path('availability/<uuid:house_uuid>', AvailabilityView.as_view(), name='availability_update_api'),
    path('availability/<uuid:house_uuid>/<int:obj_id>', AvailabilityView.as_view(),
         name='availability_delete_api'),
]
