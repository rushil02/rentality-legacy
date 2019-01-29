from django.urls import path

from promotions.views import verify_promo_use, VerifyPromoUseAPIView

app_name = 'promotions'

urlpatterns = [
    path('verify-use/<uuid:house_uuid>', verify_promo_use, name='verify_use'),
    path('verify-promo-use/<str:applied_on>/<str:applied_by>', VerifyPromoUseAPIView.as_view(), name='verify_promo_use'),
]