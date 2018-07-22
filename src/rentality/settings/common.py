import os
from dotenv import dotenv_values

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def get_env_var(var_name):
    try:
        filename = '/run/secrets/' + var_name
        if os.path.isfile(filename):
            with open(filename) as f:
                return f.read()
        else:
            raise FileNotFoundError
    except:
        try:
            secret_data = dotenv_values('/run/secrets/flask_secret')
            return secret_data[var_name]
        except:
            return os.environ[var_name]
