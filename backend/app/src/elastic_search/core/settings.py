# Elastic Search global settings
# https://elasticsearch-dsl.readthedocs.io/en/latest/configuration.html
# http://elasticsearch-py.readthedocs.io/en/master/api.html#elasticsearch

from rentality.settings.common import get_env_var

DIR = 'elastic_search'

# FIXME: sync configurations from docker
DATABASE_CONNECTION_INFO = {
    'alias': 'default',
    'hosts': [get_env_var('ELASTICSEARCH_HOST'), ],
    'PORT': 9200,
    'timeout': 10,  # default
    'sniff_on_start': True,
    'sniff_on_connection_fail': True,
    'sniffer_timeout': 60,
    'sniff_timeout': 10
}

INDEX_NAME_PREFIX = 'web'

# time in seconds
CONNECTION_WAIT_TIME = 3
CONNECTION_MAX_TRIES = 2

BULK_CHUNK_SIZE = 500
