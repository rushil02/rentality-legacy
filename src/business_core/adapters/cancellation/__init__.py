"""
Cancellation behaviours package

Maintains a dictionary object representing registered cancellation behaviours via their file
module. Once a cancellation behaviour is registered it should not be removed until the data is
cleaned; and [Important] House objects or Application objects might hold live objects of this
cancellation behaviour.
"""

from .cancellation_behaviour_A import BA

# Register all behaviours here
CANCELLATION_BEHAVIOURS = {
    'A': {'verbose': 'Cancellation behaviour A', 'cancellation_behaviour_file': BA}
}


def get_cancellation_behaviours():
    cancellation_behaviours = []
    # Since this method returns a tuple derived from a dictionary, the
    # structure needs to be consistent for the same data. This is resolved
    # by using `sorted` on the dictionary on the basis of its keys.
    for key in sorted(CANCELLATION_BEHAVIOURS):
        cancellation_behaviours.append((key, CANCELLATION_BEHAVIOURS[key]['verbose']))
    return tuple(cancellation_behaviours)


def get_cancellation_behaviour_description(key):
    return CANCELLATION_BEHAVIOURS[key]['cancellation_behaviour_file'].__doc__
