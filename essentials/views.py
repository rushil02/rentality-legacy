from django.shortcuts import render

# Create your views here.


def notification(request):
    return render(request, 'essentials/notifications_all.html', {})
