import stripe
from django.conf import settings

from .base import PaymentGatewayBase
from rentality.settings.common import get_env_var

STRIPE_PUBLISHABLE_KEY = get_env_var('STRIPE_PUBLISHABLE_KEY')
STRIPE_SECRET_KEY = get_env_var('STRIPE_SECRET_KEY')

stripe.api_key = STRIPE_SECRET_KEY


def execute_request(request, *args, **kwargs):
    return request(*args, **kwargs)


# FIXME: Returns none instead of raising Error - not able to track it
def create_account(country, account_type='custom', *args, **kwargs):
    return stripe.Account.create(country=country, type=account_type, *args, **kwargs)


def get_account(id):
    return execute_request(stripe.Account.retrieve, id)


def create_charge(customer, target_account_id, amount, destination_amount, *args, **kwargs):
    """
    Create a Stripe Charge

    ``customer``: The token recieved by stripe elements
    ``target_account_id``: Account ID of recipient
    ``amount``: Amount to be charged to Customer
    ``destination_amount``: Ammount to be recieved by recipient. Rest is your profit
    """
    return execute_request(
        stripe.Charge.create,
        currency='aud', amount=amount,
        customer=customer,
        destination={
            'amount': destination_amount,
            'account': target_account_id
        },
        *args, **kwargs
    )


def create_customer(*args, **kwargs):
    return execute_request(stripe.Customer.create, *args, **kwargs)


def retrieve_customer(id):
    return execute_request(stripe.Customer.retrieve, id)


class StripePaymentGateway(PaymentGatewayBase):
    TRANSACTION_TYPES = (
        ('C', 'Charge'),
        ('P', 'Transfer')
    )

    def get_or_create_home_owner_account(self, *args, **kwargs):
        pass

    def get_or_create_tenant_account(self, *args, **kwargs):
        pass

    def process_pay_in(self):
        pass

    def process_pay_out(self):
        pass

    def process_refund(self):
        pass
