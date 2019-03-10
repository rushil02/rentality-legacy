"""
Base file to describe the behaviour expected by the system. It lists all the classes
and methods that will be explicitly called by rest of the system.
"""

from abc import ABC, abstractmethod


class PaymentGatewayBase(ABC):
    _CORE_TRANSACTION_TYPES = (
        ('P', 'Payout'),
        ('C', 'Pay-in'),
        ('R', 'Refund')
    )

    def __init__(self):
        pass


    @property
    @abstractmethod
    def TRANSACTION_TYPES(self):
        raise NotImplementedError

    # region Methods required to be implemented in each payment gateway wrapper

    @abstractmethod
    def get_or_create_home_owner_account(self, *args, **kwargs):
        raise NotImplementedError

    @abstractmethod
    def get_or_create_tenant_account(self, *args, **kwargs):
        raise NotImplementedError

    @abstractmethod
    def process_pay_in(self):
        raise NotImplementedError

    @abstractmethod
    def process_pay_out(self):
        raise NotImplementedError

    @abstractmethod
    def process_refund(self):
        raise NotImplementedError

    # endregion

    def get_transaction_types(self):
        return self.TRANSACTION_TYPES
