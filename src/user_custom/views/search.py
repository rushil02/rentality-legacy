from django.http import JsonResponse
from django.shortcuts import render

from elastic_search.models import House
from elastic_search.core.settings import LOCATION_RADIUS
from user_custom.forms import HomePageSearchForm
from django.http import HttpResponseBadRequest


def search(request):
    form = HomePageSearchForm(request.GET or None)
    context = {
        'search_form': form,
        'initial_query': 0
    }
    return render(request, 'user/search_results.html', context)


# def get_region(location_phrase):
#     q =

def search_api(request):
    form = HomePageSearchForm(request.GET or None)
    slice_start = int(request.GET.get('pagination-start', 0))
    slice_end = int(request.GET.get('pagination-end', 10))

    query = House.search().query('match_all')

    if form.is_valid():
        postal_code = form.cleaned_data['location']
        home_type = form.cleaned_data['home_type']
        rent = form.cleaned_data['rent']
        if rent:
            query = query.query(
                'range', rent={'lte': rent}
            )
        if postal_code:
            query = query.filter(
                'geo_distance', **{
                    'distance': "%skm" % LOCATION_RADIUS,
                    'geo_point': {
                        "lat" : postal_code.location.y, 
                        "lon" : postal_code.location.x
                    }
                })[slice_start:slice_end]
        if home_type:
            query = query.filter('term', home_type=home_type.name)
        results = query.execute().to_dict()
        return JsonResponse(results['hits']['hits'], safe=False)
    else:
        return HttpResponseBadRequest()
