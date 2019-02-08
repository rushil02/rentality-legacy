from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required

from promotions.views import create_promotional_code


@staff_member_required
def create_edit_promo_code(request, promo_id=None):
    if promo_id:
        context = {}
    else:
        context = create_promotional_code(request)
    return render(request, 'staff/promotions/create_edit.html', context)
