"""
Fee behaviour
    - only 4 weeks of rent is paid by the tenant
    - both tenant and home_owner are charged
    - tenant is charged service fee only for 4 weeks or less
    - home owner is charged service fee for the whole booking
"""

from decimal import Decimal

from .base import (
    TenantAccountBase, HomeOwnerAccountBase, FeeModelBase, Charge
)


class TenantAccount(TenantAccountBase):

    @property
    def payable_rent(self):
        return Decimal(self.weekly_rent * min(4, self.stay_duration))


class HomeOwnerAccount(HomeOwnerAccountBase):

    @property
    def payable_rent(self):
        """ Rent paid via Rentality to home_owner """
        return Decimal(self.weekly_rent * min(4, self.stay_duration))

    @property
    def service_fee(self):
        """ Service fee is calculated for the whole booking """
        return Charge.init(self.fee.home_owner_charge, self.total_rent)


class FeeModel(FeeModelBase):
    TenantAccountModel = TenantAccount
    HomeOwnerAccountModel = HomeOwnerAccount
