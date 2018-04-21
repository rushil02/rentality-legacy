from django.contrib import admin

from house.models import House, Tag, Image, Application


class ImageAdmin(admin.ModelAdmin):
    pass


admin.site.register(Image, ImageAdmin)
admin.site.register(House)
admin.site.register(Tag)
admin.site.register(Application)
