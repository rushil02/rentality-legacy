import inspect
from .models.stripe_v2 import StripePaymentGateway

# Register all adaptors here
PAYMENT_GATEWAYS = {
    'stripe_v2': {'verbose': 'Stripe V2', 'adaptor_class': StripePaymentGateway}
}


def get_adapters():
    adaptors = []
    for key in PAYMENT_GATEWAYS:
        adaptors.append((key, PAYMENT_GATEWAYS[key]['verbose']))
    return tuple(adaptors)


def get_adapter_description(key):
    return inspect.getfile(PAYMENT_GATEWAYS[key]['adaptor_class']).__doc__


def get_adaptor_class(code):
    return PAYMENT_GATEWAYS[code]['adaptor_class']



