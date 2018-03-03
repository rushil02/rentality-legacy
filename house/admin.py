from django.contrib import admin

from house.models import House, Tag, Image, Application

admin.site.register(House)
admin.site.register(Image)
admin.site.register(Tag)
admin.site.register(Application)
