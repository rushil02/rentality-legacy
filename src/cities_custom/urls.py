from django.urls import path

from .views import PostalCodeVerboseOnlyAPIView

app_name = 'cities_custom'

urlpatterns = [
    path('postal-code-vo', PostalCodeVerboseOnlyAPIView.as_view(), name='postal_code_verbose_only')
]