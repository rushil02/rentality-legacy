from django.http import JsonResponse
from django.shortcuts import render

from elastic_search.models import House
from user_custom.forms import HomePageSearchForm


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
    location = request.GET.get('location', '')
    slice_start = int(request.GET.get('pagination-start', 0))
    slice_end = int(request.GET.get('pagination-end', 10))
    s = House.search().query('match_all').sort('-create_time')[slice_start:slice_end]
    results = s.execute().to_dict()
    return JsonResponse(results['hits']['hits'], safe=False)
