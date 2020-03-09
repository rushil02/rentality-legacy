from .base import PaymentGatewayBase
from rentality.settings.common import get_env_var
import stripe

class StripePaymentGateway(object):
    STRIPE_PUBLISHABLE_KEY = get_env_var('STRIPE_PUBLISHABLE_KEY')
    STRIPE_SECRET_KEY = get_env_var('STRIPE_SECRET_KEY')

    def get_intent(self):
        payment_intent = stripe.PaymentIntent.create(
            payment_method_types=['card'],
            amount=1000,
            currency='usd',
            transfer_data={
                'amount': 877,
                'destination': 'acct_1E5Q54IHloNnozpO',
            },
            api_key=self.STRIPE_SECRET_KEY
        )
        print(payment_intent)
        return payment_intent

