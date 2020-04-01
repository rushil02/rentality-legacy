from django.urls import path

from payment_gateway.views.api.home_owner import GetPGDetails, UpdateHomeOwnerView, AddHomeOwnerView, \
    GetBankAccountDetailsFieldsForCountry, AddUpdateBankAccountView

app_name = 'payment_gateway'

urlpatterns = [
    path('get-pg/<str:pg_code>/<uuid:house_uuid>', GetPGDetails.as_view(), name='get_pg_details'),
    path('add-ho-acc/<str:pg_code>/<uuid:house_uuid>', AddHomeOwnerView.as_view(), name='add_homeowner_account'),
    path('update-ho-acc/<str:pg_code>', UpdateHomeOwnerView.as_view(), name='update_homeowner_account'),
    path('update-ho-ba/<str:pg_code>', AddUpdateBankAccountView.as_view(), name='add_update_ban_account'),
    path('get-bank-account-fields', GetBankAccountDetailsFieldsForCountry.as_view(), name='get_bank_account_fields')
]
