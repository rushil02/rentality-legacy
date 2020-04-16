from django.urls import path

from .views import PostalCodeSuggestionsAPIView, PostalCodeDetailAPIView, CountrySuggestionsApiView, \
    CountryDetailAPIView

app_name = 'cities_custom'

urlpatterns = [
    path('postal-code-sugg', PostalCodeSuggestionsAPIView.as_view(), name='postal_code_suggestions'),
    path('postal-code-details/<int:pk>', PostalCodeDetailAPIView.as_view(), name='postal_code_details'),
    path('country-sugg', CountrySuggestionsApiView.as_view(), name='country_suggestions'),
    path('country-details/<int:pk>', CountryDetailAPIView.as_view(), name='country_details')
]
