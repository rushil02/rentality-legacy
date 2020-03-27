"""
Home Owner -
    Accounts are different from Bank Accounts
    Bank Accounts can be in any country with relevant transaction currency.
    Any number of bank accounts / Debit Cards can be associated with Home Owner Account (Custom Account).

Tenant -
"""

from ..base import PaymentGatewayBase, PGTransaction
from rentality.settings.common import get_env_var
import stripe


class StripePaymentGateway(PaymentGatewayBase):
    STRIPE_PUBLISHABLE_KEY = get_env_var('STRIPE_PUBLISHABLE_KEY')
    STRIPE_SECRET_KEY = get_env_var('STRIPE_SECRET_KEY')
    STRIPE_VERSION = "2020-03-02"

    EVENT_ACTION_MAP = {
        'intend': lambda obj: obj.create_payment_intent,
        'execute': lambda obj: obj.execute_payment_intent
    }

    def _execute_request(self, request, *args, **kwargs):
        return request(
            api_key=self.STRIPE_SECRET_KEY,
            stripe_version=self.STRIPE_VERSION,
            idempotency_key=self.application_db.UUID,
            *args, **kwargs
        )

    def create_payment_intent(self):
        account_details = self.application.tenant_account
        kwargs = {
            'amount': 2000,
            'currency': "aud",
            'payment_method_types': ["card"]
        }
        response = self._execute_request(stripe.PaymentIntent.create, **kwargs)
        return PGTransaction(response=response, db=response)

    def create_payout_account(self):
        return