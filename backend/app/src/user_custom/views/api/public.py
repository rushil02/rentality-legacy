from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import F
from django.contrib.messages import get_messages
from house.models import House
from house.serializers.read import HouseShortInfoSerializer


class HouseRecommendationListView(APIView):
    serializer_class = HouseShortInfoSerializer

    def get(self, request):
        house_list = House.active_objects.all().annotate(
            min_stay_weeks=F('min_stay') / 7
        ).order_by(
            'houseprofile__priority', '-updated_on'
        )[:11]
        serializer = self.serializer_class(house_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SystemMessagesView(APIView):

    def get(self, request):
        storage = get_messages(request)
        messages = []
        for message in storage:
            messages.append(dict(message=message.message, level=message.level, tags=message.tags,
                                 extra_tags=message.extra_tags, level_tag=message.level_tag))
        return JsonResponse(messages, safe=False, status=status.HTTP_200_OK)


