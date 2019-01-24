from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from django.views.decorators.http import require_GET
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from datetime import datetime
from django.http import Http404

from house.models import House
from house.serializers import HouseSerializer, HouseSerializerForApplication
from payments.stripe_wrapper import retrieve_customer
from application.models import Application, ApplicationState
from billing.models import Fee, Order


def create_react(request, house_uuid):
    get_object_or_404(House, uuid=house_uuid)
    return render(request, 'react_base.html', {})


@require_GET
def create(request, house_uuid):
    house = get_object_or_404(House, uuid=house_uuid)
    context = {
        'house': house,
        'move_in_date': '02 Oct 2018',
        'move_out_date': '28 Oct 2018',
        'guests': 2,
        'weeks': 4.7,
    }

    return render(request, 'application/apply.html', context)


class HouseDetailViewForApplication(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = HouseSerializerForApplication

    def calculate_rent(self, house, start_date, end_date, promo_code):
        # FIXME: Add rent calculation Logic
        self.amounts = {
            'calculated_rent': 500,
            'service_fee': 700,
            'total_rent': 1200
        }

    def get_object(self, *args, **kwargs):
        house_uuid = self.kwargs['house_uuid']
        try:
            house = House.active_objects.get(uuid=house_uuid)
        except:
            raise Http404

        return house

    def get_serializer(self, instance):
        return self.serializer_class(instance)

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        start_date = datetime.strptime(request.GET['start_date'], '%Y-%m-%dT%H:%M:%S.%fZ')
        end_date = datetime.strptime(request.GET['end_date'], '%Y-%m-%dT%H:%M:%S.%fZ')
        promo_code = request.GET.get('promo_code', None)

        self.calculate_rent(instance, start_date, end_date, promo_code)

        self.amounts['house'] = serializer.data
        return Response(self.amounts)


class PaymentForApplication(APIView):
    permission_classes = (IsAuthenticated,)

    def calculate_amount(rent):
        fee = Fee.objects.get(active=True)
        d = {
            'source_amount': int(rent * (1 + (fee.tenant_charge/100))) * 100,
            'destination_amount': int(rent * (1 - (fee.home_owner_charge/100))) * 100
        }
        return d

    def post(self, request, *args, **kwargs):
        application_uuid = self.kwargs['application_uuid']
        user = request.user
        if user.tenant.customer_id:
            customer = retrieve_customer(user.tenant.customer_id)
            if request.POST.get('stripeToken'):
                customer.source = request.POST.get('stripeToken')
            customer.save()
        else:
            kwargs = {
                    'email': request.user.email
                }
            if request.POST.get('stripeToken'):
                kwargs['source'] = request.POST.get('stripeToken')
                customer = create_customer(**kwargs)
                user.tenant.customer_id = customer.id
                user.tenant.save()
        try:
            application = Application.objects.get(uuid=application_uuid)
        except Application.DoesNotExist:
            raise Http404("Application does not exist")
        else:
            amounts = calculate_amount(application.rent)
            amount = amounts['source_amount']
            customer = application.tenant.customer_id
            destination_amount = amounts['destination_amount']
            destination_account = application.house.home_owner.account_id

            charge = create_charge(
                customer=customer,
                target_account_id=destination_account,
                amount=amount,
                destination_amount=destination_amount
            )

            order = Order(application=application, charge_id=charge.id)
            order.save()
        return Response({"status": True})