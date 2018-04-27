# Elastic Search global settings
# https://elasticsearch-dsl.readthedocs.io/en/latest/configuration.html
# http://elasticsearch-py.readthedocs.io/en/master/api.html#elasticsearch

DIR = 'elastic_search'

DATABASE_CONNECTION_INFO = {
    'hosts': ['localhost'],
    # 'PORT': None,
    # 'timeout': 100
}

INDEX_SETTINGS = {

}

INDEX_NAME_PREFIX = 'rentality'

BULK_CHUNK_SIZE = 10
