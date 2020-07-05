from django.shortcuts import render, get_object_or_404
from django.contrib.admin.views.decorators import staff_member_required

from house.models import House


@staff_member_required
def houses_list(request):
    return render(request, 'staff/house/list.html', {
        'houses': House.objects.all().select_related('home_owner',)})


@staff_member_required
def house_details(request, uuid):
    return render(request, 'staff/house/details.html', {'house': get_object_or_404(House, uuid=uuid)})
