from django.shortcuts import render, get_object_or_404
from utils.api_utils import InternalAccessAPIView
from .serializers import PolicyPublicSerializer
from rest_framework import status
from rest_framework.response import Response


# Create your views here.
from essentials.models import Policy


def notification(request):
    return render(request, 'essentials/notifications_all.html', {})


def get_policy(request, policy_type):
    policy = get_object_or_404(Policy, policy_type=policy_type, status='A')
    return render(request, 'essentials/policy.html', {'policy': policy})


class GetPolicyPublicReadView(InternalAccessAPIView):
    def get(self, request, internal_access_key, *args, **kwargs):
        policy = get_object_or_404(Policy, policy_type=kwargs.get('policy_type'), status='A')
        policy_serializer = PolicyPublicSerializer(policy)
        return Response(policy_serializer.data, status=status.HTTP_200_OK)
