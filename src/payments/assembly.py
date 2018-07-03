from .util import AuthorizationInterface, BaseRequest
from .exceptions import MethodNotAllowedException
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
    allowed_methods = ['get_one', 'get_many']
    api_verbose = ''

    @classmethod
    def check_for_allowed_methods(klass, method_name):
        if method_name not in klass.allowed_methods:
            raise MethodNotAllowedException

    @classmethod
    def load_response_for_one_object(klass, response):
        data = response.get(klass.api_endpoint, dict())
        obj = klass()
        for key, value in data.items():
            setattr(obj, key, value)
        return obj

    @classmethod
    def get_one(klass, id):
        klass.check_for_allowed_methods('get_one')
        try:
            response = klass.requests.get(f'{klass.api_endpoint}/{id}')
        except InvalidHTTPResponseException as e:
            response = e.args[0]
            return response
        else:
            return klass.load_response_for_one_object(response)


class Address(BaseAssemblyModel):
    api_endpoint = 'addresses'
    allowed_methods = ['get_one']