from .assembly import BaseAssemblyModel


class AssemblyUserMixin(object):
    
    @classmethod
    def get_users(cls, id):
        response = cls.requests.get('{}/{}/users'.format(cls.api_endpoint, id))
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
        response = cls.requests.patch('{}/{}/penny_send'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    
    def verify_penny_amount(cls, id, amount_1, amount_2):
        data = {
            "amount_1": amount_1,
            "amount_2": amount_2
        }
        response = cls.requests.patch('{}/{}/penny_verify'.format(cls.api_endpoint, id), data=data)
        return cls.load_response_for_one_object(cls.response_header, response)


class AssemblyUser(BaseAssemblyModel):
    api_endpoint = 'users'
    response_header = 'users'
    allowed_methods = ['save', 'get_many', 'get_one', 'update']
    fields = [
        'id',
        'first_name',
        'email',
        'last_name',
        'mobile',
        'address_line1',
        'address_line2',
        'city',
        'state',
        'zip',
        'country',
        'dob',
        'government_number',
        'drivers_license_number',
        'drivers_license_state',
        'ip_address',
        'logo_url',
        'color_1',
        'color_2',
        'custom_descriptor'
    ]

    @classmethod
    def get_bank_account(cls, id):
        response = cls.requests.get('{}/{}/bank_accounts'.format(cls.api_endpoint, id))
        return BankAccount.load_response_for_one_object('bank_accounts', response)
    
    @classmethod
    def get_card_account(cls, id):
        response = cls.requests.get('{}/{}/card_accounts'.format(cls.api_endpoint, id))
        return CardAccount.load_response_for_one_object('card_accounts', response)
    
    @classmethod
    def get_paypal_account(cls, id):
        response = cls.requests.get('{}/{}/paypal_accounts'.format(cls.api_endpoint, id))
        return PayPalAccount.load_response_for_one_object('paypal_accounts', response)
    
    @classmethod
    def get_wallet_account(cls, id):
        response = cls.requests.get('{}/{}/wallet_accounts'.format(cls.api_endpoint, id))
        return WalletAccount.load_response_for_one_object('wallet_accounts', response)
    
    @classmethod
    def set_user_disbursement_account(cls, id, account_id):
        data = {
            'account_id': account_id
        }
        response = cls.requests.patch('{}/{}/disbursement_account'.format(cls.api_endpoint, id), data=data)
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def get_user_items(cls, id):
        response = cls.requests.get('{}/{}/items'.format(cls.api_endpoint, id))
        return Item.load_response_for_many_objects('items', response)
    
    @classmethod
    def set_verified(cls, id):
        response = cls.requests.patch('{}/{}?type=identity_verified'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)


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
        response = cls.requests.patch('{}/{}/verify'.format(cls.api_endpoint, id))
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
        response = cls.requests.get('{}/{}/buyers'.format(cls.api_endpoint, id))
        return AssemblyUser.load_response_for_one_object('users', response)
    
    @classmethod
    def get_charge_status(cls, id):
        response = cls.requests.get('{}/{}/status'.format(cls.api_endpoint, id))
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
        response = cls.requests.get('{}/{}/responses'.format(cls.api_endpoint, id))
        return cls.load_response_for_many_objects('callback_responses', response)
    
    @classmethod
    def get_responses(cls, id, response_id):
        response = cls.requests.get('{}/{}/responses/{}'.format(cls.api_endpoint, id, response_id))
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


class Item(BaseAssemblyModel):
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
        response = cls.requests.get('{}/{}/status'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def get_buyer(cls, id):
        response = cls.requests.get('{}/{}/buyers'.format(cls.api_endpoint, id))
        return AssemblyUser.load_response_for_one_object('users', response)
    
    @classmethod
    def get_seller(cls, id):
        response = cls.requests.get('{}/{}/sellers'.format(cls.api_endpoint, id))
        return AssemblyUser.load_response_for_one_object('users', response)
    
    @classmethod
    def get_fees(cls, id):
        response = cls.requests.get('{}/{}/fees'.format(cls.api_endpoint, id))
        return Fee.load_response_for_many_objects('fees', response)
    
    @classmethod
    def get_wire_details(cls, id):
        response = cls.requests.get('{}/{}/wire_details'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def get_bpay_details(cls, id):
        response = cls.requests.get('{}/{}/bpay_details'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def get_transactions(cls, id):
        response = cls.requests.get('{}/{}/transactions'.format(cls.api_endpoint, id))
        return Transaction.load_response_for_many_objects('transactions', response)
    
    @classmethod
    def get_batch_transactions(cls, id):
        response = cls.requests.get('{}/{}/batch_transactions'.format(cls.api_endpoint, id))
        return Transaction.load_response_for_many_objects('batch_transactions', response)
    
    @classmethod
    def request_payment(cls, id):
        response = cls.requests.patch('{}/{}/request_payment'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def make_payment(cls, id, account_id , ip_address, device_id):
        data = {
            'account_id': account_id,
            'ip_address': ip_address,
            'device_id': device_id
        }
        response = cls.requests.patch('{}/{}/make_payment'.format(cls.api_endpoint, id), data=data)
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def request_release(cls, id, release_amount):
        data = {
            'release_amount': release_amount
        }
        response = cls.requests.patch('{}/{}/request_release'.format(cls.api_endpoint, id), data=data)
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def release_payment(cls, release_amount, flag_release):
        data = {
            'release_amount': release_amount,
            'flag_release': flag_release
        }
        response = cls.requests.patch('{}/{}/release_payment'.format(cls.api_endpoint, id), data=data)
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def request_refund(cls, id, refund_amount, refund_message):
        data = {
            'refund_amount': refund_amount,
            'refund_message': refund_message
        }
        response = cls.requests.patch('{}/{}/request_refund'.format(cls.api_endpoint, id), data=data)
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def refund(cls, id, refund_amount, refund_message):
        data = {
            'refund_amount': refund_amount,
            'refund_message': refund_message
        }
        response = cls.requests.patch('{}/{}/refund'.format(cls.api_endpoint, id), data=data)
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def decline_refund(cls, id):
        response = cls.requests.patch('{}/{}/decline_refund'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    

    @classmethod
    def raise_dispute(cls, id, user_id):
        data = {
            'user_id': user_id
        }
        response = cls.requests.patch('{}/{}/raise_dispute'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def request_dispute_resolution(cls, id, user_id, dispute_message):
        data = {
            'user_id': user_id,
            'dispute_message': dispute_message
        }
        response = cls.requests.patch('{}/{}/request_resolve_dispute'.format(cls.api_endpoint, id), data=data)
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def resolve_dispute(cls, id, user_id, dispute_message):
        data = {
            'user_id': user_id,
            'dispute_message': dispute_message
        }
        response = cls.requests.patch('{}/{}/resolve_dispute'.format(cls.api_endpoint, id), data=data)
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def escalate_dispute(cls, id, user_id, dispute_message):
        data = {
            'user_id': user_id,
            'dispute_message': dispute_message
        }
        response = cls.requests.patch('{}/{}/escalate_dispute'.format(cls.api_endpoint, id), data=data)
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def acknowledge_wire_transfer(cls, id):
        response = cls.requests.patch('{}/{}/acknowledge_wire'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def revert_wire_transfer(cls, id):
        response = cls.requests.patch('{}/{}/revert_wire'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def cancel(cls, id):
        response = cls.requests.patch('{}/{}/cancel'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def send_tax_invoice(cls, id):
        response = cls.requests.patch('{}/{}/send_tax_invoice'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def request_tax_invoice(cls, id):
        response = cls.requests.patch('{}/{}/request_tax_invoice'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def authorize_payment(cls, id, account_id):
        data = {
            'account_id': account_id
        }
        response = cls.requests.patch('{}/{}/authorize_payment'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def capture_payment(cls, id):
        response = cls.requests.patch('{}/{}/capture_payment'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def void_payment(cls, id):
        response = cls.requests.patch('{}/{}/void_payment'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)


class Marketplace(BaseAssemblyModel):
    api_endpoint = 'marketplace'
    response_header = 'marketplaces'
    allowed_methods = ['get']


class TokenAuth(BaseAssemblyModel):
    api_endpoint = 'token_auths'
    response_header = 'token_auth'
    allowed_methods = ['save']
    fields = [
        'token_type',
        'user_id'
    ]


class Transaction(AssemblyUserMixin, BaseAssemblyModel):
    api_endpoint = 'transactions'
    response_header = 'transactions'
    allowed_methods = ['get_many', 'get_one', ]

    @classmethod
    def get_fees(cls, id):
        response = cls.requests.get('{}/{}/fees'.format(cls.api_endpoint, id))
        return Fee.load_response_for_one_object('fees', response)
    
    @classmethod
    def get_wallet_accounts(cls, id):
        response = cls.requests.get('{}/{}/wallet_accounts'.format(cls.api_endpoint, id))
        return WalletAccount.load_response_for_one_object('wallet_accounts', response)
    
    @classmethod
    def get_bank_accounts(cls, id):
        response = cls.requests.get('{}/{}/bank_accounts'.format(cls.api_endpoint, id))
        return cls.load_response_for_one_object(cls.response_header, response)
    
    @classmethod
    def get_card_accounts(cls, id):
        response = cls.requests.get('{}/{}/card_accounts'.format(cls.api_endpoint, id))
        return CardAccount.load_response_for_one_object('card_accounts', response)
    
    @classmethod
    def get_paypal_accounts(cls, id):
        response = cls.requests.get('{}/{}/paypal_accounts'.format(cls.api_endpoint, id))
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
        response = cls.requests.post('{}/{}/withdraw'.format(cls.api_endpoint, id), data=data)
        return Disbursement.load_response_for_one_object('disbursements', response)
    
    @classmethod
    def deposit(cls, id, account_id, amount):
        data = {
            'account_id': account_id,
            'amount': amount
        }
        response = cls.requests.post('{}/{}/deposit'.format(cls.api_endpoint, id), data=data)
        return Disbursement.load_response_for_one_object('disbursements', response)


class Disbursement(BaseAssemblyModel):
    pass


class Configuration(BaseAssemblyModel):
    api_endpoint = 'configurations'
    response_header = 'feature_configurations'
    allowed_methods = ['save', 'get_many', 'get_one', 'update', 'delete']
    fields = [
        'name',
        'enabled',
        'user_id',
        'country',
        'item_id',
        'options',
        'min',
        'max'
    ]


class PaymentRestriction(BaseAssemblyModel):
    api_endpoint = 'payment_restrictions'
    response_header = 'payment_restrictions'
    allowed_methods = ['get_many', 'get_one']


class Tools(BaseAssemblyModel):
    api_endpoint = 'status'
    response_header = None
    allowed_methods = ['get']