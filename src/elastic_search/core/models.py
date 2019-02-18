
from elasticsearch.helpers import bulk
from elasticsearch_dsl import Document, Date, Integer

from elastic_search.core.settings import BULK_CHUNK_SIZE
from elastic_search.core.utils import create_connection, get_index_name


class BaseModel(Document):
    obj_pk = Integer(required=True)
    create_time = Date(default_timezone='UTC')

    REF_FIELD = 'obj_pk'

    @staticmethod
    def bulk_create(docs):
        """
        :param docs: list of objects of class self
        :return:
        """
        bulk(create_connection(), (d.to_dict(True) for d in docs), chunk_size=BULK_CHUNK_SIZE)

    def delete_by_ref(self, val):
        s = self.search().query('term', **{self.REF_FIELD: val})
        s.delete()

    def find_delete_duplicates(self):
        self.delete_by_ref(getattr(self, self.REF_FIELD))

    class IndexInfo:
        index_this_model = False

    def __init__(self, *args, **kwargs):
        if self.REF_FIELD:
            try:
                kwargs[self.REF_FIELD]
            except KeyError:
                raise AssertionError("Argument Missing. ES DSL model object does not contain reference field."
                                     " Initialize with argument `%s`" % self.REF_FIELD)
        super(BaseModel, self).__init__(*args, **kwargs)


