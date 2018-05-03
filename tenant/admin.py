from django.contrib import admin
from tenant.models import TenantProfile, HousePreference


class HousePreferenceAdmin(admin.ModelAdmin):
    list_display = ('tenant', 'status')


admin.site.register(TenantProfile)
admin.site.register(HousePreference, HousePreferenceAdmin)
