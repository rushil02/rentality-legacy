# Elastic Search global settings
# https://elasticsearch-dsl.readthedocs.io/en/latest/configuration.html
# http://elasticsearch-py.readthedocs.io/en/master/api.html#elasticsearch


DATABASE_CONNECTION_INFO = {
    'hosts': ['localhost'],
    # 'PORT': None,
    # 'timeout': 100
}

INDEX_SETTINGS = {

}

INDEX_NAME = 'rentality'


BULK_CHUNK_SIZE = 10
