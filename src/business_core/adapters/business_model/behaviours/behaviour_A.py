from .base import BehaviourBase


def tenant_intend():
    return 'Incomplete'


def tenant_update():
    return


def tenant_execute_intent():
    return


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
                'intend': tenant_intend,
            },
            'incomplete': {
                'update': tenant_update,
                'execute_intent': tenant_execute_intent,
            },
        }
    }

    STATE_START = 'intend'
