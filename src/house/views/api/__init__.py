from django.shortcuts import render, get_object_or_404, redirect, reverse

from .read import *


def create_react(request, *args, **kwargs):
    return render(request, 'react/home_owner.html', {"extra_data": {}})
