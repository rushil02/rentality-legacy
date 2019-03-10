from django.contrib import admin
from admin_custom.models import ActivityLog, CancellationPolicy

# Register your models here.


admin.site.register(ActivityLog)
admin.site.register(CancellationPolicy)
