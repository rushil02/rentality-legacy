import inspect

# Register all behaviours here
PROMO_CODE_BEHAVIOURS = {
    'A': {'verbose': 'Percentage Discount', 'behaviour_class': ''},
    'B': {'verbose': 'Flat Discount', 'behaviour_class': ''},
}


def get_behaviours():
    behaviours = []
    for key in PROMO_CODE_BEHAVIOURS:
        behaviours.append((key, PROMO_CODE_BEHAVIOURS[key]['verbose']))
    return tuple(behaviours)


def get_behaviour_description(key):
    return inspect.getfile(PROMO_CODE_BEHAVIOURS[key]['behaviour_class']).__doc__


def get_behaviour_class(key):
    return PROMO_CODE_BEHAVIOURS[key]['behaviour_class']
