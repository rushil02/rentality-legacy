from django.contrib import admin
from django.db import models
from django.forms import TextInput, Textarea
from django_summernote.admin import SummernoteModelAdmin
from django_summernote.widgets import SummernoteWidget, SummernoteInplaceWidget

from essentials.models import Notification, DataPrivacySetting, Policy, DataPrivacySettingManager


class DataPrivacySettingAdmin(admin.ModelAdmin):
    list_display = ('content_object', 'attribute', 'setting', 'setting_verbose')

    # TODO: Can be removed, Don't see a foreseeable usage
    def setting_verbose(self, obj):
        return obj.get_setting_verbose()


class PolicyAdmin(SummernoteModelAdmin):
    list_display = ('version', 'verbose_name', 'code_name', 'status', 'parent_policy', 'updated_on', 'created_on')
    list_filter = ('status',)
    summernote_fields = ('html',)


admin.site.register(Notification)
admin.site.register(DataPrivacySetting, DataPrivacySettingAdmin)
admin.site.register(Policy, PolicyAdmin)
