"""
Base file to describe the Business constraints expected by the system. It lists all the classes
and methods that will be explicitly called by rest of the system.
"""
from business_core.adapters.base import Adapter


class ValidationsModelBase(Adapter):

    def validate_house(self):
        """
        Override this method to run validations.
        :return: []
        """
        raise NotImplementedError

    def validate_application(self):
        """
        Override this method to run validations.
        :return: []
        """
        raise NotImplementedError
