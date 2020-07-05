from django.core.exceptions import ValidationError

from business_core.utils import House
from payment_gateway.adapters import PGTransactionError
from payment_gateway.utils import PaymentGateway
from user_custom.models import Account


class Listing(object):
    """
    Models all state and life process of House
    """

    # region init
    def __init__(self, house, actor, state):
        """

        :param house: 'House' object
        :param actor: homeowner or staff or system
        :param state: current state
        """
        self._house = house
        self._actor = actor
        self.current_state = state
        self._house_db = None

    @property
    def db(self):
        return self._house_db

    @property
    def business_model(self):
        return self._house.get_business_model()

    @classmethod
    def load(cls, house_obj, actor):
        """
        Creates a new Financial Listing object.

        :param actor: [home_owner, system, admin]
        :param house_obj: 'house.models.House` object
        :return: cls object
        """
        house = House.load(house_obj)
        obj = cls(house, actor=actor, state=house_obj.status)
        obj._house_db = house_obj
        return obj

    # end region

    def validate(self):
        return self._house.validate()

    def activate(self):
        self.db.update_status('P')

    def deactivate(self):
        self.db.update_status('I')

    def has_publishable_account(self):
        user = self.db.home_owner.user

        # Check homeowner information
        if not user.has_billing_information():
            return False

        payment_gateway = PaymentGateway.load_location_default(
            billing_location=user.get_billing_location(),
            house_location=self.db.location,
        )

        # Check if PG info is available
        try:
            payment_gateway.set_homeowner_user(user)

            pgt = payment_gateway.verify_payout_account()
        except (AttributeError, AssertionError, PGTransactionError):
            return False
        else:
            # check if account status from PG is verified
            if not pgt.user_response['verified']:
                return False
            # check if bank account or other source is provide to PG for payouts
            if not pgt.user_response['external_account']:
                return False

        return True
