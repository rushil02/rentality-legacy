"""
Fee behaviours package

Maintains a dictionary object representing registered behaviours via their file
module. Once a behaviour is registered it should not be removed until the data is
cleaned; and [Important] House objects might hold live objects of this behaviour.
"""

from . import behaviour_A

# Register all models here
BEHAVIOURS = {
    'A': {'verbose': 'Business Plan A', 'behaviour_file': behaviour_A}
}


def get_behaviours():
    behaviours = []
    for key in BEHAVIOURS:
        behaviours.append((key, BEHAVIOURS[key]['verbose']))
    return tuple(behaviours)


def get_behaviour_description(key):
    return BEHAVIOURS[key]['behaviour_file'].__doc__
