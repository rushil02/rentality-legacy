from django import forms
from django.contrib.postgres.forms import DateRangeField, RangeWidget

from house.models import House, Image


class HouseDetailsForm1(forms.ModelForm):
    class Meta:
        model = House
        exclude = ['landlord', 'rent', 'tags', 'availability', 'description']
        widgets = {
            'location': forms.TextInput(attrs={'class': 'form-control', 'id': 'location', 'list': 'json-datalist',
                                               'placeholder': 'Suburb, City', 'required': 'required'}),
            'address': forms.TextInput(attrs={'class': 'form-control', 'id': 'address',
                                              'placeholder': 'Unit no., House no., Street name, etc.',
                                              }),
            # FIXME: Styling
            # 'room_type': forms.Select(attrs={'class': 'form-control', }),
            'other_room_type': forms.TextInput(attrs={'class': 'form-control',
                                                      'placeholder': 'Other Accommodation Description',
                                                      'type': "hidden"}),
            'bedrooms': forms.NumberInput(attrs={'class': 'form-control', }),
            'bathrooms': forms.NumberInput(attrs={'class': 'form-control', }),
            'parking': forms.NumberInput(attrs={'class': 'form-control', }),
        }


class HouseDetailsForm2(forms.ModelForm):
    class Meta:
        model = House
        fields = ['rent', 'tags', 'availability', 'min_stay']
        labels = {
            "tags": "Facilities"
        }
        widgets = {
            'rent': forms.NumberInput(attrs={'class': 'form-control', }),
            'tags': forms.SelectMultiple(attrs={'class': 'form-control', }),
            'availability': RangeWidget(base_widget=forms.SelectDateWidget,
                                        attrs={'class': 'form-control', }),
            'min_stay': forms.NumberInput(attrs={'class': 'form-control', })
        }


class HousePhotosForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['image', 'description']
        widgets = {
            'image': forms.FileInput(attrs={'class': 'form-control', }),
            'description': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Description'}),
        }


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
        })
    )
    bedrooms = forms.IntegerField(
        widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'No. of bedrooms', })
    )
    bathrooms = forms.IntegerField(
        widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'No. of bathrooms'})
    )
    max_price = forms.IntegerField(
        widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Max Rent'})
    )
