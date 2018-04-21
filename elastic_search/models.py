from elasticsearch_dsl import Text, Completion

from elastic_search.core.models import BaseModel
from elastic_search.core.settings import INDEX_NAME


class Location(BaseModel):
    suburb = Text(
        multi=True,
        fields={
            'suggester': Completion(preserve_separators=False)
        }
    )
    print(BaseModel.__dict__)

    class IndexInfo:
        index_this_model = True

    class Meta:
        index = INDEX_NAME
        doc = 'Location'


class House(BaseModel):
    address = Text()
    location = Text()

    class IndexInfo:
        index_this_model = True

    class Meta:
        index = INDEX_NAME
        doc = 'House'
