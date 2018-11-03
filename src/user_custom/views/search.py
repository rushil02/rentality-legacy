from django.shortcuts import render

from user_custom.forms import HomePageSearchForm


def search(request):
    form = HomePageSearchForm()
    context = {
        'search_form': form,
        'initial_query': 0
    }
    return render(request, 'user/search_results.html', context)