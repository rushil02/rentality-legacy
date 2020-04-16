from django.shortcuts import render

from .profile import *

# FIXME: remove
def edit_profile_react(request, *args, **kwargs):
    return render(request, 'react/base.html', {"extra_data": {}})
