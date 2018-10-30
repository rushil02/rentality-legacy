# Elastic Search global settings
# https://elasticsearch-dsl.readthedocs.io/en/latest/configuration.html
# http://elasticsearch-py.readthedocs.io/en/master/api.html#elasticsearch

DIR = 'elastic_search'

# FIXME: sync configurations from docker
DATABASE_CONNECTION_INFO = {
    'alias': 'default',
    'hosts': ['localhost'],
    # 'PORT': None,
    # 'timeout': 100
    'sniff_on_start': True,
    'sniff_on_connection_fail': True,
    'sniffer_timeout': 60
}

INDEX_NAME_PREFIX = 'web'

BULK_CHUNK_SIZE = 10
