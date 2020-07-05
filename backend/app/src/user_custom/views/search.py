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
