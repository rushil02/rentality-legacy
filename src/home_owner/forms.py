from django import forms
from cities.models import Country


class HomeOwnerInfoForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['country'].widget.attrs['class'] = 'form-control'
        if kwargs.get('initial'):
            self.fields['country'].widget.attrs['disabled'] = 'true'

    country = forms.ModelChoiceField(queryset=Country.objects.all(), required=False)