from django.contrib import admin
from application.models import Application, AccountDetail, ApplicationState


# Register your models here.

class ApplicationAdmin(admin.ModelAdmin):
    autocomplete_fields = ['tenant', 'house']
    list_display = ('ref_code', 'tenant', 'house', 'uuid', 'rent', 'status')
    list_filter = ('status', )

    search_fields = ('ref_code', )


class AccountDetailAdmin(admin.ModelAdmin):
    autocomplete_fields = ['application']
    list_display = ('application', 'business_config', 'cancellation_policy', 'payment_gateway')
    list_filter = ('business_config', 'cancellation_policy', 'payment_gateway')


admin.site.register(Application, ApplicationAdmin)
admin.site.register(AccountDetail, AccountDetailAdmin)
admin.site.register(ApplicationState)
