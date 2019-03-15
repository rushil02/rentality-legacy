from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from business_core.utils import House as HouseHandler, BusinessModel
from house.helpers import get_available_dates
from house.models import Availability, House
from house.permissions import IsOwnerOfHouse
from house.serializers import AvailabilityPublicSerializer, NetAvailableDatesSerailizer, HouseAuthSerializer


class AvailabilityView(APIView):
    """
    Used to show dates to home owner and not prospective tenants
    """
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = AvailabilityPublicSerializer

    def get(self, request, house_uuid):
        objs = Availability.objects.filter(house__uuid=house_uuid)
        serializer = self.serializer_class(objs, many=True)
        return Response(serializer.data)

    def post(self, request, house_uuid):
        house = get_object_or_404(House.objects.all(), uuid=house_uuid)
        serializer = self.serializer_class(request.data, many=True)
        if serializer.is_valid(raise_exception=True):
            house = get_object_or_404(House.objects.all(), uuid=house_uuid)
            serializer.save(house=house)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class GetHouseListingConstraintsView(APIView):
    """
    Requires Home owner's location and House's location
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request, house_uuid):
        """
        Returns constraints on some attributes in reference to a house
        :param request:
        :return:
        """
        house = get_object_or_404(House.objects.all(), uuid=house_uuid)
        data = BusinessModel(house.business_config).to_dict()
        return Response(data, status=status.HTTP_200_OK)


class GetHouseBusinessBehaviourDescriptionView(APIView):
    """
    Requires a house with BusinessModelConfiguration
    """

    permission_classes = (IsAuthenticated,)

    def get(self, request, house_uuid):
        """
        Returns fee and transaction model
        :param request:
        :return:
        """
        house = get_object_or_404(House.objects.all(), uuid=house_uuid)
        data = house.business_config.get_description()
        return Response(data, status=status.HTTP_200_OK)


class CreateHouseView(APIView):
    """
    Create House
    Set Business-config
    """
    ...


class PromoCodeView(APIView):
    """
    Removes/Adds promo-code in reference to a house.
    Edit Business-config and Re-validate house (if required)
    """
    ...


class EditHouseView(APIView):
    """
    Edit House
    Edit Business-config and Re-validate house (if required)
    """
    permission_classes = (IsAuthenticated, IsOwnerOfHouse)
    serializer_class = HouseAuthSerializer

    def post(self, request, house_uuid):
        ...  # Validate and get house model object, if serializer is valid
        house = House()
        house_math_obj = HouseHandler.build(house, '')
        house.business_config = house_math_obj.get_business_config()
        errors = house_math_obj.validate()
        if errors:
            raise ...
        else:
            house.save()
            return ...  # 200/201 Response

    def get(self, request, house_uuid):
        if house_uuid:
            house = get_object_or_404(House.objects.all(), uuid=house_uuid)
        serializer = self.serializer_class
