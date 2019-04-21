from rest_framework import status
from rest_framework.response import Response

from cities_custom.serializers import PostalCodeSerializer, PostalCodeVerboseOnlySerializer
from .models import PostalCodeCustom

from django.shortcuts import render
from rest_framework.views import APIView


class PostalCodeVerboseOnlyAPIView(APIView):
    """

    """
    def get(self, request):
        query = request.query_params['query']

        if not self.request.user.is_authenticated or not query:
            qs = PostalCodeCustom.objects.none()
        else:
            qs = PostalCodeCustom.objects.filter(code__istartswith=query)[:10]
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
