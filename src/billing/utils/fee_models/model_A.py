"""
Fee model
    - only 4 weeks of rent is paid by the tenant
    - both tenant and home_owner are charged
    - No taxes
    - tenant is charged service fee only for 4 weeks or less
    - home owner is charged service fee for the whole booking
"""
from billing.utils.fee_models.base import TenantAccountBase, HomeOwnerAccountBase, FeeModelBase


class TenantAccount(TenantAccountBase):

    @property
    def payable_rent(self):
        return self.weekly_rent * min(4, self.stay_duration)

    @property
    def tax(self):
        raise 0.0


class HomeOwnerAccount(HomeOwnerAccountBase):

    @property
    def payable_rent(self):
        """ Rent paid via Rentality to home_owner """
        return self.weekly_rent * min(4, self.stay_duration)

    @property
    def service_fee(self):
        """ Service fee is calculated for the whole booking """
        return (self.fee.home_owner_charge / 100) * self.total_rent

    @property
    def tax(self):
        return 0.0


class FeeModel(FeeModelBase):
    TenantAccountModel = TenantAccount
    HomeOwnerAccountModel = HomeOwnerAccount
