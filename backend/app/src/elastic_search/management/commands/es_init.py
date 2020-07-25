import traceback
from django.core.management import BaseCommand, CommandError

from blog.models import Article
from cities_custom.models import PostalCodeCustom, CityCustom, DistrictCustom, RegionCustom, SubRegionCustom
from elastic_search.models import House as HouseElastic, Location as LocationElastic, BlogArticle as BlogArticleElastic
from house.models import House


def synchronise_es_house():
    qs = House.active_objects.all()
    HouseElastic.init_from_dj(qs)


def synchronise_es_location():
    """
    Use to update ElasticSearch Location Index
    :return:
    """
    LocationElastic._index.delete()
    LocationElastic.init()

    def _load_data(_model, related_models, verbose):
        print("Loading %s ..." % verbose, flush=True)
        qs = _model.objects.all().select_related(*related_models)
        LocationElastic.init_from_dj(qs, buffer_chunk_size=500, recreate=False)

    _load_data(PostalCodeCustom, ['country', 'region', 'subregion', 'city', 'district'], "Postal Codes")
    _load_data(CityCustom, ['country', 'region', 'subregion'], "Cities")
    _load_data(DistrictCustom, ['city', ], "Districts")
    _load_data(RegionCustom, ['country', ], "Regions")
    _load_data(SubRegionCustom, ['region', ], "SubRegions")


def synchronise_es_blog():
    qs = Article.objects.filter(active=True).prefetch_related('tags')
    BlogArticleElastic.init_from_dj(qs)


class Command(BaseCommand):
    """ Periodic Cleanup of System """

    help = 'Use for periodic cleanup and synchronisation of System'

    cleanup_func = {
        'Synchronise ElasticSearch Index - Locations': synchronise_es_location,
        'Synchronise ElasticSearch Index - House': synchronise_es_house,
        'Synchronise ElasticSearch Index - Blog': synchronise_es_blog,
    }

    def ask_user_input(self, verbose):
        opt = input(verbose + " ? [y/n]\n")
        if opt in ['y', 'Y']:
            return True
        elif opt in ['n', 'N']:
            return False
        else:
            print("Invalid option.\n")
            return self.ask_user_input(verbose)

    def handle(self, *args, **options):
        try:
            for verbose, func in self.cleanup_func.items():
                if self.ask_user_input(verbose):
                    func()
        except KeyError as e:
            print(e)
            traceback.print_stack()
            raise CommandError("Some problem occurred. Rolling back changes.")
        else:
            self.stdout.write("Maintenance task complete.")
