from django.urls import path

from house.views.api.create import HouseView, FormOptionsView, AvailabilityView, AvailabilityListView, ImageUploadView, \
    FacilityListView, HouseRuleListView, HouseRuleListCreateView, ImagesListView, ImageView, \
    ApplicableCancellationPolicyListView, CancellationPolicyView, NeighbourhoodDescriptorListView, WelcomeTagsListView
from house.views.api.actions import ActivateHouseListing, DeactivateHouseListing
from house.views.api.read import HouseDetailsPublicView, NetAvailableDatesView, NetUnavailableDatesView

from house.views.old import search_house_page, search_house_api

from utils.api_utils import location_list, LocationAutocomplete

from house.views import info, create, edit, \
    home_owner_account_details, apply_temp, remove_from_public, delete, \
    ImagesPublicView, ThumbnailPublicView

# from house.views.api import NetAvailableDatesView


app_name = 'house'

urlpatterns = [
    path('info/<uuid:house_uuid>', info, name='info'),
    # path('add/', create, name='create'),
    # path('add/<uuid:house_uuid>/', edit, name='create_edit'),
    # path('payment_details/<uuid:house_uuid>/', home_owner_account_details, name='payment'),

    # path('edit/<int:form_num>/<uuid:uuid>', add_edit_house, name='edit'),

    path('search', search_house_page, name='search_house'),
    path('search-api', search_house_api, name='search_house_api'),
    path('postal-location', LocationAutocomplete.as_view(), name='postal_code_api'),
    path('del/<uuid:house_uuid>', delete, name='delete_object'),
    path('rem/<uuid:house_uuid>', remove_from_public, name='remove_public'),

    # APIs
    path('detail/<uuid:house_uuid>', HouseDetailsPublicView.as_view(), name='detail_api'),
    path('all-images/<uuid:house_uuid>', ImagesPublicView.as_view(), name='all_images'),
    path('thumbnail/<uuid:house_uuid>', ThumbnailPublicView.as_view(), name='thumbnail'),
    path('current-availability/<uuid:house_uuid>', NetAvailableDatesView.as_view(), name='curr_avail'),
    path('current-unavailability/<uuid:house_uuid>', NetUnavailableDatesView.as_view(), name='curr_avail_rev'),

    # Creation APIs
    path('create/api', HouseView.as_view(), name='create_api'),
    path('create/edit/<uuid:house_uuid>', HouseView.as_view(), name='edit_api'),  # handles Read, Update, Delete
    path('form-options', FormOptionsView.as_view(), name='create_form_options'),
    path('availability/list/<uuid:house_uuid>', AvailabilityListView.as_view(), name='availability_info_api'),
    path('availability/<uuid:house_uuid>', AvailabilityView.as_view(), name='availability_update_api'),
    path('availability/<uuid:house_uuid>/<int:obj_id>', AvailabilityView.as_view(), name='availability_delete_api'),
    path('facilities/<uuid:house_uuid>', FacilityListView.as_view(), name='facility'),
    path('rules/list/<uuid:house_uuid>', HouseRuleListView.as_view(), name='rules_list'),
    path('rules/update/<uuid:house_uuid>', HouseRuleListCreateView.as_view(), name='rules_update'),
    path('image/<uuid:house_uuid>/<uuid:image_uuid>', ImageView.as_view(), name='add_house_images'),
    path('image/upload/<uuid:house_uuid>', ImageUploadView.as_view(), name='add _house_images'),
    path('image/list/<uuid:house_uuid>', ImagesListView.as_view(), name='add_house_images'),
    path('can-pol/list/<uuid:house_uuid>', ApplicableCancellationPolicyListView.as_view(),
         name='cancellation_policies'),
    path('can-pol/<uuid:house_uuid>', CancellationPolicyView.as_view(), name='get_cancellation_policy'),
    path('can-pol/update/<uuid:house_uuid>', CancellationPolicyView.as_view(), name='set_cancellation_policy'),
    path('neighbourhood-desc/<uuid:house_uuid>', NeighbourhoodDescriptorListView.as_view(), name='nearby_facility'),
    path('welcome-tags/<uuid:house_uuid>', WelcomeTagsListView.as_view(), name='welcome_tags'),

    # Actions
    path('activate/<uuid:house_uuid>', ActivateHouseListing.as_view(), name='activate_listing'),
    path('deactivate/<uuid:house_uuid>', DeactivateHouseListing.as_view(), name='deactivate_listing'),

]
