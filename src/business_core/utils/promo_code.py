from promotions.utils.promo_code_behaviour import get_behaviour_class as get_promo_code_behaviour_class


class PromoCode(object):

    def __init__(self, obj):
        """
        :param obj: `promotions.models.PromotionalCode` object
        """
        self._obj = obj
        self.behaviour = get_promo_code_behaviour_class(obj.behaviour)()

    @property
    def can_change_business_model(self):
        return self.behaviour.can_change_business_model_config

    def get_business_model_config(self):
        return self.behaviour.get_business_model_config()

    @classmethod
    def initialize_many(cls, promo_code_objs):
        pc_objs = []
        for obj in promo_code_objs:
            pc_objs.append(cls(obj))
        return pc_objs
