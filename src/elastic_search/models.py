from elasticsearch_dsl import Text, Completion

from elastic_search.core.models import BaseModel


class Location(BaseModel):
    suburb = Text(
        multi=True,
        fields={
            'suggester': Completion(preserve_separators=False)
        }
    )

    class IndexInfo:
        index_this_model = True


class House(BaseModel):
    address = Text()
    location = Text()

    class IndexInfo:
        index_this_model = True
