import importlib
import inspect
import time

from elasticsearch import TransportError
from elasticsearch_dsl.connections import connections

from elastic_search.core.settings import *


def establish_es_connection():
    try:
        connection_obj = connections.create_connection(**DATABASE_CONNECTION_INFO)
    except TransportError as e:
        print("***** WARNING: Connection to ElasticSearch Failed ***** \n%s" % e)
        return
    else:
        return connection_obj


# Creates a singleton object of connection to transport layer [Paradigm support by elasticsearch-py creator - HonzaKral]
# https://github.com/elastic/elasticsearch-py/issues/223#issuecomment-96199719
# https://github.com/elastic/elasticsearch-py/issues/372#issuecomment-192025509
# Make sure that global - ES_CONNECTION is loaded with django
ES_CONNECTION = establish_es_connection()


def connect():
    global ES_CONNECTION
    if ES_CONNECTION is not None:
        return ES_CONNECTION
    else:
        print("Connecting to ElasticSearch ...")
        ES_CONNECTION = establish_es_connection()
        if ES_CONNECTION is not None:
            return ES_CONNECTION

        try_num = 0
        while try_num < CONNECTION_MAX_TRIES and ES_CONNECTION is None:
            try_num += 1
            print("Retrying (%s) in %s seconds - Wait for ES to start." % (try_num, CONNECTION_WAIT_TIME))
            time.sleep(CONNECTION_WAIT_TIME)
            ES_CONNECTION = establish_es_connection()
            if ES_CONNECTION is not None:
                return ES_CONNECTION

        raise AssertionError("Failed to connect with ElasticSearch")


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


# TODO: no mechanism to remove dangling indexes
# TODO: Update mappings mechanism required : Re-index mechanism
