from django import forms

from promotions.models import PromotionalCode


def encode_for_meta(*args):
    """
    Converts self.meta attributes with a nested naming scheme.
    :param args: arguments in order of hierarchy (parent to child)
    :return: string
    """
    if args:
        attr_string = 'meta'
        for attribute in args:
            attr_string = '%s__%s' % (attr_string, attribute)
        return attr_string
    else:
        raise ValueError("arguments cannot be empty")


def decode_for_meta(string):
    """
    Converts naming scheme of attribute to original name.
    :param string: encoded attribute string
    :return: list in order of hierarchy
    """
    if string.startswith('meta__'):
        return string.split('__')[1:]
    else:
        raise AssertionError("Not an encoded string")


def get_all_validation_attributes():
    """
    Adds prefix to each attribute and key to avoid name collisions and recognize attribute hierarchy/relationships
    :return: dict
    """
    validations = PromotionalCode.VALIDATORS
    updated_validations = dict()
    group_num = 0

    for validation in validations:
        group_num += 1
        updated_validations.update({
            encode_for_meta(validation): {
                "verbose": validations[validation].get("verbose", validation.replace("_", " ").title()),
                "help_text": validations[validation].get("help_txt", None),
                "form_field": validations[validation].get("form_field", forms.BooleanField),
                "group_num": group_num,
                "master_option": True
            }
        })

        try:
            attributes = PromotionalCode.VALIDATORS[validation]["attributes"]
        except KeyError:
            continue
        else:
            for attribute in attributes:
                updated_validations.update({
                    encode_for_meta(validation, attribute): {
                        "verbose": attributes[attribute].get("verbose", attribute.replace("_", " ").title()),
                        "help_text": attributes[attribute].get("help_txt", None),
                        "form_field": attributes[attribute].get("form_field"),
                        "group_num": group_num,
                        "master_option": False
                    }
                })

    return updated_validations


def get_validations_meta(fields):
    """
    :param fields: dict of fields and values
    :return: created meta
    """
    used_validators = []
    validators = PromotionalCode.VALIDATORS
    attributes = dict()
    for validator in validators:
        try:
            is_validator = fields[encode_for_meta(validator)]
        except KeyError:
            continue
        else:
            if is_validator:
                used_validators.append(validator)
                for attribute in validators[validator].get("attributes", {}):
                    try:
                        value = fields[encode_for_meta(validator, attribute)]
                    except KeyError:
                        raise AssertionError("This value is required if '%s' validator is selected" % validator)
                    else:
                        try:
                            attributes[validator]
                        except KeyError:
                            attributes[validator] = {attribute: value}
                        else:
                            attributes[validator].update({attribute: value})

    return {"validators": used_validators, "attributes": attributes}
