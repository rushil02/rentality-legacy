import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def get_env_var(var_name):
    try:
        var = os.environ[var_name]
    except Exception as e:
        raise e
    return var
