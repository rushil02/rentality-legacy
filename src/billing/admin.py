from django.contrib import admin
from billing.models import Order, Fee

# Register your models here.


admin.site.register(Order)
admin.site.register(Fee)