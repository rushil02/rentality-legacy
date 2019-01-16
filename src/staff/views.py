from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from promotions.views import create_promotional_code


@login_required  # FIXME: custom user check
def home(request):
    return render(request, 'staff/dashboard.html', {})


def create_edit_promo_code(request, promo_id=None):
    if promo_id:
        context = {}
    else:
        context = create_promotional_code(request)
    return render(request, 'staff/promotions/create_edit.html', context)
