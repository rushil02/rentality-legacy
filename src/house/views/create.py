from django.contrib.auth.decorators import login_required
from django.core.files.storage import FileSystemStorage
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

from house.forms import HouseDetailsForm1, HouseDetailsForm2, HouseDetailsForm3, SearchForm, \
    HousePhotoFormSet, HouseDeleteForm, HouseRemoveTypeForm, HouseMarkLeasedForm, HouseRemoveForm, HouseForm, \
    AvailabilityFormSet, HouseRuleFormSet
from house.models import House, Image, Facility, HouseRule
from house.serializer import ImageSerializer, FacilitySerializer


def list_house(house):
    house = House()
    for field in house.REQUIRED_FIELDS:
        if getattr(house, field) in (None, '', 0):
            raise KeyError
        else:
            continue


def save_and_exit():
    pass


@login_required()
def edit(request, house_uuid):
    try:
        house = House.objects.get(uuid=house_uuid)
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

        context = {
            "house": house,
            'main_form': main_form,
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
                if main_form.cleaned_data['list_now']:
                    house.set_status('P')
                    house.save()
                    messages.add_message(request, messages.SUCCESS, "Your house has been added to Public Listing")
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
                                                             queryset=HouseRule.objects.filter(house=house))

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


class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAuthenticated,)

    def post(self, request, house_uuid, *args, **kwargs):
        try:
            house = House.objects.get(uuid=house_uuid)
        except House.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            file_serializer = ImageSerializer(data=request.data)
            if file_serializer.is_valid():
                file_serializer.save(house=house)
                return Response(file_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FacilityView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer = FacilitySerializer

    def get(self, request, house_uuid, *args, **kwargs):
        try:
            house = House.objects.get(uuid=house_uuid)
        except House.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            qs = list(Facility.objects.filter(
                Q(system_default=True) | Q(house=house)
            ).values('verbose', 'id').annotate(checked=Exists(Facility.objects.filter(house=house, pk=OuterRef('pk')))))

            serializer = self.serializer(data=qs, many=True)
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, house_uuid, *args, **kwargs):
        try:
            house = House.objects.get(uuid=house_uuid)
        except House.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = self.serializer(data=request.data, many=True)
            if serializer.is_valid():
                objs = serializer.save()
                house.facilities.add(*objs)
                return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
