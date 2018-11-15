from django import forms
from django.contrib.postgres.forms import DateRangeField, RangeWidget
from django.core.exceptions import ValidationError
from django.forms import inlineformset_factory, modelformset_factory
from dal import autocomplete

from house.models import House, Image, Availability, Facility


class HouseDetailsForm1():
    pass


class HouseDetailsForm2(object):
    pass


class HouseDetailsForm3(object):
    pass


class HouseForm(forms.ModelForm):
    submit = forms.BooleanField(widget=forms.CheckboxInput(attrs={'style': 'visibility: hidden'}), required=False)
    exit = forms.BooleanField(widget=forms.CheckboxInput(attrs={'style': 'visibility: hidden'}), required=False)
    list_now = forms.BooleanField(widget=forms.CheckboxInput(attrs={'style': 'visibility: hidden'}), required=False)
    facilities = forms.ModelMultipleChoiceField(queryset=Facility.objects.filter(system_default=True), required=False)

    class Meta:
        model = House
        exclude = ['home_owner', 'status', 'rules']
        widgets = {
            'title': forms.TextInput(
                attrs={'class': 'form-control title'}
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
                attrs={'class': 'form-control'}
            ),
            'bedrooms': forms.NumberInput(
                attrs={'class': 'form-control', 'placeholder': 1}
            ),
            'bathrooms': forms.NumberInput(
                attrs={'class': 'form-control', 'placeholder': 1}
            ),
            'parking': forms.NumberInput(
                attrs={'class': 'form-control', 'placeholder': 0}
            ),
            'rent': forms.NumberInput(
                attrs={'class': 'form-control', 'placeholder': '$AUD'}
            ),
            'min_stay': forms.NumberInput(
                attrs={'class': 'form-control', 'placeholder': 28}
            ),
            'max_stay': forms.NumberInput(
                attrs={'class': 'form-control', 'placeholder': 0}
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
            try:
                field.widget.attrs['placeholder']
            except KeyError:
                field.widget.attrs['placeholder'] = field.label

    def get_facility_choices(self):
        return [choice.verbose for choice in self.fields['facilities'].queryset]

    def clean(self):
        if self.cleaned_data['list_now']:
            super(HouseForm, self).clean()
            self.clean_for_listing()
            return self.cleaned_data
        elif self.cleaned_data['submit']:
            return super(HouseForm, self).clean()
        else:
            raise ValidationError("Invalid form submission request.")

    def clean_for_listing(self):
        cleaned_data = super().clean()
        for field in self.Meta.model.REQUIRED_FIELDS:
            if cleaned_data[field]:
                print("here")
                # FIXME

    def clean_bedrooms(self):
        data = self.cleaned_data['bedrooms']
        if data:
            if data < 1:
                raise ValidationError("There should be at least 1 bedroom.")
        return data

    def clean_bathrooms(self):
        data = self.cleaned_data['bathrooms']
        if data:
            if data < 1:
                raise ValidationError("There should be at least 1 bathroom.")
        return data


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


AvailabilityFormSet = inlineformset_factory(House, Availability, form=AvailabilityForm, extra=3)


class HousePhotoForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['image', 'is_thumbnail']
        widgets = {
            'image': forms.ClearableFileInput(attrs={'class': 'custom-file-input'}),
        }


HousePhotoFormSet = inlineformset_factory(House, Image, form=HousePhotoForm, extra=3)


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
