from django.shortcuts import render, get_object_or_404
from django.views.decorators.http import require_GET

from house.models import House


@require_GET
def create(request, house_uuid):
    house = get_object_or_404(House, uuid=house_uuid)
    context = {
        'house': house,
        'move_in_date': '02 Oct 2018',
        'move_out_date': '28 Oct 2018',
        'guests': 2,
        'weeks': 4.7,
    }

    return render(request, 'application/apply.html', context)
