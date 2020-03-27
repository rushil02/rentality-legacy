"""
Base file to describe the Business behaviour expected by the system. It lists all the classes
and methods that will be explicitly called by rest of the system.
"""
from abc import ABC

from business_core.adapters.base import Adapter


class Action(object):
    """ Holds all details for all actions to perform and resulting next state. """

    ACTOR = None

    def __init__(self, application):
        self._application = application

        self.response = {}
        self.acc_info = {}

    @property
    def next_state(self):
        raise NotImplementedError

    def execute_payment_gateway(self, payment_gateway):
        """ Explicitly override to pass if no function is to be performed. """
        raise NotImplementedError

    def record_to_db(self, application_db):
        """ Explicitly override to pass if no function is to be performed. """
        raise NotImplementedError

    def inform_entities(self, application_db):
        """ Explicitly override to pass if no function is to be performed. """
        raise NotImplementedError

    def execute_all(self, application_db, payment_gateway):
        self.execute_payment_gateway(payment_gateway)
        self.record_to_db(application_db)
        self.inform_entities(application_db)


class TenantAction(Action, ABC):
    ACTOR = 'Tenant'


class HomeOwnerAction(Action, ABC):
    ACTOR = 'HomeOwner'


class SystemAction(Action, ABC):
    ACTOR = 'System'


class StaffAction(Action, ABC):
    ACTOR = 'Staff'


class BehaviourBase(Adapter):
    """
    Use as base class for all Business Model Config behaviour adapters

    `STATE_MAP` is used to maintain all possible operations by relevant
    actors. '_no_app_' is special general state to mark application initial
    (unsaved) state.

    """
    # {actor: {curr_state: {event: Action, ...}, ...}, ...}
    STATE_MAP = {}
    STATE_START = None

    def on_event(self, event, actor):
        try:
            return self.STATE_MAP[actor][self.application.get_curr_state()][event](self.application)
        except KeyError:
            raise AssertionError("%s is not allowed" % event)
