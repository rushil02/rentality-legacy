from rest_framework import status
from rest_framework.response import Response

from cities.models import Country
from cities_custom.serializers import PostalCodeVerboseOnlySerializer, CountrySerializer
from .models import PostalCodeCustom

from django.shortcuts import render
from rest_framework.views import APIView


class PostalCodeSuggestionsAPIView(APIView):
    """

    """
    def get(self, request):
        query = request.query_params['query']
        country_id = request.query_params.get('c-id', None)

        if not self.request.user.is_authenticated or not query:
            qs = PostalCodeCustom.objects.none()
        else:
            if country_id:
                qs = PostalCodeCustom.objects.filter(country=country_id)
            else:
                qs = PostalCodeCustom.objects.all()
            qs = qs.filter(code__istartswith=query)[:10]
        serializer = PostalCodeVerboseOnlySerializer(qs, many=True)
        return Response(serializer.data)


class PostalCodeDetailAPIView(APIView):
    """
    This will return the details of a postal code whose pk is passed through
    """

    def get(self, request, pk):
        try:
            postal_code = PostalCodeCustom.objects.get(id=pk)
            return Response(PostalCodeVerboseOnlySerializer(postal_code).data)
        except PostalCodeCustom.DoesNotExist:
            error = {
                'postal_code': 'Postal code does not exist'
            }
            return Response(error, status=status.HTTP_400_BAD_REQUEST)


class CountrySuggestionsApiView(APIView):
    """
    Country Suggestions List using linear search on 'name' field
    """

    def get(self, request):
        query = request.query_params['query']

        if not self.request.user.is_authenticated or not query:
            qs = Country.objects.none()
        else:
            qs = Country.objects.filter(name__istartswith=query)[:10]
        serializer = CountrySerializer(qs, many=True)
        return Response(serializer.data)


class CountryDetailAPIView(APIView):
    """
    This will return the details of a Country whose pk is passed through
    """

    def get(self, request, pk):
        try:
            country = Country.objects.get(id=pk)
            return Response(CountrySerializer(country).data)
        except Country.DoesNotExist:
            error = {
                'country': 'country does not exist'
            }
            return Response(error, status=status.HTTP_400_BAD_REQUEST)