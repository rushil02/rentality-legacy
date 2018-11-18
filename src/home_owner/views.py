from django.http import HttpResponse
from django.shortcuts import render, redirect
from rest_framework import generics
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from billing.models import Order, Fee

from home_owner.models import HomeOwnerProfile
from home_owner.forms import HomeOwnerInfoForm, UserHomeOwnerForm, UserProfileHomeOwnerForm
from home_owner.serializers import ShortListSerializer
from cities.models import Country
from payments.stripe_wrapper import create_account, get_account
from house.models import Application, ApplicationState
from payments.stripe_wrapper import create_charge


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
                kwargs = {
                    'country': home_owner_info_form.cleaned_data.get('country').code,
                    'email': request.user.email,
                    'payout_schedule': {
                        'interval': 'manual'
                    },
                    'account_token': request.POST.get('token')
                }
                if request.POST.get('bank_account_token'):
                    kwargs['external_account'] = request.POST.get('bank_account_token')
                account = create_account(**kwargs)
                home_owner.account_id = account.id
                home_owner.save()
            else:
                account = get_account(home_owner.account_id)
                account.account_token = request.POST.get('token')
                if request.POST.get('bank_account_token'):
                    account.external_account = request.POST.get('bank_account_token')
                account.save()
            return redirect(reverse('home_owner:account_details'))
    bank_warning_message = ""
    if home_owner.account_id:
        account = get_account(home_owner.account_id)
        country = Country.objects.get(code=account.country)
        home_owner_info_form = HomeOwnerInfoForm(
            business_tax_id_provided=account.legal_entity.get('business_tax_id_provided', False),
            initial={
                'country': country,
                'street_address1': account.legal_entity.address.line1,
                'city': account.legal_entity.address.city,
                'state': account.legal_entity.address.state,
                'zip': account.legal_entity.address.postal_code,
                'type': account.legal_entity.type,
                'business_name': account.legal_entity.get('business_name')
            }
        )
        if len(account.external_accounts.data) > 0:
            bank_warning_message = "A external account with account number ending with {} already exists. " \
                                   "Entering data again will overwrite the previous information.".format(
                account.external_accounts.data[0].last4
            )
    else:
        home_owner_info_form = HomeOwnerInfoForm()
    user_home_owner_form = UserHomeOwnerForm(instance=request.user)
    user_profile_home_owner_form = UserProfileHomeOwnerForm(instance=request.user.userprofile)
    context = {
        'home_owner_info_form': home_owner_info_form,
        'user_home_owner_form': user_home_owner_form,
        'user_profile_home_owner_form': user_profile_home_owner_form,
        'bank_warning_message': bank_warning_message
    }
    return render(request, 'home_owner/account_info.html', context)


@login_required
def application_detail(request, application_uuid):
    try:
        application = Application.objects.get(uuid=application_uuid)
    except Application.DoesNotExist:
        raise Http404("Application does not exist")
    else:
        if request.POST:
            old_state = application.status
            if old_state == 'P':
                application.status = 'A'
                application.save()

                application_state = ApplicationState(old_state=old_state, new_state='A', actor=request.user)
                application_state.save()

                amounts = calculate_amount(application.rent)

                amount = amounts['source_amount']
                customer = application.tenant.customer_id
                destination_amount = amounts['destination_amount']
                destination_account = application.house.home_owner.account_id

                charge = create_charge(
                    customer=customer,
                    target_account_id=destination_account,
                    amount=amount,
                    destination_amount=destination_amount
                )

                print(charge.id)

                order = Order(application=application, charge_id=charge.id)
                order.save()
                return redirect(reverse('home_owner:application_detail', args=[application_uuid, ]))
        context = {
            'application': application
        }
        return render(request, 'home_owner/application_detail.html', context)


def calculate_amount(rent):
    fee = Fee.objects.get(active=True)
    d = {
        'source_amount': int(rent * (1 + (fee.tenant_charge/100))) * 100,
        'destination_amount': int(rent * (1 - (fee.home_owner_charge/100))) * 100
    }
    return d
