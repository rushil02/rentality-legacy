from django.contrib import admin
from business_core.models import BusinessModelConfiguration, CancellationPolicy, ConfigProfile, LocationRestriction

# Register your models here.


admin.site.register(BusinessModelConfiguration)
admin.site.register(ConfigProfile)
admin.site.register(LocationRestriction)
admin.site.register(CancellationPolicy)
