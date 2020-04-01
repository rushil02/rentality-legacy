from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User, UserProfile, Account,PersonalityTag


class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('first_name', 'last_name', 'email')
    ordering = ('email',)


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'sex', 'account_type', 'business_name')
    list_filter = ('account_type', 'sex')
    autocomplete_fields = ('billing_postcode', 'billing_country', 'personality_tags')


class PersonalityTagAdmin(admin.ModelAdmin):
    search_fields = ('verbose', )


# Register your models here.
admin.site.register(User, CustomUserAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Account)
admin.site.register(PersonalityTag, PersonalityTagAdmin)
