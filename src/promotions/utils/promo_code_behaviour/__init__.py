from billing.utils.fee_models import model_A

# Register all models here
PROMO_CODE_MODELS = {
    'A': {'verbose': 'Percentage Discount', 'model_file': model_A},
}


def get_models():
    models = []
    for key in PROMO_CODE_MODELS:
        models.append((key, PROMO_CODE_MODELS[key]['verbose']))
    return tuple(models)
