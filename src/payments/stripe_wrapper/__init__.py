import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

def execute_request(request, *args, **kwargs):
    try:
        # Use Stripe's library to make requests...
        return request(*args, **kwargs)
    except stripe.error.CardError as e:
        # Since it's a decline, stripe.error.CardError will be caught
        body = e.json_body
        err  = body.get('error', {})

        print("Status is: {}".format(e.http_status))
        print("Type is: {}".format(err.get('type')))
        print("Code is: {}".format(err.get('code')))
        # param is '' in this case
        print("Param is: {}".format(err.get('param')))
        print("Message is: {}".format(err.get('message')))
    except stripe.error.RateLimitError as e:
        # Too many requests made to the API too quickly
        pass
    except stripe.error.InvalidRequestError as e:
        # Invalid parameters were supplied to Stripe's API
        pass
    except stripe.error.AuthenticationError as e:
        # Authentication with Stripe's API failed
        # (maybe you changed API keys recently)
        pass
    except stripe.error.APIConnectionError as e:
        # Network communication with Stripe failed
        pass
    except stripe.error.StripeError as e:
        # Display a very generic error to the user, and maybe send
        # yourself an email
        pass
    except Exception as e:
        # Something else happened, completely unrelated to Stripe
        pass


def create_account(country, account_type='custom'):
    return execute_request(stripe.Account.create, country=country, type=account_type)


def get_account(id):
    return execute_request(stripe.Account.retrieve, id)