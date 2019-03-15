"""
Base file to describe the behaviour expected by the system. It lists all the classes
and methods that will be explicitly called by rest of the system.
"""

from abc import ABC, abstractmethod, ABCMeta


class PGTransactionError(Exception):

    def get_details(self):
        return self.details


class AccountDoesNotExist(Exception):
    pass


class AccountBase(ABC):
    def __init__(self, account_info):
        """
        Override constructor to add attributes.

        :param account_info: dict
        """
        self._account_info = account_info

    @abstractmethod
    def get_account_info(self):
        raise NotImplementedError


class PGTransaction(object):
    def __init__(self, response):
        self.type = type


class PaymentGatewayBase(ABC):
    """
    List all processes that can be handled via the payment gateway

    Virtual Accounts is a process-flow adopted by the payment gateway
    which requires and provides additional transactional control.

    TRANSACTION_TYPES is a tuple of tuple detailing about transactions
    that are allowed/handled by the specific payment gateway, which
    directly maps with `.PaymentGateway.TRANSACTION_TYPES' using the
    first element is each tuple. It is necessary to match each rele
    """
    USES_VIRTUAL_HOME_OWNER_ACCOUNT = False
    USES_VIRTUAL_TENANT_ACCOUNT = False

    TRANSACTION_TYPES = ()

    HomeOwnerAccount = AccountBase
    TenantAccount = AccountBase

    def __init__(self, home_owner_account, tenant_account):
        self.transactions = []
        self.home_owner_account = self.HomeOwnerAccount(home_owner_account)
        self.tenant_account = self.TenantAccount(tenant_account)

    # region Methods required to be implemented in each payment gateway wrapper

    @abstractmethod
    def get_or_create_home_owner_account(self, *args, **kwargs):
        raise NotImplementedError

    @abstractmethod
    def get_or_create_tenant_account(self, *args, **kwargs):
        raise NotImplementedError

    @abstractmethod
    def process_pay_in(self, amount):
        raise NotImplementedError

    @abstractmethod
    def process_pay_out(self, amount):
        raise NotImplementedError

    @abstractmethod
    def process_refund(self, amount):
        raise NotImplementedError

    # endregion


    def get_transaction_types(self):
        return self.TRANSACTION_TYPES
