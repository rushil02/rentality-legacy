from rest_framework.views import APIView


class CreateBookingView(APIView):
    """
    Edit House
    Edit Business-config and Re-validate house (if required)
    """
    permission_classes = (IsAuthenticated, IsOwnerOfHouse)
    serializer_class = HouseAuthSerializer

    def post(self, request, house_uuid):
        ...  # Validate and get house model object, if serializer is valid
        house = House()
        house_math_obj = HouseMath.build(house)
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
