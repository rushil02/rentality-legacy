"""
Base file to describe the Business constraints expected by the system. It lists all the classes
and methods that will be explicitly called by rest of the system.
"""

from abc import ABC, abstractmethod


class ConstraintsModelBase(ABC):

    def __init__(self):
        pass
