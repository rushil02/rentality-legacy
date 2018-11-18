from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.urls import reverse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.db.models import Q, Exists, OuterRef
from rest_framework import status, viewsets

from house.models import House
from tenant.models import HousePreference
from user_custom.forms import ProfileForm1, ProfileForm2, EditProfileForm, UserChangeForm
from user_custom.models import PersonalityTag
from user_custom.serializers import PersonalityTagSerializer
from rest_framework.response import Response
from rest_framework.views import APIView


@login_required
def dashboard(request):
    houses = House.objects.filter(home_owner__user=request.user).exclude(status='D').all()
    context = {
        'houses': houses
    }
    # FIXME: separation of dashboards
    return render(request, 'home_owner/dashboard.html', context)


def edit_profile(request):
    form1 = UserChangeForm(request.POST or None, instance=request.user)
    form2 = EditProfileForm(request.POST or None, request.FILES or None, instance=request.user.userprofile)
    context = {
        'form1': form1,
        'form2': form2
    }
    if request.method == 'POST':
        if form1.is_valid() and form2.is_valid():
            form1.save()
            form2.save()
            return redirect(reverse('user:user_details'))

    return render(request, 'user/profile/edit_details.html', context)


class PersonalityTagView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer = PersonalityTagSerializer

    def get(self, request, *args, **kwargs):
        user_profile = request.user.userprofile
        qs = list(PersonalityTag.objects.filter(
            Q(system_default=True) | Q(userprofile=user_profile)
        ).values('verbose', 'id').annotate(
            checked=Exists(PersonalityTag.objects.filter(userprofile=user_profile, pk=OuterRef('pk')))))
        serializer = self.serializer(data=qs, many=True)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer(data=request.data, many=True)
        if serializer.is_valid():
            user_profile = request.user.userprofile
            objs_set = serializer.save()
            user_profile.personality_tags.add(*[obj[0] for obj in objs_set if obj[1] is True])
            user_profile.personality_tags.remove(*[obj[0] for obj in objs_set if obj[1] is False])
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
