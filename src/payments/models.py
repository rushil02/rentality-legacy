from .assembly import BaseAssemblyModel


class AssemblyUserMixin(object):
    
    @classmethod
    def get_users(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/users')
        return AssemblyUser.load_response_for_one_object('users', response)


class Address(BaseAssemblyModel):
    api_endpoint = 'addresses'
    allowed_methods = ['get_one']
    response_header = 'addresses'


class BankAccount(AssemblyUserMixin, BaseAssemblyModel):
    api_endpoint = 'bank_accounts'
    response_header = 'bank_accounts'
    allowed_methods = ['get_one', 'save', 'delete']
    fields = [
        'user_id', 
        'bank_name', 
        'account_name', 
        'routing_number',
        'account_number',
        'account_type',
        'holder_type',
        'country',
        'currency',
        'payout_currency'
    ]

    @classmethod
    def send_penny_amount(cls, id):
        response = cls.requests.patch(f'{cls.api_endpoint}/{id}/penny_send')
        return cls.load_response_for_one_object(cls.response_header, response)
    
    def verify_penny_amount(cls, id, amount_1, amount_2):
        data = {
            "amount_1": amount_1,
            "amount_2": amount_2
        }
        response = cls.requests.patch(f'{cls.api_endpoint}/{id}/penny_verify', data=data)
        return cls.load_response_for_one_object(cls.response_header, response)


class AssemblyUser(BaseAssemblyModel):
    pass


class RoutingNumber(BaseAssemblyModel):
    api_endpoint = '/tools/routing_number'
    response_header = 'routing_number'
    allowed_methods = ['get']


class CardAccount(AssemblyUserMixin, BaseAssemblyModel):
    api_endpoint = 'card_accounts'
    response_header = 'card_accounts'
    allowed_methods = ['save', 'get_one', 'delete']
    fields = [
        'user_id',
        'full_name',
        'number',
        'expiry_month',
        'expiry_year',
        'cvv'
    ]

    @classmethod
    def verify(cls, id):
        response = cls.requests.patch(f'{cls.api_endpoint}/{id}/verify')
        return cls.load_response_for_one_object(cls.response_header, response)


class PayPalAccount(AssemblyUserMixin, BaseAssemblyModel):
    api_endpoint = 'paypal_accounts'
    response_header = 'paypal_accounts'
    allowed_methods = ['save', 'get_one', 'delete']
    fields = [
        'user_id',
        'paypal_email',
        'pay_in'
    ]


class Charge(BaseAssemblyModel):
    api_endpoint = 'charges'
    response_header = 'charges'
    allowed_methods = ['save', 'get_many', 'get_one']
    fields = [
        'account_id',
        'name',
        'amount',
        'email',
        'zip',
        'country',
        'user_id',
        'fee_ids',
        'currency',
        'retain_account',
        'device_id',
        'ip_address',
        'custom_descriptor'
    ]

    @classmethod
    def get_buyer(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/buyers')
        return AssemblyUser.load_response_for_one_object('users', response)
    
    @classmethod
    def get_charge_status(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/status')
        return cls.load_response_for_one_object(cls.response_header, response)


class BatchTransaction(BaseAssemblyModel):
    api_endpoint = 'batch_transactions'
    response_header = 'batch_transactions'
    allowed_methods = ['get_many', 'get_one']


class Callback(BaseAssemblyModel):
    api_endpoint = 'callbacks'
    response_header = 'callbacks'
    allowed_methods = ['save', 'get_many', 'get_one', 'update', 'delete']
    fields = [
        'description',
        'url',
        'object_type',
        'enabled'
    ]

    @classmethod
    def get_responses(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/responses')
        return cls.load_response_for_many_objects('callback_responses', response)
    
    @classmethod
    def get_responses(cls, id, response_id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/responses/{response_id}')
        return cls.load_response_for_one_object('callback_responses', response)


class Company(BaseAssemblyModel):
    api_endpoint = 'companies'
    response_header = 'companies'
    allowed_methods = ['save', 'get_many', 'get_one', 'update']
    fields = [
        'name',
        'legal_name',
        'user_id',
        'tax_number',
        'charge_tax',
        'address_line1',
        'address_line2',
        'city',
        'state',
        'zip',
        'country',
        'phone'
    ]


class DirectDebitAuthority(BaseAssemblyModel):
    api_endpoint = 'direct_debit_authorities'
    response_header = 'direct_debit_authorities'
    allowed_methods = ['get_many', 'get_one', 'delete']

    @classmethod
    def get_many(cls, account_id , **params):
        params['account_id'] = account_id
        return super().get_many(**params)


class Fee(BaseAssemblyModel):
    api_endpoint = 'fees'
    response_header = 'fees'
    allowed_methods = ['save', 'get_many', 'get_one']
    fields = [
        'name',
        'fee_type_id',
        'amount',
        'cap',
        'min',
        'max',
        'to'
    ]


class Items(BaseAssemblyModel):
    api_endpoint = 'items'
    response_header = 'items'
    allowed_methods = ['save', 'get_many', 'get_one', 'update', 'delete']
    fields = [
        'id',
        'name',
        'amount',
        'currency',
        'payment_type',
        'buyer_id',
        'seller_id',
        'fee_ids',
        'description',
        'buyer_url',
        'seller_url',
        'tax_invoice',
        'due_date',
        'custom_descriptor'
    ]

    @classmethod
    def get_status(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/status')
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def get_buyer(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/buyers')
        return AssemblyUser.load_response_for_one_object('users', response)
    
    @classmethod
    def get_seller(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/sellers')
        return AssemblyUser.load_response_for_one_object('users', response)
    
    @classmethod
    def get_fees(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/fees')
        return Fee.load_response_for_many_objects('fees', response)
    
    @classmethod
    def get_wire_details(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/wire_details')
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def get_bpay_details(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/bpay_details')
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def get_transactions(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/transactions')
        return Transaction.load_response_for_many_objects('transactions', response)
    
    @classmethod
    def get_batch_transactions(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/batch_transactions')
        return Transaction.load_response_for_many_objects('batch_transactions', response)


class Transaction(AssemblyUserMixin, BaseAssemblyModel):
    api_endpoint = 'transactions'
    response_header = 'transactions'
    allowed_methods = ['get_many', 'get_one', ]

    @classmethod
    def get_fees(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/fees')
        return Fee.load_response_for_one_object('fees', response)
    
    @classmethod
    def get_wallet_accounts(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/wallet_accounts')
        return WalletAccount.load_response_for_one_object('wallet_accounts', response)
    
    @classmethod
    def get_bank_accounts(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/bank_accounts')
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def get_card_accounts(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/card_accounts')
        return CardAccount.load_response_for_one_object('card_accounts', response)
    
    @classmethod
    def get_paypal_accounts(cls, id):
        response = cls.requests.get(f'{cls.api_endpoint}/{id}/paypal_accounts')
        return PayPalAccount.load_response_for_one_object('paypal_accounts', response)


class WalletAccount(AssemblyUserMixin, BaseAssemblyModel):
    api_endpoint = 'wallet_accounts'
    response_header = 'wallet_accounts'
    allowed_methods = ['get_one']

    @classmethod
    def withdraw(cls, id, account_id, amount):
        data = {
            'account_id': account_id,
            'amount': amount
        }
        response = cls.requests.post(f'{cls.api_endpoint}/{id}/withdraw', data=data)
        return Disbursements.load_response_for_one_object('disbursements', response)
    
    @classmethod
    def deposit(cls, id, account_id, amount):
        data = {
            'account_id': account_id,
            'amount': amount
        }
        response = cls.requests.post(f'{cls.api_endpoint}/{id}/deposit', data=data)
        return Disbursements.load_response_for_one_object('disbursements', response)


class Disbursements(BaseAssemblyModel):
    pass
