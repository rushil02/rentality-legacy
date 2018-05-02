from rest_framework import serializers
from cities.models import PostalCode, City
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from dal import autocomplete


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostalCode
        exclude = ['location', ]


@api_view(['GET'])
def location_list(request):
    """ searches location by post code"""
    query = request.GET.get('text', False)
    if query:
        locations = PostalCode.objects.filter(code__startswith=query)[:10]
        serializer = LocationSerializer(locations, many=True)
        return Response(serializer.data)
    else:
        return Response(status=HTTP_400_BAD_REQUEST)


class LocationAutocomplete(autocomplete.Select2QuerySetView):
    """ searches location by post code"""

    def get_queryset(self):
        # Don't forget to filter out results depending on the visitor !
        if not self.request.user.is_authenticated:
            return PostalCode.objects.none()

        qs = PostalCode.objects.all()

        if self.q:
            qs = qs.filter(code__startswith=self.q)[:10]
        return qs

    def get_result_label(self, item):
        return "%s - %s" % (item.code, item.name_full)

    def get_selected_result_label(self, item):
        return self.get_result_label(item)


class CityLocationAutocomplete(autocomplete.Select2QuerySetView):
    """ searches location by city name"""

    def get_queryset(self):
        # Don't forget to filter out results depending on the visitor !
        if not self.request.user.is_authenticated:
            return City.objects.none()

        qs = City.objects.all()
        print(qs)
        if self.q:
            qs = City.objects.filter(name_std__startswith=self.q)[:10]
        print(qs[:10])
        return qs

    def get_result_label(self, item):
        return "%s" % (item.name,)

    def get_selected_result_label(self, item):
        return self.get_result_label(item)
