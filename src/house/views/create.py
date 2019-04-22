from allauth.account.decorators import verified_email_required
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError, NON_FIELD_ERRORS
from django.http import Http404, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import messages
from django.db.models import Q, Exists, OuterRef
from rest_framework import status, viewsets
from rest_framework.parsers import JSONParser, FileUploadParser, MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from home_owner.forms import HomeOwnerInfoForm, UserHomeOwnerForm, UserProfileHomeOwnerForm
from house.forms import HouseDetailsForm1, HouseDetailsForm2, HouseDetailsForm3, SearchForm, \
    HousePhotoFormSet, HouseDeleteForm, HouseRemoveTypeForm, HouseMarkLeasedForm, HouseRemoveForm, HouseForm, \
    AvailabilityFormSet, HouseRuleFormSet, SubmitOptionsForm
from house.models import House, Image, Facility, HouseRule, NeighbourhoodDescriptor, WelcomeTag
from house.serializers import ImageSerializer, FacilitySerializer, NearbyFacilitySerializer, WelcomeTagSerializer
from cities.models import Country
from payments.stripe_wrapper import create_account, get_account
from user_custom.forms import ProfilePictureForm


@login_required()
def edit(request, house_uuid):
    try:
        house = House.objects.get(uuid=house_uuid, home_owner__user=request.user)
    except House.DoesNotExist:
        raise Http404("House Information does not exist. It may be deleted by the user.")
    else:
        main_form = HouseForm(request.POST or None, instance=house, prefix='main-form')
        availability_formset = AvailabilityFormSet(request.POST or None, queryset=house.availability_set.all(),
                                                   instance=house, prefix='availability-form')
        image_formset = HousePhotoFormSet(request.POST or None, instance=house, queryset=house.image_set.all(),
                                          prefix='images-form')
        rule_formset = HouseRuleFormSet(request.POST or None, instance=house,
                                        queryset=HouseRule.objects.filter(house=house))
        user_form = ProfilePictureForm(request.POST or None, request.FILES or None, instance=request.user.userprofile,
                                       prefix='profile-pic-form')

        context = {
            "house": house,
            'main_form': main_form,
            'user_form': user_form,
            'availability_formset': availability_formset,
            'image_formset': image_formset,
            'rule_formset': rule_formset
        }
        if request.method == 'POST':
            valid = True

            if main_form.is_valid():
                main_form.save()
            else:
                valid = False

            if user_form.is_valid():
                user_form.save()

            if availability_formset.is_valid():
                availability_formset.save()
            else:
                valid = False

            if image_formset.is_valid():
                image_formset.save()
            else:
                valid = False

            if rule_formset.is_valid():
                rule_formset.save()
            else:
                valid = False

            if valid:
                if main_form.cleaned_data['list_now'] or house.is_public():
                    try:
                        house.verify_data_for_publishing()
                    except ValidationError as e:
                        for error in e:
                            if error[0] in main_form.fields:
                                main_form.add_error(error[0], error[1])
                            elif error[0] != NON_FIELD_ERRORS:  # FIXME: Optimize
                                try:
                                    field_verbose = house._meta.get_field(error[0]).verbose_name.title()
                                except AttributeError:
                                    field_verbose = house._meta.get_field(error[0]).name.title()
                                main_form.add_error(None, "%s - %s" % (field_verbose, ', '.join(error[1])))
                            else:
                                main_form.add_error(None, error[1])

                        messages.add_message(
                            request, messages.WARNING,
                            'All your data is saved! But here are some details required before listing.',
                            extra_tags='no-auto-hide'
                        )
                        return render(request, 'property/create_edit/edit.html', context)
                    else:
                        if not house.home_owner.account_id:
                            messages.add_message(request, messages.SUCCESS,
                                                 "All your data is saved! This is the last step to listing.")
                            return redirect(reverse('house:payment', args=[house.uuid, ]))
                        else:
                            messages.add_message(request, messages.SUCCESS, "Your House information has been saved.")
                            return redirect(reverse('user:dashboard'))
                else:
                    if main_form.cleaned_data['exit']:
                        messages.add_message(request, messages.SUCCESS, "Your House information has been saved.")
                        return redirect(reverse('user:dashboard'))
                    else:
                        context = {
                            "house": house,
                            'main_form': HouseForm(None, instance=house, prefix='main-form'),
                            'availability_formset': AvailabilityFormSet(None, queryset=house.availability_set.all(),
                                                                        instance=house, prefix='availability-form'),
                            'image_formset': HousePhotoFormSet(None, instance=house, queryset=house.image_set.all(),
                                                               prefix='images-form'),
                            'rule_formset': HouseRuleFormSet(None, instance=house,
                                                             queryset=HouseRule.objects.filter(house=house)),
                            'user_form': ProfilePictureForm(
                                request.POST or None, request.FILES or None, instance=request.user.userprofile,
                                prefix='profile-pic-form'
                            )

                        }
                        return render(request, 'property/create_edit/edit.html', context)
            return render(request, 'property/create_edit/edit.html', context)
        else:
            return render(request, 'property/create_edit/edit.html', context)


@login_required()
def create(request):
    main_form = HouseForm(request.POST or None, prefix='main-form')
    if request.method == 'POST':
        if main_form.is_valid():
            house = main_form.save(commit=False)
            house.home_owner = request.user.home_owner
            house.save()
            return redirect(reverse('house:create_edit', args=[house.uuid, ]) + "#form-2")
        else:
            return render(request, 'property/create_edit/create.html', {'main_form': main_form})
    else:

        return render(request, 'property/create_edit/create.html', {'main_form': main_form})


class NearbyFacilitiesView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer = NearbyFacilitySerializer

    def get(self, request, house_uuid, *args, **kwargs):
        try:
            house = House.objects.objects_from_owner(user=request.user).get(uuid=house_uuid)
        except House.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            qs = list(NeighbourhoodDescriptor.objects.filter(
                Q(system_default=True) | Q(house=house)
            ).distinct().values('verbose', 'id').annotate(
                checked=Exists(NeighbourhoodDescriptor.objects.filter(house=house, pk=OuterRef('pk')))))
            serializer = self.serializer(data=qs, many=True)
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, house_uuid, *args, **kwargs):
        try:
            house = House.objects.objects_from_owner(user=request.user).get(uuid=house_uuid)
        except House.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = self.serializer(data=request.data, many=True)
            if serializer.is_valid():
                objs_set = serializer.save()
                house.neighbourhood_facilities.add(*[obj[0] for obj in objs_set if obj[1] is True])
                house.neighbourhood_facilities.remove(*[obj[0] for obj in objs_set if obj[1] is False])
                return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# FIXME: check for house with user together : Needs to be implemented in all views
class WelcomeTagView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer = WelcomeTagSerializer

    def get(self, request, house_uuid, *args, **kwargs):
        try:
            house = House.objects.objects_from_owner(user=request.user).get(uuid=house_uuid)
        except House.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            qs = list(WelcomeTag.objects.filter(
                Q(system_default=True) | Q(house=house)
            ).distinct().values('verbose', 'id').annotate(
                checked=Exists(WelcomeTag.objects.filter(house=house, pk=OuterRef('pk')))))
            serializer = self.serializer(data=qs, many=True)
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, house_uuid, *args, **kwargs):
        try:
            house = House.objects.objects_from_owner(user=request.user).get(uuid=house_uuid)
        except House.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = self.serializer(data=request.data, many=True)
            if serializer.is_valid():
                objs_set = serializer.save()
                house.welcome_tags.add(*[obj[0] for obj in objs_set if obj[1] is True])
                house.welcome_tags.remove(*[obj[0] for obj in objs_set if obj[1] is False])
                return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# FIXME: Merge this method with home_owner.views.home_owner_account_details
# FIXME: Require form handling when stripe returns error
@login_required
@verified_email_required
def home_owner_account_details(request, house_uuid):
    home_owner = request.user.home_owner
    try:
        house = House.objects.get(home_owner=home_owner, uuid=house_uuid)
    except House.DoesNotExist:
        return HttpResponseBadRequest
    if request.POST:
        submit_options_form = SubmitOptionsForm(request.POST, prefix='submit-options')
        home_owner_info_form = HomeOwnerInfoForm(request.POST)
        user_home_owner_form = UserHomeOwnerForm(request.POST, instance=request.user)
        user_profile_home_owner_form = UserProfileHomeOwnerForm(request.POST, instance=request.user.userprofile)
        if home_owner_info_form.is_valid() and user_profile_home_owner_form.is_valid() and user_profile_home_owner_form.is_valid() and submit_options_form.is_valid():
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
            if submit_options_form.cleaned_data['list_now']:
                try:
                    house.set_status('P')
                except ValidationError as e:
                    error_list = []
                    for error in e:
                        try:
                            field_verbose = house._meta.get_field(error[0]).verbose_name.title()
                        except AttributeError:
                            field_verbose = house._meta.get_field(error[0]).name.title()
                        field_errors = ', '.join(error[1])
                        error_list.append("%s - %s" % (field_verbose, field_errors))

                    messages.add_message(
                        request, messages.WARNING,
                        'All your data is saved! But here are some details required before listing. <br>' +
                        '<br>'.join(error_list),
                        extra_tags='no-auto-hide'
                    )
                    context = {
                        'house': house,
                        'submit_options': submit_options_form,
                        'home_owner_info_form': home_owner_info_form,
                        'user_home_owner_form': user_home_owner_form,
                        'user_profile_home_owner_form': user_profile_home_owner_form,
                        'bank_warning_message': ""
                    }
                    return render(request, 'property/create_edit/payment.html', context)
                else:
                    house.save()
                    messages.add_message(request, messages.SUCCESS,
                                         "Your house has been successfully added to public listing")

                    return redirect(reverse('user:dashboard'))
            else:
                messages.add_message(request, messages.SUCCESS, "Your Bank information has been saved.")
                if submit_options_form.cleaned_data['exit']:
                    return redirect(reverse('user:dashboard'))
                else:
                    return redirect(reverse('house:payment', args=[house.uuid, ]))
        else:
            context = {
                'house': house,
                'submit_options': submit_options_form,
                'home_owner_info_form': home_owner_info_form,
                'user_home_owner_form': user_home_owner_form,
                'user_profile_home_owner_form': user_profile_home_owner_form,
                'bank_warning_message': ""
            }
            return render(request, 'property/create_edit/payment.html', context)

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
    submit_options_form = SubmitOptionsForm(prefix='submit-options')
    user_home_owner_form = UserHomeOwnerForm(instance=request.user)
    user_profile_home_owner_form = UserProfileHomeOwnerForm(instance=request.user.userprofile)
    context = {
        'house': house,
        'submit_options': submit_options_form,
        'home_owner_info_form': home_owner_info_form,
        'user_home_owner_form': user_home_owner_form,
        'user_profile_home_owner_form': user_profile_home_owner_form,
        'bank_warning_message': bank_warning_message
    }
    return render(request, 'property/create_edit/payment.html', context)
