"""
Base file to describe the Business constraints expected by the system. It lists all the classes
and methods that will be explicitly called by rest of the system.
"""

from .exceptions import ConstraintError


class ConstraintsModelBase(object):
    REQUIRED_ATTRS = {}

    def __init__(self, house, constraints_meta):
        """
        :param house: `business_core.utils.House` object
        :param constraints_meta: {'attr': {'attr_name`: value, ...}, }
        """
        self.house = house
        self.meta = constraints_meta
        self.errors = []

        for attr in self.REQUIRED_ATTRS.keys():
            setattr(self, attr, self.meta['attr'][attr])

    def validate_house(self, raise_exception):
        """
        Override this method to run validations, after validating, run this method.
        :param raise_exception:
        :return:
        """
        if raise_exception and self.errors:
            raise ConstraintError("Constraints validation failed.", self.errors)
        elif self.errors:
            return False
        else:
            return True

    def validate_application(self, raise_exception):
        """
        Override this method to run validations, after validating, run this method.
        :param raise_exception:
        :return:
        """
        if raise_exception and self.errors:
            raise ConstraintError("Constraints validation failed.", self.errors)
        elif self.errors:
            return False
        else:
            return True

    def get_errors(self):
        return self.errors

