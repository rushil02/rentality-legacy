class InvalidHTTPResponseException(Exception):
    def __init__(self, response_data, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.response_data = response_data


class MethodNotAllowedException(Exception):
    pass