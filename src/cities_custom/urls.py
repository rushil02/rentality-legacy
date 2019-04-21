from django.urls import path

from .views import PostalCodeVerboseOnlyAPIView, PostalCodeDetailAPI

app_name = 'cities_custom'

urlpatterns = [
    path('postal-code-vo', PostalCodeVerboseOnlyAPIView.as_view(), name='postal_code_verbose_only'),
    path('postal-code-details/<int:pk>', PostalCodeDetailAPI.as_view(), name='postal_code_details')
]