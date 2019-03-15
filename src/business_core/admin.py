from django.contrib import admin
from business_core.models import BusinessModelConfiguration, CancellationPolicy

# Register your models here.


admin.site.register(BusinessModelConfiguration)
admin.site.register(CancellationPolicy)
