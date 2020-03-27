from application.utils import STATE_REVERSE_MAP_FOR_DB, ACTOR_REVERSE_MAP_FOR_DB
from ..base import BehaviourBase, Action, TenantAction
from django.utils import timezone


def tenant_intend(**kwargs):
    return {
        'state': 'Incomplete',
        'acc_info': {},
        'response': {},
        'mail': {
            'tenant': '',
            'home_owner': ''
        }
    }


def tenant_update(**kwargs):
    return {
        'state': 'Incomplete',
        'acc_info': {},
        'response': {},
        'mail': {
            'tenant': '',
            'home_owner': ''
        }
    }


def tenant_execute_intent(**kwargs):
    return {
        'state': 'Pending Locked',
        'acc_info': {'booking_date': timezone.now()},
        'response': {},
        'mail': {
            'tenant': 'booked',
            'home_owner': 'booked'
        },
        'payment_gateway': {
            'action': 'get_intent',
            'response': lambda resp: resp['client_secret']
        }
    }


class TenantIntend(Action):
    """
    Possible states -> Error
    """
    ACTOR = 'Tenant'

    @property
    def next_state(self):
        return 'Booked'

    def execute_payment_gateway(self, payment_gateway):
        self.response['PG'] = payment_gateway.get_intent(self._application)['client_secret']

    def record_to_db(self, application_db):
        application_db.update_status(
            new_state=STATE_REVERSE_MAP_FOR_DB[self._application.current_state],
            actor=ACTOR_REVERSE_MAP_FOR_DB[self.ACTOR]
        )

    def inform_entities(self, application_db):
        pass


class TenantExecuteIntent(TenantAction):
    """
    Possible states -> Error, Booked
    """
    ACTOR = 'Tenant'

    # EMAIL = ''

    @property
    def next_state(self):
        return 'Booked'

    def execute_payment_gateway(self, payment_gateway):
        self.response['PG'] = payment_gateway.get_intent(self._application)['client_secret']

    def record_to_db(self, application_db):
        application_db.update_status(
            new_state=STATE_REVERSE_MAP_FOR_DB[self._application.current_state],
            actor=ACTOR_REVERSE_MAP_FOR_DB[self.ACTOR]
        )

    def inform_entities(self, application_db):
        pass


def system_execute_intent(**kwargs):
    if kwargs.get('passed'):
        return {'state': 'Booked'}
    else:
        return {
            'state': 'Error',
            'meta': {'message': 'Transaction Failed'}
        }


class SystemExecuteIntent(Action):

    @property
    def next_state(self):
        return 'Booked'


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
                'intend': tenant_intend(),
            },
            'Incomplete': {
                'update': tenant_update,
                'execute_intent': TenantExecuteIntent,
            },
        },
        'system': {
            'Pending Locked': {
                'execute_intent': SystemExecuteIntent,
            }
        }
    }

    STATE_START = 'intend'
