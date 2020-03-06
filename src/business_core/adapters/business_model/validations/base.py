"""
Base file to describe the Business constraints expected by the system. It lists all the classes
and methods that will be explicitly called by rest of the system.
"""


class ValidationsModelBase(object):
    REQUIRED_ATTRS = {}

    def __init__(self, constraints_meta):
        """
        :param constraints_meta: {'attr': {'attr_name`: value, ...}, }
        """
        self.meta = constraints_meta
        self.errors = []

        for attr in self.REQUIRED_ATTRS.keys():
            try:
                setattr(self, attr, self.meta['attr'][attr])
            except KeyError:
                pass
                # raise Exception("%s - Required value not fund in constraints by DB." % attr)

    def validate_house(self, house):
        """
        Override this method to run validations.
        :param house: `business_core.utils.House` object
        :return:
        """
        raise NotImplementedError

    def validate_application(self, application):
        """
        Override this method to run validations.
        :param application: `business_core.utils.Application` object
        :param raise_exception:
        :return:
        """
        raise NotImplementedError
