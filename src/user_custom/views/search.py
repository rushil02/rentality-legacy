from django.http import JsonResponse
from django.shortcuts import render

from elastic_search.models import House
from user_custom.forms import HomePageSearchForm


def search(request):
    print(request.GET)
    form = HomePageSearchForm()
    context = {
        'search_form': form,
        'initial_query': 0
    }
    return render(request, 'user/search_results.html', context)


def search_api(request):
    location = request.GET['location']
    s = House.search().query('fuzzy', location=location)
    results = s.execute().to_dict()
    return JsonResponse(results['hits']['hits'], safe=False)
