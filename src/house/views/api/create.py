from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from business_core.utils import House as HouseHandler, BusinessModel
from house.helpers import get_available_dates
from house.models import Availability, House, HomeType, Facility
from house.permissions import IsOwnerOfHouse, IsOwnerOfRelatedHouse
from house.serializers import HouseAuthSerializer, AvailabilityAuthSerializer


class AvailabilityListView(APIView):
    """
    Used to show Availability dates to home owner.
    """
    permission_classes = (IsAuthenticated, )
    serializer_class = AvailabilityAuthSerializer

    def get(self, request, house_uuid):
        objs = Availability.objects.filter(house__uuid=house_uuid, house__home_owner__user=request.user)
        serializer = self.serializer_class(objs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AvailabilityView(APIView):
    """
    Create, Update, Delete Availability
    """
    permission_classes = (IsAuthenticated, IsOwnerOfRelatedHouse)
    serializer_class = AvailabilityAuthSerializer

    def post(self, request, house_uuid, **kwargs):
        house = get_object_or_404(House.objects.all(), uuid=house_uuid, home_owner__user=request.user)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(house=house)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, house_uuid, obj_id=None):
        if obj_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        availability = Availability.objects.get(pk=obj_id, house__uuid=house_uuid)
        self.check_object_permissions(request, availability)
        availability.delete()
        return Response(status=status.HTTP_200_OK)

    def put(self, request, house_uuid, obj_id=None):
        if obj_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        availability = Availability.objects.get(pk=obj_id, house__uuid=house_uuid)
        self.check_object_permissions(request, availability)
        serializer = self.serializer_class(availability, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)


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
        house = get_object_or_404(House.objects.all().prefetch_related('availability_set'), uuid=house_uuid)
        self.check_object_permissions(request, house)
        serializer = self.serializer_class(house)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FormOptionsView(APIView):
    """
    Lists all options available for choices, and required fields to publish for listing
    """

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        data = {
            'field_options': {
                'furnished': {item[0]: item[1] for item in House.FURNISHED_OPTIONS},
                'home_type': {home_type.id: home_type.name for home_type in HomeType.objects.all()},
            },
            'required_fields': House.REQUIRED_FIELDS,
        }
        return Response(data, status=status.HTTP_200_OK)
