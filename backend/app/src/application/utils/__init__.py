# All Possible Application states
STATUS_CHOICES = (
    ('I', 'Incomplete'),
    ('P', 'Pending'),
    ('L', 'Pending Locked'),
    ('A', 'Accepted'),
    ('D', 'Declined'),
    ('E', 'Error'),
    ('B', 'Booked'),
    ('C', 'Cancelled'),
    ('O', 'In-Effect/In-Stay'),
    ('Z', 'Complete'),
    ('X', 'In-Dispute'),
    ('F', 'In-Dispute Locked'),
    ('R', 'Dispute Resolved'),
)


def get_state_reverse_map():
    res = {'_no_app_': None}
    for choice_set in STATUS_CHOICES:
        res[choice_set[1]] = choice_set[0]
    return res


STATE_REVERSE_MAP_FOR_DB = get_state_reverse_map()

# Statuses that bind Application to house, ie. effectively associating a
# unique relationship with the house for given date range.
# This will impact all functionality in relation to calculating availability
# of a house.
APP_BINDING_STATES = ['L', 'A', 'B', 'O', 'Z', 'F']

# All Actors possible on an application
ACTOR_CHOICES = (
    ('T', "Tenant"),
    ('H', "Homeowner"),
    ('A', "Staff"),
    ('S', "System")
)


def get_actor_reverse_map():
    res = {}
    for choice_set in ACTOR_CHOICES:
        res[choice_set[1]] = choice_set[0]
        res[choice_set[1].lower()] = choice_set[0]
    return res


ACTOR_REVERSE_MAP_FOR_DB = get_actor_reverse_map()
