from django.contrib import admin
from tenant.models import TenantProfile, HousePreference

admin.site.register(TenantProfile)
admin.site.register(HousePreference)
