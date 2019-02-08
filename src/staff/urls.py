from django.urls import path

from staff.views import create_edit_promo_code, applications_list, application_details, application_resend_email
from .views import home

app_name = 'staff'

urlpatterns = [
    path('', home, name='home'),

    # Promotions
    path('promo-code/add', create_edit_promo_code, name='create_promo_code'),
    path('promo-code/edit/<int:promo_id>', create_edit_promo_code, name='edit_promo_code'),

    # Applications
    path('applications/list', applications_list, name='application_list'),
    path('applications/details/<uuid:uuid>', application_details, name='application_details'),
    path('application/resend-email/<str:entity>/<uuid:uuid>', application_resend_email, name='application_resend_email')

]
