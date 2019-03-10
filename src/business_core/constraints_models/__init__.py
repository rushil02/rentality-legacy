"""
Business constraints models package

Maintains a dictionary object representing registered constraints models via their file
module. Once a constraints model is registered it should not be removed until the data is
cleaned; and [Important] House objects or Application objects might hold live
objects of this constraints model.

Example of handled data and behaviour -
    - Minimum length of booking
    - Rent is calculated per day
    - Maximum buffer for advanced booking
    - Minimum buffer for advanced booking
    - Booking is calculated per night (not per day), therefore check-out date is not included
    - Mandatory one-day buffer between consecutive booking on the same house, therefore
      check-out date of Booking 'A' and check-in date of booking 'B' cannot be onn the same day.
"""

from . import constraints_model_A

# Register all models here
CONSTRAINTS_MODELS = {
    'A': {'verbose': 'Business Constraints A', 'constraints_model_file': constraints_model_A}
}


def get_constraints_models():
    constraints_models = []
    for key in CONSTRAINTS_MODELS:
        constraints_models.append((key, CONSTRAINTS_MODELS[key]['verbose']))
    return tuple(constraints_models)


def get_constraints_model_description(key):
    return CONSTRAINTS_MODELS[key]['constraints_model_file'].__doc__


def get_constraints_model_class(key):
    return CONSTRAINTS_MODELS[key]['constraints_model_file'].ConstraintsModel
