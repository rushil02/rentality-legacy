from django.urls import path

from .views import PostalCodeVerboseOnlyAPIView, PostalCodeDetailAPIView

app_name = 'cities_custom'

urlpatterns = [
    path('postal-code-vo', PostalCodeVerboseOnlyAPIView.as_view(), name='postal_code_verbose_only'),
    path('postal-code-details/<int:pk>', PostalCodeDetailAPIView.as_view(), name='postal_code_details')
]