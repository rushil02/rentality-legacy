from django.urls import path

from .views import PostalCodeSuggestionsAPIView, PostalCodeDetailAPIView

app_name = 'cities_custom'

urlpatterns = [
    path('postal-code-sugg', PostalCodeSuggestionsAPIView.as_view(), name='postal_code_suggestions'),
    path('postal-code-details/<int:pk>', PostalCodeDetailAPIView.as_view(), name='postal_code_details')
]