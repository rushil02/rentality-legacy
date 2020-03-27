"""
Fee behaviour
    - check-out date is not included within stay duration
    - only maximum X weeks of rent is paid by the tenant
    - both tenant and home_owner are charged
    - tenant is charged service fee only for X weeks or less
    - home owner is charged service fee for the whole booking
"""

from decimal import Decimal

from ..base import (
    TenantAccountBase, HomeOwnerAccountBase, FinancialModelBase, Charge
)


class TenantAccount(TenantAccountBase):

    @property
    def payable_rent(self):
        return Decimal(self.weekly_rent * min(4, self.stay_duration))

    @property
    def service_fee(self):
        return Charge.init(self._fin_model.tenant_charge, self.payable_rent)

    @property
    def payable_amount(self):
        """ Final amount paid by the tenant """
        return self.payable_rent + self.service_fee


class HomeOwnerAccount(HomeOwnerAccountBase):

    @property
    def payable_rent(self):
        """ Rent paid via Rentality to home_owner """
        return Decimal(self.weekly_rent * min(4, self.stay_duration))

    @property
    def service_fee(self):
        """ Service fee is calculated for the whole booking """
        return Charge.init(charge=self._fin_model.homeowner_charge, principal=self.total_rent)

    @property
    def payable_amount(self):
        """ Final amount received by the home owner """
        return self.payable_rent - self.service_fee.value


class FinModeOneOne(FinancialModelBase):
    REQUIRED_ATTRS = {
        'tenant_charge': {
            'type': 'string',
            'verbose': "Percent Charge on Tenant Added to payable rent"
        },
        'homeowner_charge': {
            'type': 'string',
            'verbose': "Percent Charge on Homeowner Subtracted from payable rent (by rentality)"
        },
    }

    TenantAccountModel = TenantAccount
    HomeOwnerAccountModel = HomeOwnerAccount


