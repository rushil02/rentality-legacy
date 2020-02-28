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
    try:
        # This case will work for docker-swarm configuration, where secrets
        # are loaded into each container's environment.
        return os.environ[var_name]
    except KeyError:
        # A Key error will occur and the variable will be searched in the
        # '/run/secrets/' folder in the following order.
        try:
            filename = '/run/secrets/' + var_name
            if os.path.isfile(filename):
                with open(filename) as f:
                    return f.read()
            else:
                raise FileNotFoundError
        except FileNotFoundError:
            try:
                secret_data = dotenv_values('/run/secrets/WEB_ENV')
                return secret_data[var_name]
            except KeyError:
                secret_data = dotenv_values('/run/secrets/PUBLIC_KEYS')
                return secret_data[var_name]
