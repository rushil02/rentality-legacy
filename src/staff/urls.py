from django.urls import path

from staff.views import create_edit_promo_code
from .views import home

app_name = 'staff'

urlpatterns = [
    path('', home, name='home'),
    path('promo-code/add', create_edit_promo_code, name='create_promo_code'),
    path('promo-code/edit/<int:promo_id>', create_edit_promo_code, name='edit_promo_code')
]
