from django.contrib import admin
from tenant.models import TenantProfile, HousePreference


class HousePreferenceAdmin(admin.ModelAdmin):
    list_display = ('tenant', 'status')
    autocomplete_fields = ['locations']


class TenantProfileAdmin(admin.ModelAdmin):
    search_fields = ('user', )


admin.site.register(TenantProfile, TenantProfileAdmin)
admin.site.register(HousePreference, HousePreferenceAdmin)
