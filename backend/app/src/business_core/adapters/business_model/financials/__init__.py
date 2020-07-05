import inspect

from .models.fin_model_one_one import FinModeOneOne

# Register all models here
MODELS = {
    'A': {'verbose': 'Financial Model 1.1', 'model_class': FinModeOneOne}
}


def get_financial_models():
    models = []
    for key in sorted(MODELS):
        models.append((key, MODELS[key]['verbose']))
    return tuple(models)


def get_financial_model_description(key):
    return inspect.getdoc(MODELS[key]['model_class'])


def get_financial_model_class(key):
    return MODELS[key]['model_class']
