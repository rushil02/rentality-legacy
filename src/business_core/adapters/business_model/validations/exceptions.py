class ConstraintError(Exception):
    """
    Custom Exception when constraints are not met.
    :param message
    :param errors - List of error messages
    """
    def __init__(self, message, errors):
        super().__init__(message)
        self.errors = errors