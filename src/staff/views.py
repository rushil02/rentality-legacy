from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required  # FIXME: custom user check
def home(request):
    return HttpResponse("Staff Home Page")
