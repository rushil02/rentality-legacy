from django.contrib import admin

from house.models import House, Image, Application, HomeType, HouseProfile, Availability, Facility, HouseRule, Rule, \
    CancellationPolicy


class HouseAdmin(admin.ModelAdmin):
    autocomplete_fields = ['location']


class ImageAdmin(admin.ModelAdmin):
    pass


class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('uuid', )


admin.site.register(Image, ImageAdmin)
admin.site.register(House, HouseAdmin)
admin.site.register(HomeType)
admin.site.register(Facility)
admin.site.register(Availability)
admin.site.register(Application, ApplicationAdmin)
admin.site.register(HouseProfile)
admin.site.register(HouseRule)
admin.site.register(Rule)
admin.site.register(CancellationPolicy)
