"""
Base file to describe the behaviour expected by the system. It lists all the classes
and methods that will be explicitly called by rest of the system.

Basic Expected behaviour    [Updated - 16 March 2019]
    - PCI compliance only affects card and bank information handing.
    - Accounts can be created without interfacing with PG (due to PCI) on frontend
      by user. This doesn't mean they necessarily have to; but are only equipped to
      do so. On contrary, some PG's might constraint account creation by mandatory
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


class PGTransaction(object):
    def __init__(self, response, user_response=None, meta=None):
        self._response = response
        self.user_response = user_response
        self.meta_store = meta


class PaymentGatewayBase(object):
    """
    List all processes that can be handled via the payment gateway

    Virtual Accounts is a process-flow adopted by the payment gateway
    which requires and provides additional transactional control.

    TRANSACTION_TYPES is a tuple of tuple detailing about transactions
    that are allowed/handled by the specific payment gateway, which
    directly maps with `.PaymentGateway.TRANSACTION_TYPES' using the
    first element is each tuple. It is necessary to match each rele
    """

    # Register all actions here
    # TODO: BusinessModel behaviour and Payment gateway compatibility can be auto-checked here ??
    # {event: lambda obj: obj.action_method_name, ...}
    EVENT_ACTION_MAP = {}

    def __init__(self):
        self.application = None
        self.house = None
        self.home_owner = None
        self.tenant = None

    def on_event(self, event):
        try:
            return self.EVENT_ACTION_MAP[event](self)()
        except KeyError:
            raise AssertionError("%s is not allowed" % event)

    # USES_VIRTUAL_HOME_OWNER_ACCOUNT = False
    # USES_VIRTUAL_TENANT_ACCOUNT = False
    #
    # TRANSACTION_TYPES = ()
    #
    # HomeOwnerAccount = AccountBase
    # TenantAccount = AccountBase

    # def __init__(self):
    #     self.transactions = []
    #     self.home_owner_account = None
    #     self.tenant_account = None

    # @classmethod
    # def init(cls, home_owner_account, tenant_account):
    #     obj = cls()
    #     obj.home_owner_account = obj.HomeOwnerAccount(home_owner_account)
    #     obj.tenant_account = obj.TenantAccount(tenant_account)

    # region Methods required to be implemented in each payment gateway wrapper

    # @abstractmethod
    # def create_home_owner_account(self, *args, **kwargs):
    #     raise NotImplementedError
    #
    # @abstractmethod
    # def create_tenant_account(self, *args, **kwargs):
    #     raise NotImplementedError
    #
    # @abstractmethod
    # def process_pay_in(self, amount):
    #     raise NotImplementedError
    #
    # @abstractmethod
    # def process_pay_out(self, amount):
    #     raise NotImplementedError
    #
    # @abstractmethod
    # def process_refund(self, amount):
    #     raise NotImplementedError
    #
    # # endregion
    #
    # def get_transaction_types(self):
    #     return self.TRANSACTION_TYPES
