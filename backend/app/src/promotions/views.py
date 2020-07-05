from django.http import JsonResponse
from django.shortcuts import render
from django.utils.datastructures import MultiValueDictKeyError
from django.views.decorators.http import require_GET
from rest_framework import status

from house.models import House
from promotions.forms import PromotionalCodeForm, PromotionalCodeRestrictionsForm
from promotions.models import PromotionalCode
from promotions.serializers import PromoCodeSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.contenttypes.models import ContentType


def create_promotional_code(request):
    main_form = PromotionalCodeForm(request.POST or None)
    validations_form = PromotionalCodeRestrictionsForm(request.POST or None)
    if request.POST:
        if main_form.is_valid() and validations_form.is_valid():
            obj = main_form.save(commit=False)
            obj.update_meta('validations', validations_form.get_meta())
            main_form.save()
    context = {
        'promo_form': main_form,
        'validations_form': validations_form,
    }
    return context


# TODO: FIXME - temp method process, promo-code should not be added here
@require_GET
def verify_promo_use(request, house_uuid):
    house = House.objects.get(uuid=house_uuid, home_owner__user=request.user)
    result = PromotionalCode.objects.validate(
        code=request.GET['code'],
        user=request.user,
        applied_on_content_type=ContentType.objects.get_for_model(house),
        applier_type='H'
    )

    if result["valid"]:
        verbose = result["obj"].verbose
        house.promo_codes.add(result["obj"])
    else:
        verbose = None
    return JsonResponse({'valid': result["valid"], "msg": result["msg"], "promo": verbose})


class VerifyPromoUseAPIView(APIView):
    """
    :param code
    :param applied_on_content_type application | house
    :param: applier_types tenant | home_owner
    """
    permission_classes = (IsAuthenticated,)

    applier_types = {
        "tenant": 'T',
        "home_owner": 'H'
    }

    def __init__(self, *args, **kwargs):
        self.applied_on_content_types = {
            "application": ContentType.objects.get(app_label='application', model='application'),
            "house": ContentType.objects.get(app_label='house', model='house')
        }
        super(VerifyPromoUseAPIView, self).__init__(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        try:
            code = request.GET['code']
            applied_on = self.applied_on_content_types[kwargs.get('applied_on')]
            applier_type = self.applier_types[kwargs.get('applied_by')]
        except KeyError:
            return Response({"detail": "Incomplete parameters."}, status=status.HTTP_400_BAD_REQUEST)

        result = PromotionalCode.objects.validate(
            code=code,
            user=request.user,
            applied_on_content_type=applied_on,
            applier_type=applier_type
        )
        if result["valid"]:
            return Response(PromoCodeSerializer(result["obj"]).data)
        else:
            return Response({"detail": result["msg"]}, status=status.HTTP_400_BAD_REQUEST)
