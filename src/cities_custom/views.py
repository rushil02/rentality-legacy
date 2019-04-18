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

