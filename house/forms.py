from django import forms
from django.contrib.postgres.forms import DateRangeField, RangeWidget
from django.forms import inlineformset_factory, modelformset_factory
from dal import autocomplete

from house.models import House, Image, Tag


class HouseDetailsForm1(forms.ModelForm):
    class Meta:
        model = House
        fields = ['location', 'address', 'room_type', 'other_room_type', 'bedrooms', 'bathrooms', 'parking']
        widgets = {
            'location': autocomplete.ModelSelect2(url='house:postal_code_api',
                                                  attrs={'class': 'form-control', 'style': "visibility:hidden;",
                                                         'data-placeholder': 'Enter postcode'}),
            'address': forms.TextInput(attrs={'class': 'form-control',
                                              'placeholder': 'Unit no., House no., Street name, etc.',
                                              }),
            'room_type': forms.Select(attrs={'class': 'form-control', 'style': "visibility:hidden;", }),
            'other_room_type': forms.TextInput(attrs={'class': 'form-control',
                                                      'placeholder': 'Other Accommodation Description',
                                                      'type': "hidden"}),
            'bedrooms': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Number of bedrooms'}),
            'bathrooms': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Number of bathrooms'}),
            'parking': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Number of parking spaces'}),
        }


class HouseDetailsForm2(forms.ModelForm):
    facilities = forms.ModelMultipleChoiceField(required=False, queryset=Tag.objects.filter(tag_type='F'))
    rules = forms.ModelMultipleChoiceField(required=False, queryset=Tag.objects.filter(tag_type='R'))
    tenant_pref = forms.ModelMultipleChoiceField(required=False, label='Tenant Preferences',
                                                 queryset=Tag.objects.filter(tag_type='T'))

    class Meta:
        model = House
        fields = ['rent', 'availability', 'min_stay', 'description']
        widgets = {
            'rent': forms.NumberInput(attrs={'class': 'form-control', }),
            'rules': forms.SelectMultiple(attrs={'class': 'form-control', }),
            'facilities': forms.SelectMultiple(attrs={'class': 'form-control', }),
            'tenant_prof': forms.SelectMultiple(attrs={'class': 'form-control', }),
            'availability': RangeWidget(base_widget=forms.DateInput,
                                        attrs={'class': 'form-control', }),
            'min_stay': forms.NumberInput(attrs={'class': 'form-control', }),
            'description': forms.Textarea(attrs={'class': 'form-control', })
        }


class HousePhotoForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['image', ]
        widgets = {
            'image': forms.ClearableFileInput(attrs={'class': 'form-control image-formset-image'}),
        }


HousePhotoFormSet = modelformset_factory(Image, form=HousePhotoForm, extra=3)


class HouseDetailsForm3(forms.ModelForm):
    class Meta:
        model = House
        fields = ['tags']
        labels = {
            "tags": "Rules"
        }
        widgets = {
            'tags': forms.SelectMultiple(attrs={'class': 'form-control', }),
        }


class LandlordInfoForm(forms.Form):
    phone_num = forms.NumberInput()
    profile_pic = forms.ImageField()


class SearchForm(forms.Form):
    location = forms.CharField(
        label='Location',
        widget=forms.TextInput(attrs={
            'class': 'form-control', 'placeholder': 'City, State, Postcode, etc.'
        }, )
    )
    bedrooms = forms.IntegerField(
        widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'No. of bedrooms', }), required=False
    )
    bathrooms = forms.IntegerField(
        widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'No. of bathrooms'}), required=False
    )
    max_price = forms.IntegerField(
        widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Max Rent'}), required=False
    )
