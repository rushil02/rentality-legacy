import importlib
import inspect
import time

from elasticsearch import TransportError
from elasticsearch_dsl.connections import connections

from elastic_search.core.settings import *


# FIXME: remove this, and make check on docker end
def establish_es_connection(try_num=1):
    try:
        connection_obj = connections.create_connection(**DATABASE_CONNECTION_INFO)
    except TransportError as e:
        if try_num <= CONNECTION_MAX_TRIES:
            print("Trying to connect to ElastiSearch; Waiting %s seconds for it to start." % CONNECTION_WAIT_TIME)
            time.sleep(CONNECTION_WAIT_TIME)
            connection_obj = establish_es_connection(try_num + 1)
        else:
            raise e
    return connection_obj


ES_CONNECTION = establish_es_connection()


def create_connection():
    # TODO: needs testing where the connection might close itself unexpectedly
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


def recreate_indexes():
    client = create_connection()
    for klass in get_mapping_classes():
        try:
            klass.init()
        except Exception as e:
            #  TODO: Activity Log
            raise Exception(e)

# TODO: no mechanism to remove dangling indexes
# TODO: Update mappings mechanism required : Re-index mechanism
