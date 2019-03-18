from django.contrib import admin

from payment_gateway.models import PaymentGateway, PaymentGatewayLocation

admin.site.register(PaymentGateway)
admin.site.register(PaymentGatewayLocation)
