from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):

    '''
    FIXME: Fix account_inactive.html
    FIXME: Fix password_change.html
    '''

    def send_mail(self, template_prefix, email, context):
        # FIXME
        super().send_mail(template_prefix, email, context)