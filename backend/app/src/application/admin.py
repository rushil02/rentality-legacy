from django.contrib import admin
from application.models import Application, AccountDetail, ApplicationState


# Register your models here.

class ApplicationAdmin(admin.ModelAdmin):
    autocomplete_fields = ['tenant', 'house']
    list_display = ('ref_code', 'tenant', 'house', 'uuid', 'rent', 'status', 'business_config', 'payment_gateway')
    list_filter = ('status', 'accountdetail__business_config', 'accountdetail__payment_gateway')
    list_select_related = (
        'accountdetail', 'accountdetail__business_config', 'accountdetail__payment_gateway', 'tenant__user',
        'tenant', 'house'
    )
    search_fields = ('ref_code', 'house__uuid', 'uuid')

    def business_config(self, obj):
        return obj.accountdetail.business_config

    def payment_gateway(self, obj):
        return obj.accountdetail.payment_gateway


class ApplicationStateAdmin(admin.ModelAdmin):
    list_display = ('application', 'new_state', 'old_state', 'actor', 'created_on')


class AccountDetailAdmin(admin.ModelAdmin):
    autocomplete_fields = ['application']
    list_display = ('application', 'business_config', 'cancellation_policy', 'payment_gateway')
    list_filter = ('business_config', 'cancellation_policy', 'payment_gateway')


admin.site.register(Application, ApplicationAdmin)
admin.site.register(AccountDetail, AccountDetailAdmin)
admin.site.register(ApplicationState, ApplicationStateAdmin)
