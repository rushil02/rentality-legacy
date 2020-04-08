"""
Home Owner -
    Accounts are different from Bank Accounts
    Bank Accounts can be in any country with relevant transaction currency.
    Any number of bank accounts / Debit Cards can be associated with Home Owner Account (Custom Account).

Tenant -
"""
from django.contrib.sites.shortcuts import get_current_site
from ipware import get_client_ip
from django.utils import timezone

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

    TRANSACTION_TYPES = (
        ('IN', 'Intend'),
        ('EX', 'Execute Intent (Payment Completed)')
    )

    @staticmethod
    def get_payout_account_id(details):
        try:
            return details['account_id']
        except KeyError:
            raise AssertionError("PG Payout account is not found")

    def _execute_request(self, request, *args, **kwargs):
        try:
            return request(
                *args,
                **kwargs,
                api_key=self.STRIPE_SECRET_KEY,
                stripe_version=self.STRIPE_VERSION,
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
        return self._execute_request(request, idempotency_key=idempotency_key, *args, **kwargs)

    # region Pay-in Methods
    def create_intent(self, homeowner, tenant, application):
        # Convert to nearest integer in smallest currency unit
        amount = int(application.tenant_account.payable_amount * 100)

        kwargs = {
            'amount': amount,
            'currency': "aud",
            'payment_method_types': ["card"]
        }

        response = self._execute_idempotent_request(stripe.PaymentIntent.create, **kwargs)
        pgt = PGTransaction(
            response=response,
            user_response={'client_secret': response['client_secret']},
            meta={'stripe': {'payment_intent_id': response['id']}}
        )
        return pgt

    # endregion

    # region Payout Accounts
    def _get_account_link(self, request, account_id, success_url, failure_url):
        domain = get_current_site(request)
        return self._execute_request(
            stripe.AccountLink.create,
            account=account_id,
            failure_url="https://{}/{}".format(domain, failure_url),
            success_url="https://{}/{}".format(domain, success_url),
            type="custom_account_verification",
            collect="currently_due"
        )

    def create_payout_account(self, homeowner):
        try:
            self.get_payout_account_id(homeowner.account_details)
        except AssertionError:
            pass
        else:
            raise AssertionError("PG Account already exists")
        client_ip, routable = get_client_ip(homeowner.user_request)
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
            'tos_acceptance': {
                'date': int(timezone.now().timestamp()),
                'ip': client_ip,
                'user_agent': homeowner.user_request.META['HTTP_USER_AGENT'],
            }
        }

        response = self._execute_idempotent_request(stripe.Account.create, **kwargs, **acc_type_info)

        user_response = {
            'type': 'redirect',
            'data': self._get_account_link(
                request=homeowner,
                account_id=response["id"],
                success_url=homeowner.request_data['success_url'],
                failure_url=homeowner.request_data['failure_url']
            )
        }
        return PGTransaction(response=response, user_response=user_response, meta={"account_id": response["id"]})

    def verify_payout_account_status(self, homeowner):
        acc_id = self.get_payout_account_id(homeowner.account_details)
        response = self._execute_request(stripe.Account.retrieve, acc_id)
        requirements = response["requirements"]["currently_due"].copy()
        try:
            requirements.remove('external_account')
        except ValueError:
            ext_acc = True
        else:
            ext_acc = False

        user_response = {
            'verified': not bool(requirements),
            'external_account': ext_acc
        }
        return PGTransaction(response=response, user_response=user_response)

    def update_payout_account(self, homeowner):
        acc_id = self.get_payout_account_id(homeowner.account_details)
        response = self._get_account_link(
            request=homeowner,
            account_id=acc_id,
            success_url=homeowner.request_data['success_url'],
            failure_url=homeowner.request_data['failure_url']
        )
        user_response = {'type': 'redirect', 'data': response}
        return PGTransaction(response=response, user_response=user_response)

    def add_update_bank_account(self, homeowner):
        acc_id = self.get_payout_account_id(homeowner.account_details)

        try:
            ba_id = self._execute_request(
                stripe.Account.list_external_accounts,
                acc_id,
                object="bank_account",
                limit=1
            )['data'][0]['id']
        except IndexError:
            ba_id = None

        response = self._execute_idempotent_request(
            stripe.Account.create_external_account,
            acc_id,
            default_for_currency=True,
            external_account=homeowner.request_data['token']
        )

        if ba_id:
            self._execute_request(
                stripe.Account.delete_external_account,
                acc_id,
                ba_id
            )

        user_response = {'routing_number': response["routing_number"], 'last4': response["last4"]}
        return PGTransaction(response=response, user_response=user_response)

    def get_bank_account(self, homeowner):
        acc_id = self.get_payout_account_id(homeowner.account_details)
        response = self._execute_request(
            stripe.Account.list_external_accounts,
            acc_id,
            object="bank_account",
            limit=1
        )['data']
        if response:
            return PGTransaction(
                response=response,
                user_response={"last4": response[0]["last4"], "routing_number": response[0]["routing_number"]}
            )
        else:
            return PGTransaction(response=response, user_response={"error": "No bank account details found."})

    # endregion
