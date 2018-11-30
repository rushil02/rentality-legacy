from elasticsearch_dsl import Text, Completion, Keyword, Integer, DateRange, HalfFloat, GeoPoint

from elastic_search.core.models import BaseModel
from elastic_search.core.utils import get_index_name


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
    title = Text(index=False)
    address = Text()
    location = Text()
    home_type = Keyword()
    rent = Integer()
    availability = DateRange()
    min_stay = Integer()
    uuid = Keyword()
    geo_point = GeoPoint()
    rating = HalfFloat()
    thumbnail = Text(index=False)
    user_image = Text(index=False)

    class IndexInfo(BaseModel.IndexInfo):
        index_this_model = True

    class Index:
        name = get_index_name('House')

        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0
        }
