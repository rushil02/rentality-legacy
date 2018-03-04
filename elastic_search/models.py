from elasticsearch_dsl import Text, Completion

from elastic_search.core import ModelHashed


class Location(ModelHashed):
    suburb = Text(
        multi=True,
        fields={
            'suggester': Completion(preserve_separators=False)
        }
    )
