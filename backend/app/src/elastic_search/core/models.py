from elasticsearch.helpers import bulk, parallel_bulk
from elasticsearch.exceptions import NotFoundError
from elasticsearch_dsl import Document, Date, Integer

from elastic_search.core.settings import BULK_CHUNK_SIZE
from elastic_search.core.utils import connect


class _BaseManager(object):
    """
    Custom base manager for BaseModel
    """

    @staticmethod
    def _bulk_create(docs, parallel=False):
        """
        :param parallel:
        :param docs: list of objects of class `elasticsearch_dsl.Document`
        :return:
        """
        if parallel:
            parallel_bulk(connect(), (d.to_dict(True) for d in docs), chunk_size=BULK_CHUNK_SIZE)
        else:
            bulk(connect(), (d.to_dict(True) for d in docs), chunk_size=BULK_CHUNK_SIZE)

    @classmethod
    def bulk_create(cls, qs, parallel=False):
        """
        :param qs: django queryset
        :param parallel:
        :return:
        """
        cls._bulk_create([cls.parse_db_obj(db_obj) for db_obj in qs], parallel=parallel)

    @classmethod
    def create(cls, db_obj):
        connect()
        obj = cls.parse_db_obj(db_obj)
        cls.delete_by_ref(obj._get_obj_pk())
        obj.save()

    @classmethod
    def delete_by_ref(cls, val):
        connect()
        s = cls.find_by_ref(val)
        s.delete()

    @classmethod
    def parse_db_obj(cls, db_obj):
        """
        :param db_obj
        :return: cls object
        """
        return cls()

    @classmethod
    def find_by_ref(cls, val):
        connect()
        return cls.search().query('term', **{cls.REF_FIELD: val})

    @classmethod
    def init_from_dj(cls, qs, buffer_chunk_size=None, recreate=True):
        connect()
        print("Working with Document `%s`" % cls.__name__, flush=True)
        if recreate:
            try:
                cls._index.delete()
            except NotFoundError:
                pass
            cls.init()

        total = len(qs)
        print("Loading Data ... [%d objects]" % total, flush=True)

        if buffer_chunk_size:
            first = 0
            last = first + buffer_chunk_size
            while last + buffer_chunk_size < total:
                cls.bulk_create(qs=qs[first:last])
                print(
                    'Loading: %s%s %d%% [%d]    ' % (
                        "#" * int((last / total) * 100),
                        " " * int(((total - last) / total) * 100),
                        int((last / total) * 100),
                        last
                    ),
                    end='\r', flush=True
                )
                first = last
                last = first + buffer_chunk_size

            if total - last > 0:
                cls.bulk_create(qs=qs[last:total])
        else:
            cls.bulk_create(qs=qs)

        cls._index.refresh()
        total_recheck = cls._index.stats()['_all']['total']['docs']['count']
        print("\nSynchronisation for Document: `%s` ... Complete [%d objects]" % (cls.__name__, total_recheck), flush=True)


class BaseModel(Document, _BaseManager):
    """
    Custom base model for ES models to track records using a unique key.
    """
    obj_pk = Integer(required=True)
    create_time = Date(default_timezone='UTC')

    REF_FIELD = 'obj_pk'

    def _get_obj_pk(self):
        obj_pk = getattr(self, self.REF_FIELD)
        if not obj_pk:
            raise AssertionError("Object Argument Missing. ES DSL model object does not contain reference field."
                                 "Argument `%s`" % self.REF_FIELD)

        return obj_pk

    def find_delete_duplicates(self):
        self.delete_by_ref(self._get_obj_pk())

    class IndexInfo:
        index_this_model = False
