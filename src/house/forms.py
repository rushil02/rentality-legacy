from django import forms
from django.contrib.postgres.forms import DateRangeField, RangeWidget
from django.core.exceptions import ValidationError
from django.forms import inlineformset_factory, modelformset_factory
from dal import autocomplete
from psycopg2.extras import DateRange
from easy_thumbnails.widgets import ImageClearableFileInput

from house.models import House, Image, Availability, HouseRule
from rentality import settings
from utils.form_thumbnailer import ImageFileInput


class HouseDetailsForm1():
    pass


class HouseDetailsForm2(object):
    pass


class HouseDetailsForm3(object):
    pass


class SubmitOptionsForm(forms.Form):
    submit = forms.BooleanField(widget=forms.CheckboxInput(attrs={'style': 'visibility: hidden'}), required=False)
    exit = forms.BooleanField(widget=forms.CheckboxInput(attrs={'style': 'visibility: hidden'}), required=False)
    list_now = forms.BooleanField(widget=forms.CheckboxInput(attrs={'style': 'visibility: hidden'}), required=False)


class HouseForm(forms.ModelForm):
    promo_codes = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Code'}),
                                  required=False)
    submit = forms.BooleanField(widget=forms.CheckboxInput(attrs={'style': 'visibility: hidden'}), required=False)
    exit = forms.BooleanField(widget=forms.CheckboxInput(attrs={'style': 'visibility: hidden'}), required=False)
    list_now = forms.BooleanField(widget=forms.CheckboxInput(attrs={'style': 'visibility: hidden'}), required=False)

    class Meta:
        model = House
        fields = [
            'title', 'furnished', 'address_hidden', 'address', 'location', 'home_type', 'bedrooms', 'bathrooms',
            'parking', 'rent', 'min_stay', 'max_stay', 'other_rules', 'cancellation_policy', 'other_people_description',
            'access_restrictions', 'neighbourhood_description', 'max_people_allowed', 'description'
        ]
        widgets = {
            'title': forms.TextInput(
                attrs={'class': 'form-control title'}
            ),
            'address_hidden': forms.TextInput(
                attrs={'class': 'form-control address-hidden'}
            ),
            'address': forms.TextInput(
                attrs={'class': 'form-control no-background'}
            ),
            'location': autocomplete.ModelSelect2(
                url='house:postal_code_api',
                attrs={'class': 'form-control address', 'data-placeholder': 'Enter Postcode to select Suburb and City'}
            ),
            'home_type': forms.Select(
                attrs={'class': 'form-control'}
            ),
            'furnished': forms.Select(
                choices=model.FURNISHED_OPTIONS,
                attrs={'class': 'form-control'}
            ),
            'bedrooms': forms.NumberInput(
                attrs={'class': 'form-control', 'placeholder': 0}
            ),
            'bathrooms': forms.NumberInput(
                attrs={'class': 'form-control', 'placeholder': 0}
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
            'max_people_allowed': forms.NumberInput(
                attrs={'class': 'form-control', 'placeholder': 0}
            ),
            'max_stay': forms.NumberInput(
                attrs={'class': 'form-control', 'placeholder': 0}
            ),
            'description': forms.Textarea(
                attrs={'class': 'form-control', 'rows': 10, 'placeholder': '.'}
            ),
            'other_rules': forms.Textarea(
                attrs={'class': 'form-control', 'rows': 10, 'placeholder': '.'}
            ),
            'cancellation_policy': forms.Select(
                attrs={'class': 'd-none'}
            ),
            'other_people_description': forms.Textarea(
                attrs={'class': 'form-control', 'rows': 6, 'placeholder': '.'}
            ),
            'access_restrictions': forms.Textarea(
                attrs={'class': 'form-control', 'rows': 9, 'placeholder': '.'}
            ),
            'neighbourhood_description': forms.Textarea(
                attrs={'class': 'form-control', 'rows': 8, 'placeholder': '.'}
            ),
        }

    def __init__(self, *args, **kwargs):
        super(HouseForm, self).__init__(*args, **kwargs)
        for name, field in self.fields.items():
            try:
                field.widget.attrs['placeholder']
            except KeyError:
                field.widget.attrs['placeholder'] = field.label

    def clean(self):
        super(HouseForm, self).clean()
        if self.cleaned_data['list_now'] or self.cleaned_data['submit']:
            return self.cleaned_data
        else:
            raise ValidationError("Invalid form submission request.")

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
            'dates': RangeWidget(base_widget=forms.DateInput(),
                                 attrs={'style': 'display: None;'}),
            'periodic': forms.CheckboxInput(attrs={'class': 'custom-control-input'})
        }

    def clean_dates(self):
        """
        Check if dates are 1month apart
        """

        data = self.cleaned_data['dates']
        return data


AvailabilityFormSet = inlineformset_factory(House, Availability, form=AvailabilityForm, extra=10)


class HousePhotoForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['image', 'is_thumbnail']
        widgets = {
            'image': ImageFileInput(thumbnail_options=settings.THUMBNAIL_ALIASES['']['house_home_page_small'],
                                    template="%(thumb)s", attrs={'required': False}),
        }


HousePhotoFormSet = inlineformset_factory(House, Image, form=HousePhotoForm, extra=0)


class HouseRuleForm(forms.ModelForm):
    class Meta:
        model = HouseRule
        fields = ['value', 'comment']
        widgets = {
            'comment': forms.TextInput(attrs={
                'class': 'form-control', 'placeholder': 'Comment or Special Instructions'
            }),
            'value': forms.TextInput(attrs={
                'class': 'd-none'
            })
        }


HouseRuleFormSet = inlineformset_factory(House, HouseRule, form=HouseRuleForm, extra=0)


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


class ApplyForm(forms.Form):
    guests = forms.ChoiceField(
        label='Guests',
        widget=forms.Select(attrs={
            'class': 'form-control', 'placeholder': 'Number of Guests',
        }, ), required=True
    )
    move_in_date = forms.DateField(
        label='Move in Date',
        widget=forms.DateInput(attrs={
            'class': 'form-control', 'placeholder': 'Move in Date',
            'readonly': True
        }, ), required=True
    )
    move_out_date = forms.DateField(
        label='Move out Date',
        widget=forms.DateInput(attrs={
            'class': 'form-control', 'placeholder': 'Move out Date',
            'readonly': True
        }, ), required=True
    )

    def __init__(self, *args, **kwargs):
        self._obj = kwargs.pop('obj')
        super(ApplyForm, self).__init__(*args, **kwargs)
        self.fields['guests'].choices = [(i + 1, i + 1) for i in range(self._obj.max_people_allowed or 1)]

    def clean(self):
        super(ApplyForm, self).clean()
        try:
            if self.cleaned_data['move_in_date'] >= self.cleaned_data["move_out_date"]:
                raise ValidationError("Invalid Dates")
            if (self.cleaned_data['move_out_date'] - self.cleaned_data["move_in_date"]).days/7 < 4:
                raise ValidationError("Booking should be at least of 4 weeks")
        except KeyError:
            raise ValidationError("Invalid Dates")

        if not self._obj.check_availability(lower=self.cleaned_data['move_in_date'], upper=self.cleaned_data['move_out_date']):
            raise ValidationError("Chosen Dates are not available for booking.")
