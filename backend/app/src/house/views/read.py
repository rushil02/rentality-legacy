from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from house.models import Image, House

from house.serializers.read import ImagePublicSerializer, AllHouseDetailsPublicSerializer
from utils.api_utils import InternalAccessAPIView


class ImagesPublicView(GenericAPIView):
    serializer_class = ImagePublicSerializer

    def get(self, request, house_uuid, *args, **kwargs):
        images = Image.objects.filter(house__uuid=house_uuid)
        serializer = self.serializer_class(images, many=True)
        return Response(serializer.data)


class ThumbnailPublicView(GenericAPIView):
    serializer_class = ImagePublicSerializer

    def get(self, request, house_uuid, *args, **kwargs):
        image = Image.objects.get(house__uuid=house_uuid, is_thumbnail=True)
        serializer = self.serializer_class(image)
        return Response(serializer.data)


class AllSEOHouses(InternalAccessAPIView):
    serializer_class = AllHouseDetailsPublicSerializer

    def get(self, request, internal_access_key, *args, **kwargs):
        super(AllSEOHouses, self).get(request, internal_access_key)
        houses = House.active_objects.filter(houseprofile__seo=True)
        serializer = self.serializer_class(houses, many=True)
        return Response(serializer.data)

