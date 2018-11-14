from django import forms
from django.contrib.postgres.forms import DateRangeField, RangeWidget
from django.forms import inlineformset_factory, modelformset_factory
from dal import autocomplete
from cities.models import Country
from house.models import House, Image, Availability
from home_owner.models import HomeOwnerProfile


class HouseDetailsForm1():
    pass


class HouseDetailsForm2(object):
    pass


class HouseDetailsForm3(object):
    pass


class HouseForm(forms.ModelForm):
    class Meta:
        model = House
        exclude = ['home_owner', 'status', 'rules']
        widgets = {
            'title': forms.TextInput(
                attrs={'class': 'form-control'}
            ),
            'address_hidden': forms.TextInput(
                attrs={'class': 'form-control address'}
            ),
            'address': forms.TextInput(
                attrs={'class': 'form-control no-background'}
            ),
            'location': autocomplete.ModelSelect2(
                url='house:postal_code_api',
                attrs={'class': 'form-control address', 'data-placeholder': 'Enter postcode'}
            ),
            'home_type': forms.Select(
                attrs={'class': 'form-control', }
            ),
            'bedrooms': forms.NumberInput(
                attrs={'class': 'form-control'}
            ),
            'bathrooms': forms.NumberInput(
                attrs={'class': 'form-control'}
            ),
            'parking': forms.NumberInput(
                attrs={'class': 'form-control'}
            ),
            'rent': forms.NumberInput(
                attrs={'class': 'form-control'}
            ),
            'min_stay': forms.NumberInput(
                attrs={'class': 'form-control'}
            ),
            'max_stay': forms.NumberInput(
                attrs={'class': 'form-control'}
            ),
            'other_rules': forms.Textarea(
                attrs={'class': 'form-control', 'rows': 10}
            ),
            'cancellation_policy': forms.RadioSelect(
                attrs={'class': 'form-control'}
            )
        }

    def __init__(self, *args, **kwargs):
        super(HouseForm, self).__init__(*args, **kwargs)
        for name, field in self.fields.items():
            field.widget.attrs['placeholder'] = field.label


# class HouseDetailsForm1(forms.ModelForm):
#     class Meta:
#         model = House
#         fields = ['location', 'address', 'home_type', 'bedrooms', 'bathrooms', 'parking']
#         widgets = {
#             'location': autocomplete.ModelSelect2(url='house:postal_code_api',
#                                                   attrs={'class': 'form-control', 'style': "visibility:hidden;",
#                                                          'data-placeholder': 'Enter postcode'}),
#             'address': forms.TextInput(attrs={'class': 'form-control',
#                                               'placeholder': 'Unit no., House no., Street name, etc.',
#                                               }),
#             'home_type': forms.Select(attrs={'class': 'form-control', 'style': "visibility:hidden;", }),
#             'bedrooms': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Number of bedrooms'}),
#             'bathrooms': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Number of bathrooms'}),
#             'parking': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Number of parking spaces'}),
#         }


# class HouseDetailsForm2(forms.ModelForm):
#     # facilities = forms.ModelMultipleChoiceField(required=False, queryset=Tag.objects.filter(tag_type='F'))
#     # rules = forms.ModelMultipleChoiceField(required=False, queryset=Tag.objects.filter(tag_type='R'))
#
#     class Meta:
#         model = House
#         fields = ['rent', 'availability', 'min_stay', 'description']
#         widgets = {
#             'rent': forms.NumberInput(attrs={'class': 'form-control', }),
#             # 'rules': forms.SelectMultiple(attrs={'class': 'form-control', }),
#             # 'facilities': forms.SelectMultiple(attrs={'class': 'form-control', }),
#             'tenant_prof': forms.SelectMultiple(attrs={'class': 'form-control', }),
#             'availability': RangeWidget(base_widget=forms.DateInput,
#                                         attrs={'class': 'form-control', }),
#             'min_stay': forms.NumberInput(attrs={'class': 'form-control', }),
#             'description': forms.Textarea(attrs={'class': 'form-control', })
#         }

class AvailabilityForm(forms.ModelForm):
    class Meta:
        model = Availability
        fields = ['dates', 'periodic']
        widgets = {
            'dates': RangeWidget(base_widget=forms.DateInput(format='%d %B, %Y'),
                                 attrs={'class': 'form-control col-md-6', 'style': 'display: None;'}),
            'periodic': forms.CheckboxInput(attrs={'class': 'custom-control-input'})
        }

    def clean_dates(self):
        pass


AvailabilityFormSet = modelformset_factory(Availability, form=AvailabilityForm, extra=3, can_delete=True)


class HousePhotoForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['image', ]
        widgets = {
            'image': forms.ClearableFileInput(attrs={'class': 'form-control image-formset-image'}),
        }


HousePhotoFormSet = modelformset_factory(Image, form=HousePhotoForm, extra=3)


# class HouseDetailsForm3(forms.ModelForm):
#     class Meta:
#         model = House
#         fields = ['tags']
#         labels = {
#             "tags": "Rules"
#         }
#         widgets = {
#             'tags': forms.SelectMultiple(attrs={'class': 'form-control', }),
#         }


class HomeOwnerInfoForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['country'].widget.attrs['class'] = 'form-control'
        if kwargs.get('initial'):
            self.fields['country'].widget.attrs['disabled'] = 'true'

    country = forms.ModelChoiceField(queryset=Country.objects.all(), required=False)


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


class HouseDeleteForm(forms.Form):
    confirm = forms.TypedChoiceField(coerce=lambda x: x == 'True',
                                     choices=((False, 'No'), (True, 'Yes')))


class HouseRemoveForm(forms.Form):
    confirm = forms.TypedChoiceField(coerce=lambda x: x == 'True',
                                     choices=((False, 'No'), (True, 'Yes')))


class HouseRemoveTypeForm(forms.Form):
    remove_type = forms.ChoiceField(
        choices=(
            ('R', 'Remove it from public listing'),
            ('D', 'Permanently delete the listing')
        )
    )


class HouseMarkLeasedForm(forms.Form):
    confirm = forms.TypedChoiceField(coerce=lambda x: x == 'True',
                                     choices=((False, 'No'), (True, 'Yes')))
