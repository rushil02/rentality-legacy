from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from house.models import Image

from house.serializers.read import ImagePublicSerializer


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
