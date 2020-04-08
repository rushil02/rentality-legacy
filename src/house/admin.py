from django.contrib import admin

from house.models import House, Image, HomeType, HouseProfile, Availability, Facility, HouseRule, Rule


class HouseAdmin(admin.ModelAdmin):
    autocomplete_fields = ['location']
    list_display = ('home_owner', 'title', 'address', 'location', 'home_type', 'status')
    list_filter = ('status', 'home_type')
    search_fields = ('address', 'location')

    def get_queryset(self, request):
        if request.user.is_superuser:
            qs = self.model.all_objects.get_queryset()
            ordering = self.get_ordering(request)
            if ordering:
                qs = qs.order_by(*ordering)
            return qs
        else:
            return super(HouseAdmin, self).get_queryset(request)


class ImageAdmin(admin.ModelAdmin):
    pass



class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ('house', 'dates', 'periodic')


admin.site.register(Image, ImageAdmin)
admin.site.register(House, HouseAdmin)
admin.site.register(HomeType)
admin.site.register(Facility)
admin.site.register(Availability, AvailabilityAdmin)
admin.site.register(HouseProfile)
admin.site.register(HouseRule)
admin.site.register(Rule)
