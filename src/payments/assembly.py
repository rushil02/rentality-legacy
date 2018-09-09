from .util import AuthorizationInterface, BaseRequest
from .exceptions import MethodNotAllowedException, InvalidHTTPResponseException
from django.conf import settings
import base64


class AssemblyAuthorization(AuthorizationInterface):
    def get_base_url(self):
        if getattr(settings, "ASSEMBLY_PAYMENTS_IS_PROD", False) and not settings.DEBUG :
            return 'https://secure.api.promisepay.com/'
        else:
            return 'https://test.api.promisepay.com/'
            # return 'http://flask:5000/'
    
    def get_auth_credentials(self):
        return (settings.ASSEMBLY_PAYMENTS_KEY, settings.ASSEMBLY_PAYMENTS_SECRET)


class AssemblyRequest(BaseRequest, AssemblyAuthorization):
    pass


class BaseAssemblyModel(object):
    requests = AssemblyRequest()
    api_endpoint = ''
    response_header = ''
    allowed_methods = ['get_one', 'get_many']
    fields = []

    def __init__(self, *args, **kwargs):
        for field in self.fields:
            setattr(self, field, kwargs.get(field, ''))

    @classmethod
    def check_for_allowed_methods(cls, method_name):
        if method_name not in cls.allowed_methods:
            raise MethodNotAllowedException

    @classmethod
    def load_response_for_one_object(cls, key, response):
        if key:
            data = response.get(key, dict())
        else:
            data = response
        obj = cls()
        for key, value in data.items():
            setattr(obj, key, value)
        return obj

    @classmethod
    def load_response_for_many_objects(cls, key, response):
        if key:
            data = response.get(key, list())
        else:
            data = response
        
        objs = []
        for new_obj in data:
            obj = cls()
            for key, value in new_obj.items():
                setattr(obj, key, value)
            objs.append(obj)
        return objs

    @classmethod
    def get_one(cls, id):
        cls.check_for_allowed_methods('get_one')
        response = cls.requests.get('{}/{}'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def get_many(cls, **params):
        cls.check_for_allowed_methods('get_many')
        response = cls.requests.get(cls.api_endpoint, params=params)
        return cls.load_response_for_many_objects(cls.response_header, response)
    
    def get_field_data(self):
        data = dict()
        for field in self.fields:
            data[field] = getattr(self, field)
        return data

    def save(self):
        type(self).check_for_allowed_methods('save')
        data = self.get_field_data()
        response = self.requests.post('{}/'.format(self.api_endpoint), data)
        return type(self).load_response_for_one_object(self.response_header, response)
    
    @classmethod
    def delete(cls, id):
        cls.check_for_allowed_methods('delete')
        response = cls.requests.delete('{}/{}'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(None, response)
    
    @classmethod
    def get(cls):
        cls.check_for_allowed_methods('get')
        response = cls.requests.get(cls.api_endpoint)
        return cls.load_response_for_one_object(cls.response_header, response)
    
    def update(self):
        type(self).check_for_allowed_methods('update')
        data = self.get_field_data()
        response = self.requests.patch('{}/{}'.format(self.api_endpoint, getattr(self, 'id')), data)
        return type(self).load_response_for_one_object(self.response_header, response)