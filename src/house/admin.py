from django.contrib import admin

from house.models import House, Image, Application, HomeType, HouseProfile, Availability, Facility


class HouseAdmin(admin.ModelAdmin):
    autocomplete_fields = ['location']


class ImageAdmin(admin.ModelAdmin):
    pass


admin.site.register(Image, ImageAdmin)
admin.site.register(House, HouseAdmin)
admin.site.register(HomeType)
admin.site.register(Facility)
admin.site.register(Availability)
admin.site.register(Application)
admin.site.register(HouseProfile)
