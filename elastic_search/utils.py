import importlib
import inspect

from elasticsearch_dsl.connections import connections
from elasticsearch_dsl import Index, DocType

from elastic_search.settings import *

ES_CONNECTION = connections.create_connection(**DATABASE_CONNECTION_INFO)


def create_connection():
    try:
        return ES_CONNECTION
    except Exception as e:
        #  TODO: Activity Log
        raise Exception(e)


def create_index():
    try:
        create_connection()
        db = Index(INDEX_NAME)
        db.settings(**INDEX_SETTINGS)
        db.create()
    except Exception as e:
        #  TODO: Activity Log
        raise Exception(e)
    else:
        return db


def get_index():
    create_connection()
    db = Index(INDEX_NAME)
    if db.exists():
        return db
    else:
        return create_index()


def get_mapping_classes():
    module = importlib.import_module('models')
    klasses = []
    for name, obj in inspect.getmembers(module, inspect.isclass):
        if DocType in obj.__bases__:
            klasses.append(name)
    return klasses


def create_mappings():
    client = create_connection()
    index = get_index()
    client.indices.close(index=INDEX_NAME)
    for klass in get_mapping_classes():
        try:
            if not index.exists_type(doc_type=klass.__name__):
                klass.init()
        except Exception as e:
            #  TODO: Activity Log
            raise Exception(e)
    client.indices.open(index=INDEX_NAME)


# Avoid using following method as ES doesn't handle deletions in a mapping and New(Changed on existing field)
# analyzer will produce errors.
# Only suitable for adding a new mapping or adding a new field in an existing mapping.
def update_mappings():
    client = create_connection()
    client.indices.close(index=INDEX_NAME)
    for klass in get_mapping_classes():
        try:
            klass.init()
        except Exception as e:
            #  TODO: Activity Log
            pass

    #  TODO: Activity Log
    client.indices.open(index=INDEX_NAME)
