from django import template
from django.forms import CheckboxInput
from django.utils.safestring import mark_safe

import json

register = template.Library()


@register.filter(name='is_checkbox')
def is_checkbox(field):
    return isinstance(field.field.widget, CheckboxInput)


@register.simple_tag(name='regroup_fields')
def regroup_form_fields(form):
    groups = {}
    for field in form:
        try:
            group_num = field.field.group_num
        except AttributeError:
            group_num = 0
        finally:
            try:
                groups[group_num]
            except KeyError:
                groups[group_num] = [field, ]
            else:
                try:
                    master_option = field.field.master_option
                except AttributeError:
                    master_option = False
                finally:
                    if master_option:
                        groups[group_num].insert(0, field)
                    else:
                        groups[group_num].append(field)
    return groups.values()


@register.filter(is_safe=True)
def js(obj):
    return mark_safe(json.dumps(obj))
