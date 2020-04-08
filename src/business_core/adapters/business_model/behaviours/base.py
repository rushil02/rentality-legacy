"""
Base file to describe the Business behaviour expected by the system. It lists all the classes
and methods that will be explicitly called by rest of the system.
"""
from abc import ABC

from business_core.adapters.base import Adapter
from utils.helpers import merge_dicts


class Action(object):
    """ Holds all details for all actions to perform and resulting next state. """

    ACTOR = None

    def __init__(self, application):
        self.application = application

        self._next_state = None

        # `payment_gateway.utils.PaymentGatewayTransaction` object
        self.pgt = None
        # `financials.models.LedgerRecord` object
        self.ledger_record = None

        self.user_response = dict()
        self.acc_info = dict()

    @property
    def next_state(self):
        if self._next_state:
            return self._next_state
        else:
            raise AttributeError("Next state is not set yet")

    @property
    def status_is_updated(self):
        return bool(self._next_state)

    def preprocess(self, application_db):
        """
        Override to perform desired operations before any payment gateway
        actions, ledger creation and email.
        """
        pass

    def postprocess(self, application_db):
        """
        Override to perform desired operations after payment gateway
        actions and ledger creation but not email.
        """
        pass

    def execute_payment_gateway(self, payment_gateway, application_db):
        """
        Explicitly override to pass if no function is to be performed.
        Set self.pgt here (None if no PG action)
        """
        raise NotImplementedError

    def create_ledger_record(self, application_db):
        """
        Explicitly override to pass if no function is to be performed.
        Set self.ledger_record here (None if no PG action)
        """
        raise NotImplementedError

    def inform_entities(self, application_db):
        """ Explicitly override to pass if no function is to be performed. """
        raise NotImplementedError

    def execute_all(self, application_db, payment_gateway):
        self.preprocess(application_db)
        self.execute_payment_gateway(payment_gateway, application_db)
        self.create_ledger_record(application_db)
        self.postprocess(application_db)
        self.inform_entities(application_db)

    def get_meta_update_info(self):
        if self.pgt and self.pgt.meta_info:
            return merge_dicts(self.acc_info, self.pgt.meta_info)
        else:
            return self.acc_info


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
            return self.STATE_MAP[actor][self.application.state][event](self.application)
        except KeyError:
            raise AssertionError("%s is not allowed" % event)
