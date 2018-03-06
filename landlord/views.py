from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required
def home(request):
    return HttpResponse("Landlord Home Page")


@login_required()
def shortlisted_tenants(request):
    house_pref = request.user.landlord.shortlist.all()
    return render(request, 'landlord/shortlisted.html', {'shortlisted': house_pref})
