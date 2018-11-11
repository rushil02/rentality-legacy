from abc import abstractmethod
import requests
from .exceptions import InvalidHTTPResponseException


class AuthorizationInterface(object):
    @abstractmethod
    def get_base_url():
        raise NotImplementedError
    
    def get_auth_credentials():
        raise NotImplementedError


class BaseRequest(AuthorizationInterface):
    def __init__(self, *args, **kwargs):
        self.base_url = super().get_base_url()
        self.auth_credentials = super().get_auth_credentials()
    
    def __execute_request(self, action, path, **kwargs):
        try:
            r = action(self.base_url + path, auth=self.auth_credentials, **kwargs)
            r.raise_for_status()
            return r.json()
        except requests.exceptions.HTTPError as e:
            #TODO: Exception Handling
            raise InvalidHTTPResponseException(r.json())
        except requests.exceptions.RequestException as e:
            #TODO: Exception Handling
            raise e

    def get(self, path, params=None):
        return self.__execute_request(requests.get, path, params=params)
    
    def post(self, path, data=None):
        return self.__execute_request(requests.post, path, json=data)
    
    def patch(self, path, data=None):
        return self.__execute_request(requests.patch, path, json=data)
    
    def delete(self, path):
        return self.__execute_request(requests.delete, path)