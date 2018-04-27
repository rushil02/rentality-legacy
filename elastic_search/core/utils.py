import importlib
import inspect

from elasticsearch_dsl.connections import connections
from elasticsearch_dsl import Index

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
    return str(INDEX_NAME_PREFIX) + '_' + str(doc_name)


def create_index(doc_name):
    try:
        try:
            index_settings = INDEX_SETTINGS[doc_name]
        except KeyError:
            index_settings = {}
        create_connection()
        db = Index(get_index_name(doc_name))
        db.settings(**index_settings)
        db.create()
    except Exception as e:
        #  TODO: Activity Log
        raise Exception(e)
    else:
        return db


def get_index(doc_name):
    create_connection()
    db = Index(get_index_name(doc_name))
    if db.exists():
        return db
    else:
        return create_index(doc_name)


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
        doc_name = klass.Meta.doc_name
        try:
            client.indices.close(index=get_index_name(doc_name))
            index = get_index(doc_name)
            klass.init()
            client.indices.open(index=get_index_name(doc_name))
        except Exception as e:
            #  TODO: Activity Log
            raise Exception(e)


# Avoid using following method as ES doesn't handle deletions in a mapping and New(Changed on existing field)
# analyzer will produce errors.
# Only suitable for adding a new mapping or adding a new field in an existing mapping.
def update_mappings():
    create_mappings()
