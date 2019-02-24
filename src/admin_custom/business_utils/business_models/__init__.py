# Register all models here
BILLING_FEE_MODELS = {

}


def get_available_models():
    models = []
    for key in BILLING_FEE_MODELS:
        models.append((key, BILLING_FEE_MODELS[key]['verbose']))
    return tuple(models)
