from django.shortcuts import render


def not_found(request, exception=None):
    # FIXME: Fix the template
    return render(request, 'errorpages/404.html', status=404)
