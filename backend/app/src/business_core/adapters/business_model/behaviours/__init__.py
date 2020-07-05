"""
Business behaviour models package

Maintains a dictionary object representing registered business behaviour models via
their primary class. Once a business model is registered it should not be removed
until the data is cleaned; and [Important] House objects or Application objects might
hold live objects of this business model.

Example of handled data and behaviour -
    - Type of Transaction One time or Recurring
    - Rent is calculated per day/ week / etc.
    - Tenant charge
    - Home-owner charge
"""
import inspect
from .models.behaviour_A import BehaviourA

# Register all models here
BEHAVIOURS = {
    'A': {'verbose': 'Business Constraints A', 'behaviour_class': BehaviourA}
}


def get_behaviours():
    behaviours = []
    # Since this method returns a tuple derived from a dictionary, the
    # structure needs to be consistent for the same data. This is resolved
    # by using `sorted` on the dictionary on the basis of its keys.
    for key in sorted(BEHAVIOURS):
        behaviours.append((key, BEHAVIOURS[key]['verbose']))
    return tuple(behaviours)


def get_behaviour_description(key):
    return inspect.getdoc(BEHAVIOURS[key]['behaviour_class'])


def get_behaviour_class(key):
    return BEHAVIOURS[key]['behaviour_class']
