from elasticsearch_dsl import Text, Completion, Keyword, Integer, DateRange, HalfFloat

from elastic_search.core.models import BaseModel
from elastic_search.core.utils import get_index_name


# FIXME: optimize
class Location(BaseModel):
    suburb = Text(
        multi=True,
        fields={
            'suggester': Completion(preserve_separators=False)
        }
    )

    class IndexInfo(BaseModel.IndexInfo):
        index_this_model = True

    class Index:
        name = get_index_name('Location')

        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0
        }


class House(BaseModel):
    address = Text()
    location = Text()
    room_type = Keyword()
    rent = Integer()
    availability = DateRange()
    min_stay = Integer()
    uuid = Keyword()
    rating = HalfFloat()
    user_image = Text(index=False)

    class IndexInfo(BaseModel.IndexInfo):
        index_this_model = True

    class Index:
        name = get_index_name('House')

        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0
        }
