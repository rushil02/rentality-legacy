from django import forms

from promotions.helpers import get_all_validation_attributes, get_validations_meta
from promotions.models import PromotionalCode


class PromotionalCodeForm(forms.ModelForm):

    class Meta:
        model = PromotionalCode
        fields = (
            'code', 'verbose', 'description', 'tnc', 'active',
            'applied_by', 'applicable_on', 'allowed_users'
        )

    def __init__(self, *args, **kwargs):
        super(PromotionalCodeForm, self).__init__(*args, **kwargs)
        self.fields['verbose'].widget = forms.TextInput()
        for field in self.fields:
            if isinstance(self.fields[field].widget, forms.CheckboxInput):
                self.fields[field].widget.attrs.update({
                    'class': 'js-switch',
                    'data-switchery': 'true',
                    'style': 'display: none;'
                })
            else:
                self.fields[field].widget.attrs.update({'class': 'form-control'})


class PromotionalCodeRestrictionsForm(forms.Form):
    override_default_validations = forms.BooleanField(
        label='Override System Default Validation', required=False,
        help_text='Warning: This will suppress all default system checks and restrictions.'
    )

    def __init__(self, *args, **kwargs):
        super(PromotionalCodeRestrictionsForm, self).__init__(*args, **kwargs)
        new_dynamic_fields = get_all_validation_attributes()

        self.DYNAMIC_META_FIELDS = new_dynamic_fields.keys()

        for new_field in new_dynamic_fields:
            self.fields[new_field] = new_dynamic_fields[new_field]["form_field"](
                label=new_dynamic_fields[new_field]["verbose"],
                help_text=new_dynamic_fields[new_field]["help_text"],
                required=False
            )
            self.fields[new_field].group_num = new_dynamic_fields[new_field]["group_num"]
            self.fields[new_field].master_option = new_dynamic_fields[new_field].get("master_option", False)

        for field in self.fields:
            if isinstance(self.fields[field].widget, forms.CheckboxInput):
                self.fields[field].widget.attrs.update({
                    'class': 'js-switch',
                    'data-switchery': 'true',
                    'style': 'display: none;'
                })
            else:
                self.fields[field].widget.attrs.update({'class': 'form-control'})

    def get_meta(self):
        validations_meta = get_validations_meta(self.cleaned_data)
        for field in set(self.cleaned_data) - set(self.DYNAMIC_META_FIELDS):
                validations_meta.update({field: self.cleaned_data[field]})
        return validations_meta
