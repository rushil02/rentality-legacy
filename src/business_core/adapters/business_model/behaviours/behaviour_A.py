from .base import BehaviourBase
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
        }
    }


def system_execute_intent(**kwargs):
    if kwargs.get('passed'):
        return {'state': 'Booked'}
    else:
        return {
            'state': 'Error',
            'meta': {'message': 'Transaction Failed'}
        }


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
            'Incomplete': {
                'update': tenant_update,
                'execute_intent': tenant_execute_intent,
            },
        },
        'system': {
            'Pending Locked': {
                'execute_intent': system_execute_intent,
            }
        }
    }

    STATE_START = 'intend'
