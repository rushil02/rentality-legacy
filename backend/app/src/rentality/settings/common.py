import os
from dotenv import dotenv_values

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def get_env_var(var_name):
    """
    Common method to get environment variable irrespective of production (docker swarm) and development (docker-compose)
    WARNING: Do not use for runtime methods - inefficient retrieval process. Always use to load global or class variables.

    :param var_name: Environment variable key
    :return: value
    """
    def check_os():
        try:
            return os.environ[var_name]
        except KeyError:
            return None

    def check_secret_solo_file():
        filename = '/run/secrets/' + var_name
        if os.path.isfile(filename):
            with open(filename) as f:
                return f.read()
        else:
            return None

    def check_secret_web():
        secret_data = dotenv_values('/run/secrets/WEB_ENV')
        try:
            return secret_data[var_name]
        except KeyError:
            return None

    def check_secret_common():
        secret_data = dotenv_values('/run/secrets/COMM_ENV')
        try:
            return secret_data[var_name]
        except KeyError:
            return None

    check_list = [check_secret_web, check_secret_solo_file, check_secret_common, check_os]

    for fn in check_list:
        value = fn()
        if value is not None:
            return value
    raise KeyError
