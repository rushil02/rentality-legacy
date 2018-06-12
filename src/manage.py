#!/usr/bin/env python
import os
import sys


def set_env():
    try:
        from rentality import env
    except ImportError as e:
        raise ImportError(
            "'env.py' file containing the required environment "
            "variables is missing. Please add it to '/rentality/'"
        )
    else:
        for key, value in vars(env).items():
            if key.startswith('set__'):
                os.environ[key.lstrip('set__')] = value


if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "rentality.settings")
    set_env()
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        )
    execute_from_command_line(sys.argv)
