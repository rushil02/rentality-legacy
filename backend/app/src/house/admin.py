from django.contrib import admin

from house.models import (
    House, Image, HomeType, HouseProfile, Availability, Facility, HouseRule, Rule, NeighbourhoodDescriptor, WelcomeTag
)


class HouseAdmin(admin.ModelAdmin):
    autocomplete_fields = ['location', 'facilities', 'neighbourhood_facilities', 'welcome_tags', 'home_owner']
    list_display = (
        'title', 'home_owner', 'uuid', 'status', 'business_config', 'payment_gateway'
    )
    list_filter = ('status', 'home_type', 'business_config', 'payment_gateway')
    search_fields = (
        'address', 'uuid', 'home_owner__user__email', 'home_owner__user__first_name', 'home_owner__user__last_name'
    )

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


class NeighbourhoodDescriptorAdmin(admin.ModelAdmin):
    search_fields = ('verbose',)


class WelcomeTagAdmin(admin.ModelAdmin):
    search_fields = ('verbose',)


class FacilityAdmin(admin.ModelAdmin):
    search_fields = ('verbose',)


class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ('house', 'dates', 'periodic')
    search_fields = ('house__address', 'house__uuid')



class HouseProfileAdmin(admin.ModelAdmin):
    list_display = ('house',)


admin.site.register(Image, ImageAdmin)
admin.site.register(House, HouseAdmin)
admin.site.register(HomeType)
admin.site.register(Facility, FacilityAdmin)
admin.site.register(Availability, AvailabilityAdmin)
admin.site.register(HouseProfile, HouseProfileAdmin)
admin.site.register(HouseRule)
admin.site.register(Rule)
admin.site.register(NeighbourhoodDescriptor, NeighbourhoodDescriptorAdmin)
admin.site.register(WelcomeTag, WelcomeTagAdmin)
