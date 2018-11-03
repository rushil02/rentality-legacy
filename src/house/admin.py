from django.contrib import admin

from house.models import House, Tag, Image, Application, RoomType, HouseProfile


class HouseAdmin(admin.ModelAdmin):
    autocomplete_fields = ['location']


class ImageAdmin(admin.ModelAdmin):
    pass


admin.site.register(Image, ImageAdmin)
admin.site.register(House, HouseAdmin)
admin.site.register(RoomType)
admin.site.register(Tag)
admin.site.register(Application)
admin.site.register(HouseProfile)
