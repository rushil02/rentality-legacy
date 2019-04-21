from django.shortcuts import render

from .profile import *

def edit_profile_react(request, *args, **kwargs):
    return render(request, 'react/user.html', {"extra_data": {}})
