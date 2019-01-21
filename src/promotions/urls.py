from django.urls import path

from promotions.views import verify_promo_use, VerifyPromoUseView

app_name = 'promotions'

urlpatterns = [
    path('verify-use/<uuid:house_uuid>', verify_promo_use, name='verify_use'),
    path('verify-promo-use', VerifyPromoUseView.as_view(), name='verify_promo_use'),
]