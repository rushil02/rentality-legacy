"""
Home Owner -
    Accounts are different from Bank Accounts
    Bank Accounts can be in any country with relevant transaction currency.
    Any number of bank accounts / Debit Cards can be associated with Home Owner Account (Custom Account).

Tenant -
"""
import stripe

from .base import PaymentGatewayBase, AccountBase, PGTransactionError, PGTransaction, AccountDoesNotExist
from rentality.settings.common import get_env_var


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


class Account(AccountBase):
    REQUIRED_ADDITIONAL_DETAILS = {
        'account':[
            'external_account',
        ]
    }

    def __init__(self, account_info):
        """
        :param account_info: dict
        """
        super(Account, self).__init__(account_info)
        self.customer_id = account_info.get('customer_id', default=None)
        self.account_id = account_info.get('account_id', default=None)

    def get_account_info(self):
        info = dict()
        if self.customer_id:
            info['customer_id'] = self.customer_id
        if self.account_id:
            info['account_id'] = self.account_id
        return info

    def set_customer_id(self, new_id):
        if self.account_id:
            raise AssertionError("Customer object already exists")
        else:
            self.customer_id = new_id

    def get_customer_id(self):
        return self.customer_id

    def set_account_id(self, new_id):
        if self.account_id:
            raise AssertionError("Account object already exists")
        else:
            self.account_id = new_id

    def get_account_id(self):
        return self.account_id





    def add_bank_account(self):
        ...


class HomeOwnerAccount(AccountBase):

    def __init__(self, account_info):
        """
        :param account_info: dict
        """
        super(HomeOwnerAccount, self).__init__(account_info)
        self.id = account_info.get('account_id', default=None)
        if not self.id:
            raise AccountDoesNotExist("Home Owner Account is not registered with this Payment Gateway")

    def get_account(self):
        ...

    def create_account(self, user, source, **kwargs):
        try:
            resp = stripe.Account.create(
                type='custom',
                country='',
                email=kwargs['email'],
                business_type=kwargs['account_type'],
                external_account={
                    'object':'bank_account',

                },
                source=source
            )
        except Exception as e:
            self.handle_error(e)
        else:
            self.set_account_id(resp.id)

    def add_bank_account(self):
        pass



class TenantAccount(Account):
    def __init__(self, account_info):
        """
        :param account_info: dict
        """
        super(Account, self).__init__(account_info)
        self.id = account_info.get('customer_id', default=None)

    def create_customer(self, user, source):
        try:
            resp = stripe.Customer.create(
                email=user.email,
                source=source
            )
        except Exception as e:
            self.handle_error(e)
        else:
            self.set_customer_id(resp.id)


class StripePaymentGateway(PaymentGatewayBase):
    STRIPE_PUBLISHABLE_KEY = get_env_var('STRIPE_PUBLISHABLE_KEY')
    STRIPE_SECRET_KEY = get_env_var('STRIPE_SECRET_KEY')

    USES_VIRTUAL_HOME_OWNER_ACCOUNT = True

    # Maps
    TRANSACTION_TYPES = (
        ('DC', 'Destination Charge', "Transaction from Tenant to Home-Owner Virtual Account"),
        ('T', 'Transfer', "Virtual Transfer from Rentality Virtual Account to Home-owner Virtual Account"),
        ('P', 'Payout', "Transaction from Home-owner Virtual Account to Home-owner"),
        ('RT', 'Reverse Transfer', "Virtual Transfer from Home-owner Virtual Account to Rentality Virtual Account"),
        ('R', 'Refund', "Transaction from Rentality Virtual Account to Tenant"),
    )

    HomeOwnerAccount = Account
    TenantAccount = Account

    def execute_request(self, request_api, *args, **kwargs):
        try:
            resp = request_api(api_key=self.STRIPE_SECRET_KEY, *args, **kwargs)
        except stripe.error.StripeError:  # FIXME: are specific errors required?
            raise PGTransactionError()
        else:
            transaction = PGTransaction(resp)
            return transaction

    def get_or_create_home_owner_account(self, id=None, *args, **kwargs):
        if id:
            return get_account(id)
        else:
            create_account()

    def create_home_owner_account(self, user_info):
        execute_request()
    def get_or_create_tenant_account(self, *args, **kwargs):
        pass

    def process_pay_in(self, amount, *args, **kwargs):
        self.create_destination_charge()

    def process_pay_out(self, amount):
        pass

    def process_refund(self, amount):
        pass

    def create_destination_charge(self, source_amount, destination_amount, source=None):
        try:
            resp = stripe.Charge.create(
                amount=source_amount,
                currency="aud",
                customer=self.tenant_account.get_customer_id(),
                transfer_data={
                    "destination": self.home_owner_account.get_account_id(),
                    "amount": destination_amount
                },
            )
        except Exception as e:
            self.handle_error(e)

