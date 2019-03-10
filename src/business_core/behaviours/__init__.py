"""
Business behaviour models package

Maintains a dictionary object representing registered business models via their
primary class. Once a business model is registered it should not be removed until
the data is cleaned; and [Important] House objects or Application objects might
hold live objects of this business model.

Example of handled data and behaviour -
    - Type of Transaction One time or Recurring
    - Rent is calculated per day/ week / etc.
    - Tenant charge
    - Home-owner charge
"""
import inspect
from .behaviour_A import BehaviourA

# Register all models here
BEHAVIOURS = {
    'A': {'verbose': 'Business Constraints A', 'behaviour_class': BehaviourA}
}


def get_behaviours():
    behaviours = []
    for key in BEHAVIOURS:
        behaviours.append((key, BEHAVIOURS[key]['verbose']))
    return tuple(behaviours)


def get_behaviour_description(key):
    return inspect.getfile(BEHAVIOURS[key]['behaviour_class']).__doc__


def get_behaviour_class(key):
    return BEHAVIOURS[key]['behaviour_class']
