from django import forms

from tenant.models import HousePreference


class HousePreferenceForm(forms.ModelForm):
    class Meta:
        model = HousePreference
        exclude = ['tenant', ]

    # FIXME: clean and validations

