import re

from django.core.exceptions import ValidationError


def clean_gmail(email):
    regex_str = r'^([^@]+)@[^@]+$'
    domain = re.search("@[\w]+", email).group()
    complete_domain = re.search("@[\w.]+", email).group()
    match_obj = re.search(regex_str, email)
    if match_obj is not None:
        if domain == '@gmail':
            username = match_obj.group(1).replace(".", "")
            new_email = username + complete_domain
            return new_email
        else:
            return email
    else:
        raise ValidationError
