"""
Base file to describe the behaviour expected by the system. It lists all the classes
and methods that will be explicitly called by rest of the system.

Basic Expected behaviour    [Updated - 16 March 2019]
    - PCI compliance only affects card and bank information handing.
    - Accounts can be created without interfacing with PG (due to PCI) on frontend
      by user. This doesn't mean they necessarily have to; but are only equipped to
      do so. On contrary, some PGs might constraint account creation by mandatory
      association with Bank Account / Debit Card Details.
    - Payment Charges follow
    - Home Owner Accounts
        -
    - Tenant Accounts
"""


class PGTransactionError(Exception):
    def __init__(self, user_message=None, meta_store=None):
        self.user_message = user_message
        self.meta_store = meta_store

    def __str__(self):
        return self.user_message


class PGTransaction(object):
    def __init__(self, response, user_response=None, meta=None):
        """
        `_db` stores object of `financials.models.PaymentGatewayTransaction` if available

        :param response: Raw response from PG
        :param user_response: information used to create server response
        :param meta: information to be saved in the DB
        """
        self._response = response
        self.user_response = user_response
        self.meta_store = meta
        self._db = None
        self.record_transaction = False

        # dict containing details for PG transaction record - {'id': ..., 'user_type': `tenant or homeowner`}
        self.tr_details = None

    @property
    def db(self):
        if self._db:
            return self._db
        raise AttributeError("PGT db object is not set")

    @property
    def transaction_type(self):
        if self.tr_details:
            return self.tr_details['tr_type']
        raise AttributeError("Transaction details are not set")

    @property
    def user_type(self):
        if self.tr_details:
            return self.tr_details['user_type']
        raise AttributeError("Transaction details are not set")

    @property
    def transaction_id(self):
        if self.tr_details:
            return self.tr_details['id']
        raise AttributeError("Transaction details are not set")

    @property
    def amount(self):
        """ Amount should be returned from the PG as confirmation"""
        if self.tr_details:
            return self.tr_details['amount']
        raise AttributeError("Transaction details are not set")

    def set_db(self, pgt_obj):
        self._db = pgt_obj

    def record(self, user_type, tr_type, tr_id, amount):
        """
        Call if the transaction needs to be recorded in the DB - `financials.models.PaymentGatewayTransaction`.

        :param user_type: `tenant` or homeowner`
        :param tr_type: options listed in `PaymentGatewayTransaction.CORE_TRANSACTION_TYPES` and `PaymentGatewayTransaction.VIRTUAL_TRANSACTIONS`
        :param tr_id: transaction id from payment gateway
        :param amount: Amount
        :return:
        """
        self.tr_details = dict(
            user_type=user_type,
            tr_type=tr_type,
            id=tr_id,
            amount=amount
        )
        self.record_transaction = True


class PaymentGatewayBase(object):
    """
    List all processes that can be handled via the payment gateway

    Virtual Accounts is a process-flow adopted by the payment gateway
    which requires and provides additional transactional control.

    TRANSACTION_TYPES is a tuple of tuple detailing about transactions
    that are allowed/handled by the specific payment gateway, which
    directly maps with `.PaymentGateway.TRANSACTION_TYPES' using the
    first element is each tuple.
    """

    # USES_VIRTUAL_HOME_OWNER_ACCOUNT = False
    # USES_VIRTUAL_TENANT_ACCOUNT = False

    TRANSACTION_TYPES = ()

    def __init__(self):
        self._homeowner = None
        self._tenant = None
        self._application_db = None
        self._sys_actor = None

    def set_attrs(self, homeowner=None, tenant=None, application_db=None, sys_actor=None):
        self._homeowner = homeowner
        self._tenant = tenant
        self._sys_actor = sys_actor
        self._application_db = application_db

    def process_webhook_event(self, request, *args, **kwargs):
        """

        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        raise NotImplementedError

    # region Payout Account Methods required to be implemented in each payment gateway wrapper

    def create_payout_account(self, homeowner):
        raise NotImplementedError

    def verify_payout_account_status(self, homeowner):
        raise NotImplementedError

    def update_payout_account(self, homeowner):
        raise NotImplementedError

    def add_update_bank_account(self, homeowner):
        raise NotImplementedError

    def get_bank_account(self, homeowner):
        raise NotImplementedError

    # endregion

    # region
    def create_intent(self, homeowner, tenant, application):
        raise NotImplementedError

    def process_pay_in(self):
        raise NotImplementedError
    # endregion
