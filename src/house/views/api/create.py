from django.http import Http404
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

from django.db.models import Q, Exists, OuterRef, Prefetch

from business_core.models import BusinessModelConfiguration, CancellationPolicy
from business_core.serializers import CancellationPolicySerializer
from house.models import Availability, House, HomeType, Facility, NeighbourhoodDescriptor, WelcomeTag, HouseRule, Rule, \
    Image
from house.permissions import IsOwnerOfHouse, IsOwnerOfRelatedHouse
from house.serializers import ImageUploadSerializer, NeighbourhoodDescriptorSerializer, \
    WelcomeTagSerializer, HouseAuthSerializer, AvailabilityAuthSerializer, ImageSerializer, \
    HouseRuleCreateSerializer, FacilitySerializer, RuleReadSerializer
from utils.api_thumbnailer import resize_image


class HouseView(APIView):
    """
    CRUD House
    Delete -> changes state of the house to `Deleted` which is inaccessible by all users

    FIXME: Put Activity Log
    """
    permission_classes = (IsAuthenticated, IsOwnerOfHouse)
    serializer_class = HouseAuthSerializer

    def get_object(self, house_uuid):
        return get_object_or_404(House.objects.all(), uuid=house_uuid)

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
            business_config = self.get_business_model_conf(request.user.get_billing_location(),
                                                           serializer.validated_data.get('location'))
            serializer.save(home_owner=request.user.home_owner, business_config=business_config)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, house_uuid):
        house = self.get_object(house_uuid)
        self.check_object_permissions(request, house)
        serializer = self.serializer_class(house, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            house_location = serializer.validated_data.get('location', house.location)
            business_config = self.get_business_model_conf(request.user.get_billing_location(), house_location)

            if house.business_config != business_config:
                serializer.save(business_config=business_config)
            else:
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, house_uuid):
        house = self.get_object(house_uuid)
        self.check_object_permissions(request, house)
        house.set_status('D')
        house.save()
        return Response(status=status.HTTP_200_OK)


class AvailabilityListView(APIView):
    """
    Used to show Availability dates to home owner.
    """
    permission_classes = (IsAuthenticated,)
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
        # FIXME add cancellation policy
        data = {
            'field_options': {
                'furnished': {item[0]: item[1] for item in House.FURNISHED_OPTIONS},
                'home_type': {home_type.id: home_type.name for home_type in HomeType.objects.all()},
            },
            'required_fields': House.REQUIRED_FIELDS,
            'status': 'j',
        }
        return Response(data, status=status.HTTP_200_OK)


class ImageUploadView(APIView):
    """
    Upload an Image for a house.
    """

    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAuthenticated,)
    serializer_class = ImageUploadSerializer

    def get_object(self, request, house_uuid):
        return get_object_or_404(House.objects.all(), uuid=house_uuid, home_owner__user=request.user)

    def post(self, request, house_uuid):
        house = self.get_object(request, house_uuid)
        file_serializer = self.serializer_class(data=request.data)
        if file_serializer.is_valid():
            image = file_serializer.save(house=house)
            response = {
                'is_thumbnail': image.is_thumbnail,
                'image': resize_image(image.image, 'th_col_3'),
                'uuid': image.uuid
            }
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ImageView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ImageSerializer

    def get_object(self, request, house_uuid):
        return get_object_or_404(House.objects.all(), uuid=house_uuid, home_owner__user=request.user)

    def get(self, request, house_uuid, image_uuid):
        # NOTE: Following two queries can be merged into single query; but this is traded in favour of maintainability
        # Since House Manager uses non standard manager with filters where basic behaviour is altered
        house = self.get_object(request, house_uuid)
        obj = get_object_or_404(Image.objects.all(), uuid=image_uuid, house=house)
        serializer = self.serializer_class(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, house_uuid, image_uuid):
        # NOTE: Following two queries can be merged into single query; but this is traded in favour of maintainability
        # Since House Manager uses non standard manager with filters where basic behaviour is altered
        house = self.get_object(request, house_uuid)
        obj = get_object_or_404(Image.objects.all(), uuid=image_uuid, house=house)
        obj.delete()
        try:
            new_thumbnail = Image.objects.get(house__uuid=house_uuid, is_thumbnail=True)
        except Image.DoesNotExist:
            return Response(status=status.HTTP_200_OK)
        else:
            response = {
                'is_thumbnail': new_thumbnail.is_thumbnail,
                'image': resize_image(new_thumbnail.image, 'th_col_3'),
                'uuid': new_thumbnail.uuid
            }
            return Response(response, status=status.HTTP_200_OK)

    def patch(self, request, house_uuid, image_uuid):
        # NOTE: Following two queries can be merged into single query; but this is traded in favour of maintainability
        # Since House Manager uses non standard manager with filters where basic behaviour is altered
        house = self.get_object(request, house_uuid)
        obj = get_object_or_404(Image.objects.all(), uuid=image_uuid, house=house)
        serializer = self.serializer_class(obj, data=request.data)
        if serializer.is_valid(raise_exception=True):
            image = serializer.save()
            response = {
                'is_thumbnail': image.is_thumbnail,
                'image': resize_image(image.image, 'th_col_3'),
                'uuid': image.uuid
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ImagesListView(APIView):
    """
    Fetch List of Images of a house.
    """

    permission_classes = (IsAuthenticated,)

    def get_object(self, request, house_uuid):
        return get_object_or_404(House.objects.all(), uuid=house_uuid, home_owner__user=request.user)

    def get(self, request, house_uuid):
        # NOTE: Following two queries can be merged into single query; but this is traded in favour of maintainability
        # Since House Manager uses non standard manager with filters where basic behaviour is altered
        house = self.get_object(request, house_uuid)
        qs = Image.objects.filter(house=house)
        response = []
        for obj in qs:
            response.append(
                {'image': resize_image(obj.image, 'th_col_3'), 'is_thumbnail': obj.is_thumbnail, 'uuid': obj.uuid}
            )
        return Response(response, status=status.HTTP_200_OK)


class FacilityListView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = FacilitySerializer

    def get_object(self, request, house_uuid):
        return get_object_or_404(House.objects.all(), uuid=house_uuid, home_owner__user=request.user)

    def get_facilities(self, house):
        return list(Facility.objects.filter(
            Q(system_default=True) | Q(house=house)
        ).distinct().values('verbose', 'id').annotate(
            checked=Exists(Facility.objects.filter(house=house, pk=OuterRef('pk')))))

    def get(self, request, house_uuid):
        house = self.get_object(request, house_uuid)
        qs = self.get_facilities(house)
        serializer = self.serializer_class(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, house_uuid):
        house = self.get_object(request, house_uuid)
        serializer = self.serializer_class(data=request.data, many=True)
        if serializer.is_valid(raise_exception=True):
            objs_set = serializer.save()
            house.facilities.add(*[obj[0] for obj in objs_set if obj[1] is True])
            house.facilities.remove(*[obj[0] for obj in objs_set if obj[1] is False and obj[0]])
            qs = self.get_facilities(house)
            serializer = self.serializer_class(qs, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class HouseRuleListView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RuleReadSerializer

    def get_object(self, request, house_uuid):
        return get_object_or_404(House.objects.all(), uuid=house_uuid, home_owner__user=request.user)

    def get_rules(self, house):
        return Rule.objects.all().prefetch_related(
            Prefetch('houserule_set', queryset=HouseRule.objects.filter(house=house), to_attr='house_rule')
        )

    def get(self, request, house_uuid):
        house = self.get_object(request, house_uuid)
        serializer = self.serializer_class(self.get_rules(house), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class HouseRuleListCreateView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = HouseRuleCreateSerializer

    def get_object(self, request, house_uuid):
        return get_object_or_404(House.objects.all(), uuid=house_uuid, home_owner__user=request.user)

    def post(self, request, house_uuid):
        house = self.get_object(request, house_uuid)
        serializer = self.serializer_class(data=request.data, many=True)
        if serializer.is_valid(raise_exception=True):
            objs_set = serializer.save(house=house)
            serializer = self.serializer_class(objs_set, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class ApplicableCancellationPolicyListView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CancellationPolicySerializer

    def get_object(self, request, house_uuid):
        return get_object_or_404(House.objects.all(), uuid=house_uuid, home_owner__user=request.user)

    def get(self, request, house_uuid):
        house = self.get_object(request, house_uuid)
        qs = CancellationPolicy.objects.get_applicable_cancellation_policies(house=house)
        serializer = self.serializer_class(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CancellationPolicyView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CancellationPolicySerializer

    def get_object(self, request, house_uuid):
        return get_object_or_404(House.objects.all(), uuid=house_uuid, home_owner__user=request.user)

    def get(self, request, house_uuid):
        house = self.get_object(request, house_uuid)
        serializer = self.serializer_class(house.cancellation_policy)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, house_uuid):
        house = self.get_object(request, house_uuid)
        try:
            policy = CancellationPolicy.objects.get(id=request.data['id'], businessmodelconfiguration__house=house)
        except CancellationPolicy.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            house.cancellation_policy = policy
            house.save()
            return Response(status=status.HTTP_200_OK)


class NeighbourhoodDescriptorListView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = NeighbourhoodDescriptorSerializer

    def get_object(self, request, house_uuid):
        return get_object_or_404(House.objects.all(), uuid=house_uuid, home_owner__user=request.user)

    def get_descriptors(self, house):
        return list(NeighbourhoodDescriptor.objects.filter(
            Q(system_default=True) | Q(house=house)
        ).distinct().values('verbose', 'id').annotate(
            checked=Exists(NeighbourhoodDescriptor.objects.filter(house=house, pk=OuterRef('pk')))))

    def get(self, request, house_uuid):
        house = self.get_object(request, house_uuid)
        qs = self.get_descriptors(house)
        serializer = self.serializer_class(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, house_uuid):
        house = self.get_object(request, house_uuid)
        serializer = self.serializer_class(data=request.data, many=True)
        if serializer.is_valid(raise_exception=True):
            objs_set = serializer.save()
            house.neighbourhood_facilities.add(*[obj[0] for obj in objs_set if obj[1] is True])
            house.neighbourhood_facilities.remove(*[obj[0] for obj in objs_set if obj[1] is False and obj[0]])
            qs = self.get_descriptors(house)
            serializer = self.serializer_class(qs, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class WelcomeTagsListView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = WelcomeTagSerializer

    def get_object(self, request, house_uuid):
        return get_object_or_404(House.objects.all(), uuid=house_uuid, home_owner__user=request.user)

    def get_tags(self, house):
        return list(WelcomeTag.objects.filter(
            Q(system_default=True) | Q(house=house)
        ).distinct().values('verbose', 'id').annotate(
            checked=Exists(WelcomeTag.objects.filter(house=house, pk=OuterRef('pk')))))

    def get(self, request, house_uuid):
        house = self.get_object(request, house_uuid)
        qs = self.get_tags(house)
        serializer = self.serializer_class(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, house_uuid):
        house = self.get_object(request, house_uuid)
        serializer = self.serializer_class(data=request.data, many=True)
        if serializer.is_valid(raise_exception=True):
            objs_set = serializer.save()
            house.welcome_tags.add(*[obj[0] for obj in objs_set if obj[1] is True])
            house.welcome_tags.remove(*[obj[0] for obj in objs_set if obj[1] is False and obj[0]])
            qs = self.get_tags(house)
            serializer = self.serializer_class(qs, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
