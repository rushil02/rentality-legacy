from django import forms

from house.models import House, Image


class HouseDetailsForm1(forms.ModelForm):
    class Meta:
        model = House
        exclude = ['landlord', 'rent', 'tags', 'availability', 'description']


class HouseDetailsForm2(forms.ModelForm):
    class Meta:
        model = House
        fields = ['rent', 'tags', 'availability', 'min_stay']


class HousePhotosForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['image', 'description']


class HouseDetailsForm3(forms.ModelForm):
    class Meta:
        model = House
        fields = ['description', 'tags']


class LandlordInfoForm(forms.Form):
    phone_num = forms.NumberInput()
    profile_pic = forms.ImageField()
