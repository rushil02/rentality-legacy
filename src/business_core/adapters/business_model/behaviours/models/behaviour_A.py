from ..base import BehaviourBase, TenantAction, SystemAction
from django.utils import timezone


class TenantIntend(TenantAction):
    """
    Possible states -> Incomplete
    """

    def execute_payment_gateway(self, payment_gateway, application_db):
        pass

    def create_ledger_record(self, application_db):
        pass

    def inform_entities(self, application_db):
        pass

    def postprocess(self, application_db):
        self._next_state = 'Incomplete'


class TenantExecuteIntent(TenantAction):
    """
    Possible states -> Pending
    """

    def preprocess(self, application_db):
        self.acc_info['booking_date'] = timezone.now()

    def execute_payment_gateway(self, payment_gateway, application_db):
        self.pgt = payment_gateway.create_intent(self.application)

    def create_ledger_record(self, application_db):
        pass

    def inform_entities(self, application_db):
        pass

    def postprocess(self, application_db):
        self._next_state = 'Pending'


class SystemExecuteIntent(SystemAction):
    """
    Possible states -> Error, Booked
    """
    def execute_payment_gateway(self, payment_gateway, application_db):
        self.pgt = payment_gateway.execute_intent(self.application)

    def create_ledger_record(self, application_db):
        return False

    def inform_entities(self, application_db):
        pass


class BehaviourA(BehaviourBase):
    """
    - One time charge
    - Rent is calculated per day
    - Tenant charge
            - principal - `x`[meta] weeks of rent
            - `y` [meta] percentage to be charged on principal
    - Final charge on tenant is `principal + tenant charge`
    - Home Owner charge
            - principal - whole booking amount
            - `y` percentage to be charged on principal
    - Final payout on home-owner is `tenant principal - home-owner charge`
    - Payment Trigger - instance of Booking
    - Payout Trigger - 24 hours after check-in date
    -
    """

    STATE_MAP = {
        'tenant': {
            '_no_app_': {
                'intend': TenantIntend,
            },
            'Incomplete': {
                'execute_intent': TenantExecuteIntent,
            },
        },
        'system': {
            'Pending': {
                'execute_intent': SystemExecuteIntent,
            }
        }
    }

    STATE_START = 'intend'
