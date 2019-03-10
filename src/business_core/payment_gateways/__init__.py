
from . import stripe

# Register all models here
PAYMENT_GATEWAYS = {
    'stripe': {'verbose': 'Stripe', 'behaviour_file': stripe}
}


def get_behaviours():
    behaviours = []
    for key in PAYMENT_GATEWAYS:
        behaviours.append((key, PAYMENT_GATEWAYS[key]['verbose']))
    return tuple(behaviours)


def get_behaviour_description(key):
    return PAYMENT_GATEWAYS[key]['behaviour_file'].__doc__
