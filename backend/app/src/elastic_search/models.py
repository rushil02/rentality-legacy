from django.utils import timezone
from elasticsearch_dsl import (
    Text, Completion, Keyword, Integer, DateRange, HalfFloat, GeoPoint, InnerDoc, Nested, Range, Boolean, analyzer
)

from elastic_search.core.models import BaseModel
from elastic_search.core.utils import get_index_name
from utils.api_thumbnailer import resize_image


class Location(BaseModel):
    obj_pk = Keyword(required=True)
    verbose = Text(boost=5.0)
    parent_verbose = Text()
    geo_point = GeoPoint()

    extra = Text(multi=True)

    class IndexInfo(BaseModel.IndexInfo):
        index_this_model = True

    class Index:
        name = get_index_name('Location')

        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0
        }

    @classmethod
    def parse_db_obj(cls, db_obj):
        gp = db_obj.get_geo_loc_point()
        if gp is not None:
            geo_point = {"lat": gp.y, "lon": gp.x}
        else:
            geo_point = None

        es_obj = Location(
            verbose=db_obj.get_verbose(),
            parent_verbose=db_obj.get_parents(),
            geo_point=geo_point,
            extra=db_obj.get_all_keywords(),
            obj_pk=db_obj.get_identifier(),
            create_time=timezone.now()
        )
        return es_obj


class Availability(InnerDoc):
    date_range = DateRange()


class House(BaseModel):
    title = Text(index=False)
    leased = Boolean(index=False)
    address = Text()
    location = Text()
    home_type = Keyword()
    rent = Integer()
    availabilities = Nested(Availability, multi=True)
    min_stay = Integer()
    uuid = Keyword(index=False)
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

    @classmethod
    def parse_db_obj(cls, db_obj):
        profile_image = resize_image(db_obj.get_owner().userprofile.get_profile_pic(), preset='profile_search_page')
        thumbnail = resize_image(db_obj.get_thumbnail(), preset='house_search_page')

        es_obj = cls(
            obj_pk=db_obj.pk, address=db_obj.address, location=db_obj.get_location(), home_type=db_obj.home_type.name,
            uuid=db_obj.uuid,
            user_image=profile_image, rent=db_obj.rent, min_stay=db_obj.min_stay, title=db_obj.title, thumbnail=thumbnail,
            geo_point={"lat": db_obj.location.location.y, "lon": db_obj.location.location.x}, create_time=db_obj.updated_on,
            leased=db_obj.is_marked_leased()
        )

        for availability in db_obj.get_availability(from_year=timezone.now().year, till_year=timezone.now().year):
            es_obj.add_availability(availability.lower, availability.upper)

        return es_obj

    def add_availability(self, lower, upper):
        self.availabilities.append(Availability(date_range=Range(gte=lower, lt=upper)))


html_strip = analyzer('html_strip',
    tokenizer="standard",
    filter=["standard", "lowercase", "stop", "snowball"],
    char_filter=["html_strip"]
)


class BlogArticle(BaseModel):
    title = Text()
    abstract = Text()
    content = Text(analyzer=html_strip)
    slug = Keyword()
    tags = Keyword(multi=True)
    thumbnail = Text(index=False)
    thumbnail_alt_tags = Text()


    class IndexInfo(BaseModel.IndexInfo):
        index_this_model = True

    class Index:
        name = get_index_name('Blog')

        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0
        }

    @classmethod
    def parse_db_obj(cls, db_obj):
        thumbnail = resize_image(db_obj.thumbnail, preset='popular_blog_articles_small')
        es_obj = cls(title=db_obj.title, abstract=db_obj.abstract, content=db_obj.content,
                     slug=db_obj.slug, thumbnail=thumbnail, thumbnail_alt_tags=db_obj.thumbnail_alt_tags)
        for tag in db_obj.tags.all():
            es_obj.tags.append(tag.verbose)
        return es_obj
