from django.contrib import admin

from payment_gateway.models import PaymentGateway, PaymentGatewayLocation


class PaymentGatewayLocationAdmin(admin.ModelAdmin):
    list_display = ('payment_gateway', 'home_owner_billing_location', 'house_location', 'active', 'default')
    autocomplete_fields = ('home_owner_billing_location', )


admin.site.register(PaymentGateway)
admin.site.register(PaymentGatewayLocation, PaymentGatewayLocationAdmin)
