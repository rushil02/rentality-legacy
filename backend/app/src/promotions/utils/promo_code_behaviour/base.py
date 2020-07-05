

class PromoCodeBaseBehaviour(object):

    @property
    def can_change_business_model_config(self):
        return False

    def get_business_model_config(self):
        raise NotImplementedError

    def __init__(self):
        ...
