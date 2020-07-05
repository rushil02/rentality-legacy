class Adapter(object):
    """
    Defines basic access methods and architecture to use 'business_core.utils.house'
    and 'business_core.utils.application'.

    REQUIRED_ATTRS = {
        attr-name: {
            'type': 'positive-integer' / ...,  # TODO: Extend support when required
            'verbose': verbose display
        }, ...
    }
    """
    REQUIRED_ATTRS = {}

    def __init__(self, meta):
        """
        :param meta: {'attr': {attr_name: value, ...}, }
        """
        self._meta = meta

        for attr in self.REQUIRED_ATTRS.keys():
            try:
                setattr(self, attr, self._meta['attr'][attr])
            except KeyError:
                raise Exception("%s - Required value not found in constraints by DB." % attr)

        self.application = None
        self.house = None

    def set_application(self, application):
        self.application = application
        self.house = application.house

    def set_house(self, house):
        self.house = house
