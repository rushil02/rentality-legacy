from django.contrib import admin
from essentials.models import Notification, DataPrivacySetting, Policy, DataPrivacySettingManager


class DataPrivacySettingAdmin(admin.ModelAdmin):
    list_display = ('content_object', 'attribute', 'setting', 'setting_verbose')

    # TODO: Can be removed, Don't see a foreseeable usage
    def setting_verbose(self, obj):
        return obj.get_setting_verbose()


class PolicyAdmin(admin.ModelAdmin):
    list_display = ('version', 'verbose_name', 'code_name', 'status', 'parent_policy', 'updated_on', 'created_on')
    list_filter = ('status',)

admin.site.register(Notification)
admin.site.register(DataPrivacySetting, DataPrivacySettingAdmin)
admin.site.register(Policy, PolicyAdmin)
