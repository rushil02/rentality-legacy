import inspect

# Register all behaviours here
from promotions.utils.promo_code_behaviour.flat_discount import FlatDiscountBehaviour

PROMO_CODE_BEHAVIOURS = {
    'A': {'verbose': 'Percentage Discount', 'behaviour_class': ''},
    'B': {'verbose': 'Flat Discount', 'behaviour_class': FlatDiscountBehaviour},
}


def get_behaviours():
    behaviours = []
    # Since this method returns a tuple derived from a dictionary, the
    # structure needs to be consistent for the same data. This is resolved
    # by using `sorted` on the dictionary on the basis of its keys.
    for key in sorted(PROMO_CODE_BEHAVIOURS):
        behaviours.append((key, PROMO_CODE_BEHAVIOURS[key]['verbose']))
    return tuple(behaviours)


def get_behaviour_description(key):
    return inspect.getfile(PROMO_CODE_BEHAVIOURS[key]['behaviour_class']).__doc__


def get_behaviour_class(key):
    return PROMO_CODE_BEHAVIOURS[key]['behaviour_class']
