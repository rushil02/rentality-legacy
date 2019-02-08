from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required

from .promotions import *
from .applications import *


@staff_member_required
def home(request):
    return render(request, 'staff/dashboard.html', {})


