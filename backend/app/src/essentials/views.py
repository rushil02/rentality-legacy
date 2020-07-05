from django.shortcuts import render, get_object_or_404

# Create your views here.
from essentials.models import Policy


def notification(request):
    return render(request, 'essentials/notifications_all.html', {})


def get_policy(request, policy_type):
    policy = get_object_or_404(Policy, policy_type=policy_type, status='A')
    return render(request, 'essentials/policy.html', {'policy': policy})
