from django.contrib import admin

from promotions.models import PromotionalCode


class PromotionalCodeAdmin(admin.ModelAdmin):
    list_display = ('code', 'verbose')


admin.site.register(PromotionalCode, PromotionalCodeAdmin)
