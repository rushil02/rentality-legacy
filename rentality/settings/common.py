import json
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

SECRET_JSON_FILE = os.path.join(BASE_DIR, 'rentality', 'secret_var.json')


def get_secret_var(var_name):
    data = json.load(open(SECRET_JSON_FILE))
    return data[var_name]

