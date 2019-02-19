import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY


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
