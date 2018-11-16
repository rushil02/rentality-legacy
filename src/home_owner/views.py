from django.http import HttpResponse
from django.shortcuts import render, redirect
from rest_framework import generics
from django.contrib.auth.decorators import login_required
from django.urls import reverse

from home_owner.models import HomeOwnerProfile
from home_owner.forms import HomeOwnerInfoForm, UserHomeOwnerForm, UserProfileHomeOwnerForm
from home_owner.serializers import ShortListSerializer
from cities.models import Country
from payments.stripe_wrapper import create_account, get_account


@login_required
def home(request):
    return HttpResponse("Home Owner Home Page")


@login_required()
def shortlisted_tenants(request):
    house_pref = request.user.home_owner.shortlist.all()
    return render(request, 'home_owner/shortlisted.html', {'shortlisted': house_pref})


class ShortlistView(generics.ListCreateAPIView):
    queryset = HomeOwnerProfile.objects.all()
    serializer_class = ShortListSerializer


@login_required
def home_owner_account_details(request):
    home_owner = request.user.home_owner
    if request.POST:
        home_owner_info_form = HomeOwnerInfoForm(request.POST)
        user_home_owner_form = UserHomeOwnerForm(request.POST, instance=request.user)
        user_profile_home_owner_form = UserProfileHomeOwnerForm(request.POST, instance=request.user.userprofile)
        if home_owner_info_form.is_valid() and user_profile_home_owner_form.is_valid() and user_profile_home_owner_form.is_valid():
            user_home_owner_form.save()
            user_profile_home_owner_form.save()
            if not home_owner.account_id:
                account = create_account(
                    country=home_owner_info_form.cleaned_data.get('country').code, 
                    email=request.user.email,
                    legal_entity={'type': 'individual'},
                    payout_schedule={
                        'interval': 'manual' 
                    }
                )
                account.account_token =  request.POST.get('token')
                account.save()
                home_owner.account_id = account.id
                home_owner.save()
            else:
                account = get_account(home_owner.account_id)
                account.account_token = request.POST.get('token')
                account.save()
            return redirect(reverse('home_owner:home_owner'))
    if home_owner.account_id:
        account = get_account(home_owner.account_id)
        country = Country.objects.get(code=account.country)
        home_owner_info_form = HomeOwnerInfoForm(
            initial={
                'country': country,
                'street_address1': account.legal_entity.address.line1,
                'city': account.legal_entity.address.city,
                'state': account.legal_entity.address.state,
                'zip': account.legal_entity.address.postal_code
            }
        )
    else:
        home_owner_info_form = HomeOwnerInfoForm()
    user_home_owner_form = UserHomeOwnerForm(instance=request.user)
    user_profile_home_owner_form = UserProfileHomeOwnerForm(instance=request.user.userprofile)
    context = {
        'home_owner_info_form': home_owner_info_form,
        'user_home_owner_form': user_home_owner_form,
        'user_profile_home_owner_form': user_profile_home_owner_form
    }
    return render(request, 'home_owner/home_owner_profile.html', context)