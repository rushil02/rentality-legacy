import hashlib

from elasticsearch.helpers import bulk
from elasticsearch_dsl import DocType, Keyword, Date, Integer

from elastic_search.core.settings import INDEX_NAME, BULK_CHUNK_SIZE
from elastic_search.core.utils import create_connection


class DuplicateHashError(Exception):
    message = "Duplicate hash detected in ElasticSearch DB. Hash already exists."


class BaseModel(DocType):
    obj_pk = Integer()
    create_time = Date()

    REF_FIELD = 'obj_pk'

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

    def delete_by_ref(self, val):
        s = self.search().query('term', **{self.REF_FIELD: val})
        s.delete()

    def find_delete_duplicates(self):
        self.delete_by_ref(getattr(self, self.REF_FIELD))

    class IndexInfo:
        index_this_model = False


class ModelHashed(BaseModel):
    inhash = Keyword()

    REF_FIELD = 'inhash'

    def __init__(self, *args, **kwargs):

        super(ModelHashed, self).__init__(*args, **kwargs)

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
                    block['val'] += str(value)
                return value

        build_block(kwargs)

        self.inhash = hashlib.sha512(block['val'].encode('utf-8')).hexdigest()
