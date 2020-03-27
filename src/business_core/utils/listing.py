from business_core.utils import House


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
        return obj

    # end region

    def validate(self):
        return self._house.validate()

    def publish(self):
        return self._house
