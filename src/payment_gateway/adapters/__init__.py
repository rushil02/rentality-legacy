import inspect
from .stripe import StripePaymentGateway

# Register all models here
PAYMENT_GATEWAYS = {
    'stripe': {'verbose': 'Stripe', 'behaviour_class': StripePaymentGateway}
}


def get_behaviours():
    behaviours = []
    for key in PAYMENT_GATEWAYS:
        behaviours.append((key, PAYMENT_GATEWAYS[key]['verbose']))
    return tuple(behaviours)


def get_behaviour_description(key):
    return inspect.getfile(PAYMENT_GATEWAYS[key]['behaviour_class']).__doc__


def get_behaviour_class(code):
    return PAYMENT_GATEWAYS[code]['behaviour_class']



