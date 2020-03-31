"""
Home Owner -
    Accounts are different from Bank Accounts
    Bank Accounts can be in any country with relevant transaction currency.
    Any number of bank accounts / Debit Cards can be associated with Home Owner Account (Custom Account).

Tenant -
"""

from ..base import PaymentGatewayBase, PGTransaction, PGTransactionError
from rentality.settings.common import get_env_var
import stripe
from stripe import error
import uuid

stripe.max_network_retries = 2


class StripePaymentGateway(PaymentGatewayBase):
    STRIPE_PUBLISHABLE_KEY = get_env_var('STRIPE_PUBLISHABLE_KEY')
    STRIPE_SECRET_KEY = get_env_var('STRIPE_SECRET_KEY')
    STRIPE_VERSION = "2020-03-02"

    EVENT_ACTION_MAP = {
        'intend': lambda obj: obj.create_payment_intent,
        'execute': lambda obj: obj.execute_payment_intent
    }

    def _execute_request(self, request, *args, **kwargs):
        try:
            return request(
                api_key=self.STRIPE_SECRET_KEY,
                stripe_version=self.STRIPE_VERSION,
                *args, **kwargs
            )
        except error.IdempotencyError:
            raise PGTransactionError("Invalid Request", {})
        except error.InvalidRequestError as e:
            raise PGTransactionError(e.user_message, {})
        except (error.APIConnectionError, error.APIError, error.AuthenticationError):
            # FIXME: Log these requests in system
            raise PGTransactionError("System Error - Failed to connect", {})
        except error.RateLimitError:
            raise PGTransactionError("Network Error - Please try again later.", {})

    def _execute_idempotent_request(self, request, *args, **kwargs):
        idempotency_key = str(uuid.uuid4())
        return self._execute_request(request, idempotency_key=idempotency_key, **kwargs)

    def create_payment_intent(self):
        account_details = self.application.tenant_account
        kwargs = {
            'amount': 2000,
            'currency': "aud",
            'payment_method_types': ["card"]
        }
        response = self._execute_idempotent_request(stripe.PaymentIntent.create, **kwargs)
        return PGTransaction(response=response, meta=response)

    def _get_account_link(self, account_id):
        return self._execute_request(
            stripe.AccountLink.create,
            account=account_id,
            failure_url="https://rentality.com.au/rep/acc/failure",
            success_url="https://rentality.com.au/rep/acc/success",
            type="custom_account_verification",
            collect="currently_due"
        )

    def create_payout_account(self, homeowner):
        if homeowner.account_type == 'I':
            acc_type_info = {
                'business_type': 'individual',
                'individual': {
                    'address': {
                        'country': homeowner.country.code,
                        'postal_code': homeowner.billing_postcode.code
                    },
                    'dob': {
                        'day': homeowner.dob.day,
                        'month': homeowner.dob.month,
                        'year': homeowner.dob.year
                    },
                    'email': homeowner.email,
                    'first_name': homeowner.first_name,
                    'last_name': homeowner.last_name,
                    # 'phone': homeowner.contact_num
                }
            }
        elif homeowner.account_type == 'B':
            acc_type_info = {
                'business_type': 'company',
                'company': {
                    'name': homeowner.business_name,
                    'address': {
                        'country': homeowner.country.code,
                        'postal_code': homeowner.billing_postcode.code
                    },
                    # 'phone': homeowner.contact_num,
                }
            }
        else:
            raise ValueError("Value must be either I or B for Individual/Business account type.")

        kwargs = {
            'country': homeowner.country.code,
            'type': 'custom',
            'requested_capabilities': ['card_payments', 'transfers'],
            'email': homeowner.email,
        }

        response = self._execute_idempotent_request(stripe.Account.create, **kwargs, **acc_type_info)

        user_response = {'type': 'redirect', 'data': self._get_account_link(response["id"])}
        return PGTransaction(response=response, user_response=user_response, meta={"account_id": response["id"]})
