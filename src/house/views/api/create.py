from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

from django.db.models import Q, Exists, OuterRef

from business_core.models import BusinessModelConfiguration
from business_core.utils import House as HouseHandler
from house.models import Availability, House, HomeType, Facility, NeighbourhoodDescriptor, WelcomeTag
from house.permissions import IsOwnerOfHouse, IsOwnerOfRelatedHouse
from house.serializers import HouseAuthSerializer, AvailabilityAuthSerializer, ImageSerializer, \
    HouseRelatedObjectSerializer, HouseRuleSerializer


class HouseView(APIView):
    """
    Create House

    Rent, date, promocode, location

    CRUD

    Delete make inactive

    Add promo code
    List
    Unlist

    FIXME: Put Activity Log

    FIXME: rule, availability for house API
    """
    permission_classes = (IsAuthenticated, IsOwnerOfHouse)
    serializer_class = HouseAuthSerializer

    def get_object(self, house_uuid):
        return get_object_or_404(House.objects.all().prefetch_related('availability_set'), uuid=house_uuid)

    def get(self, request, house_uuid):
        house = self.get_object(house_uuid)
        self.check_object_permissions(request, house)
        serializer = self.serializer_class(house)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get_business_model_conf(self, home_owner_billing_location, house_location):
        return BusinessModelConfiguration.objects.get_location_default(
                home_owner_billing_location, house_location
            )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            business_config = self.get_business_model_conf(request.user.get_billing_location(), serializer.validated_data.get('location'))
            serializer.save(home_owner=request.user.home_owner, business_config=business_config)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, house_uuid):
        house = self.get_object(house_uuid)
        self.check_object_permissions(request, house)
        serializer = self.serializer_class(house, data=request.data)
        if serializer.is_valid(raise_exception=True):
            business_config = business_config = self.get_business_model_conf(request.user.get_billing_location(), serializer.validated_data.get('location'))
            
            if house.business_config != business_config:
                serializer.save(business_config=business_config)
            else:
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)


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
        # data = BusinessModel(house.business_config).to_dict()
        data = {

        }
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


class PromoCodeView(APIView):
    """
    Removes/Adds promo-code in reference to a house.
    Edit Business-config and Re-validate house (if required)

    Can Multiple promo codes have multiple business model confs?
    If no then add logic of single promo code can be applied of that type.
    """
    ...    


class FormOptionsView(APIView):
    """
    Lists all options available for choices, and required fields to publish for listing
    """

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        #FIXME add cancellation policy
        data = {
            'field_options': {
                'furnished': {item[0]: item[1] for item in House.FURNISHED_OPTIONS},
                'home_type': {home_type.id: home_type.name for home_type in HomeType.objects.all()},
            },
            'required_fields': House.REQUIRED_FIELDS,
        }
        return Response(data, status=status.HTTP_200_OK)


class ImageUploadView(APIView):
    """
    Upload a Image for a house.
    """

    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAuthenticated, IsOwnerOfHouse)
    serializer_class = ImageSerializer

    def get_object(self, house_uuid):
        return get_object_or_404(House.objects.all(), uuid=house_uuid)

    def post(self, request, house_uuid):
        house = self.get_object(house_uuid)
        self.check_object_permissions(request, house)
        file_serializer = self.serializer_class(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save(house=house)
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HouseRelatedObjectView(APIView):
    permission_classes = (IsAuthenticated, IsOwnerOfHouse)
    serializer = HouseRelatedObjectSerializer
    model_mapping = {
        "facility": {
            "model_class": Facility, 
            "house_attr": 'facilities'
        },
        "nearby_facility": {
            "model_class": NeighbourhoodDescriptor, 
            "house_attr": 'neighbourhood_facilities'
        },
        "welcome_tags": {
            "model_class": WelcomeTag, 
            "house_attr": 'welcome_tags'
        }
    }

    def get_object(self, house_uuid):
        return get_object_or_404(House.objects.all(), uuid=house_uuid)
    
    def get_queryset(self, house, model):
        return list(self.get_model_class(model).objects.filter(
            Q(system_default=True) | Q(house=house)
        ).distinct().values('verbose', 'id').annotate(
            checked=Exists(self.get_model_class(model).objects.filter(house=house, pk=OuterRef('pk')))))
    
    @classmethod
    def get_model_class(cls, model):
        return cls.model_mapping[model]["model_class"]
    
    @classmethod
    def get_house_attr(cls, model):
        return cls.model_mapping[model]["house_attr"]

    def get(self, request, house_uuid, **kwargs):
        house = self.get_object(house_uuid)
        self.check_object_permissions(request, house)
        model = self.kwargs.pop('model')
        qs = self.get_queryset(house, model)
        serializer = self.serializer(model_class=self.get_model_class(model), data=qs, many=True)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, house_uuid, **kwargs):
        house = self.get_object(house_uuid)
        self.check_object_permissions(request, house)
        model = self.kwargs.pop('model')
        serializer = self.serializer(model_class=self.get_model_class(model), data=request.data, many=True)
        if serializer.is_valid(raise_exception=True):
            objs_set = serializer.save()
            getattr(house, self.get_house_attr(model)).add(*[obj[0] for obj in objs_set if obj[1] is True])
            getattr(house, self.get_house_attr(model)).remove(*[obj[0] for obj in objs_set if obj[1] is False and obj[0]])
            qs = self.get_queryset(house, model)
            serializer = self.serializer(model_class=self.get_model_class(model), data=qs, many=True)
            if serializer.is_valid(raise_exception=True):
                return Response(serializer.validated_data, status=status.HTTP_201_CREATED)


class HouseRulesView(APIView):
    permission_classes = (IsAuthenticated, IsOwnerOfHouse)
    serializer_class = HouseRuleSerializer

    def get_object(self, house_uuid):
        return get_object_or_404(House.objects.all().prefetch_related('houserule_set'), uuid=house_uuid)

    def get(self, request, house_uuid):
        house = self.get_object(house_uuid)
        self.check_object_permissions(request, house)
        house_rules = house.houserule_set.all()
        serializer = self.serializer_class(house_rules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, house_uuid):
        house = self.get_object(house_uuid)
        self.check_object_permissions(request, house)
        house_rules = house.houserule_set.all()
        serializer = self.serializer_class(house_rules, data=request.data, many=True)
        if serializer.is_valid(raise_exception=True):
            objs_set = serializer.save()
            serializer = self.serializer_class(objs_set, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
