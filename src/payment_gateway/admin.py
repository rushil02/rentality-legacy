from django.contrib import admin

from payment_gateway.models import PaymentGateway, Profile, LocationRestriction


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('payment_gateway', 'country')
    autocomplete_fields = ('country', )


admin.site.register(PaymentGateway)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(LocationRestriction)
