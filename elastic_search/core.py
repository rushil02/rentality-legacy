import hashlib

from elasticsearch.helpers import bulk

from elasticsearch_dsl import DocType, Keyword, Date

from elastic_search.settings import INDEX_NAME, BULK_CHUNK_SIZE
from elastic_search.utils import create_connection


class DuplicateHashError(Exception):
    message = "Duplicate hash detected in ElasticSearch DB. Hash already exists."


class Model(DocType):
    create_time = Date()

    error_count = 0

    class Meta:
        index = INDEX_NAME

    @staticmethod
    def bulk_create(docs):
        bulk(create_connection(), (d.to_dict(True) for d in docs), chunk_size=BULK_CHUNK_SIZE)

    @staticmethod
    def _decode(value):
        try:
            return str(value, 'utf-8', 'ignore')
        except TypeError:
            return None


def get_res_count(es, hash_val):
    body = {
        "query": {
            "constant_score": {
                "filter": {
                    "term": {
                        "inhash": hash_val
                    }
                }
            }
        }
    }
    res = es.search(
        index=INDEX_NAME,
        body=body,
    )
    return res['hits']['total']


def check_duplicate(es, hash_val):
    if get_res_count(es, hash_val) == 0:
        return True
    else:
        return False


class ModelHashed(Model):
    inhash = Keyword()

    def __init__(self, *args, **kwargs):
        block = {'val': ''}

        def build_block(value):
            if type(value) is dict:
                for val in value:
                    value[val] = build_block(value[val])
            elif type(value) in (list, tuple):
                for val in value:
                    build_block(val)
            else:
                if value:
                    block['val'] += value
                return value

        build_block(kwargs)

        kwargs['inhash'] = hashlib.sha512(block['val']).hexdigest()

        if check_duplicate(create_connection(), kwargs['inhash']):
            self.__class__.error_count = 0
            super(ModelHashed, self).__init__(*args, **kwargs)
        else:
            raise DuplicateHashError
