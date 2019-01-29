from billing.utils.fee_models.model_A import FeeModel as FeeModelA

BILLING_FEE_MODELS = {
    'A': {'verbose': '4 weeks of payment only', 'model': FeeModelA},
}


def get_available_models():
    models = []
    for key in BILLING_FEE_MODELS:
        models.append((key, BILLING_FEE_MODELS[key]['verbose']))
    return tuple(models)


def fee_calculator(application):
    return BILLING_FEE_MODELS[application.fee.billing_model]['model'](application)
