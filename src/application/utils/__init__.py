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

# Statuses that bind Application to house, ie. effectively associating a
# unique relationship with the house for given date range.
# This will impact all functionality in relation to calculating availability
# of a house.
APP_BINDING_STATES = ['L', 'A', 'B', 'O', 'Z', 'F']
