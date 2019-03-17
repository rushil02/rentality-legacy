from django.contrib import admin

from payment_gateway.models import PaymentGateway, PaymentGatewayLocation, CountryBankAccountConfiguration

admin.site.register(PaymentGateway)
admin.site.register(PaymentGatewayLocation)
admin.site.register(CountryBankAccountConfiguration)
