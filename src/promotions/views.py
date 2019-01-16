from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_GET

from house.models import House
from promotions.forms import PromotionalCodeForm, PromotionalCodeRestrictionsForm
from promotions.models import PromotionalCode


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


# def edit_promotional_code(request, code):
#     return context

# TODO: FIXME - temp method process, promo-code should not be added here
@require_GET
def verify_promo_use(request, house_uuid):
    house = House.objects.get(uuid=house_uuid, home_owner__user=request.user)
    result = PromotionalCode.objects.validate(code=request.GET['code'], user=request.user, entity=house,
                                              applier_type='H')
    if result[0]:
        verbose = result[2].verbose
        house.promo_codes.add(result[2])
    else:
        verbose = None
    return JsonResponse({'valid': result[0], "msg": result[1], "promo": verbose})
