from django.contrib import admin

from home_owner.models import HomeOwnerProfile


class HomeOwnerProfileAdmin(admin.ModelAdmin):
    search_fields = ('user', )


admin.site.register(HomeOwnerProfile, HomeOwnerProfileAdmin)
