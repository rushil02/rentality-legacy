import importlib
import inspect

from elasticsearch_dsl.connections import connections

from elastic_search.core.settings import *

ES_CONNECTION = connections.create_connection(**DATABASE_CONNECTION_INFO)


def create_connection():
    try:
        return ES_CONNECTION
    except Exception as e:
        #  TODO: Activity Log
        raise Exception(e)


def get_index_name(doc_name):
    if inspect.isclass(doc_name):
        return doc_name.__class__.__name__
    return ("%s_%s" % (INDEX_NAME_PREFIX, doc_name)).lower()


def get_mapping_classes():
    module = importlib.import_module(DIR + '.models')
    klasses = []
    for name, klass in inspect.getmembers(module, inspect.isclass):
        try:
            if klass.IndexInfo.index_this_model:
                klasses.append(klass)
        except AttributeError:
            continue
    return klasses


def create_mappings():
    client = create_connection()
    for klass in get_mapping_classes():
        try:
            if not klass._index.exists():
                klass.init()
        except Exception as e:
            #  TODO: Activity Log
            raise Exception(e)

# TODO: Update mappings mechanism required : Re-index mechanism
