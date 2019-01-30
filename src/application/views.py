from django.contrib import messages
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import render, get_object_or_404, redirect, reverse
from rest_framework.decorators import api_view
from django.views.decorators.http import require_GET
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from datetime import datetime
from django.http import Http404
from rest_framework import generics, status
from application.serializers import ApplicationPublicSerializer, BookingAmountDetailsSerializer, BookingInfoSerializer
from billing.models import Fee
import pytz
from psycopg2.extras import DateRange

from billing.utils import Fee as BillingFee
from house.forms import ApplyForm
from house.models import House
from house.serializers import HouseSerializer, HouseDetailsPublicSerializer
from payments.stripe_wrapper import retrieve_customer, create_customer, create_charge
from application.models import Application, ApplicationState
from billing.models import Fee, Order
from rest_framework.settings import api_settings
from rest_framework import status
from promotions.models import PromotionalCode


# FIXME: Needs to be removed
# @require_GET
def create_react(request, house_uuid):
    house = get_object_or_404(House, uuid=house_uuid)
    form = ApplyForm(request.GET, obj=house)
    if form.is_valid():
        rent = house.get_rent()
        fee = Fee.objects.get(active=True)
        duration = (form.cleaned_data['move_out_date'] - form.cleaned_data['move_in_date']).days / 7

        context = {
            'move_in_date': form.cleaned_data['move_in_date'].__str__(),
            'move_out_date': form.cleaned_data['move_out_date'].__str__(),
            'guests': form.cleaned_data['guests'],
            'duration': float("{0:.1f}".format(round(duration, 1))),
            'total_payment': float("{0:.2f}".format(float(rent * 4 * float(1 + (fee.tenant_charge / 100))))),
            'cal_rent': float("{0:.2f}".format(round(rent * duration, 2))),
            'service_fee': float(4 * rent * float(fee.tenant_charge / 100)),
            'discount_percentage': 0,
            'discount_savings': 0

        }
        return render(request, 'react_base.html', {"extra_data": context})
    else:
        messages.add_message(request, messages.ERROR,
                             "%s" % '; '.join(str(x) for x in form.errors.values()))
        return redirect(reverse("house:info", args=[house_uuid]))


# FIXME: needs to be removed
class HouseDetailViewForApplication(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = HouseDetailsPublicSerializer

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

    @staticmethod
    def calculate_amount(rent):
        fee = Fee.objects.get(active=True)
        d = {
            'source_amount': int(rent * (1 + (fee.tenant_charge / 100))) * 100,
            'destination_amount': int(rent * (1 - (fee.home_owner_charge / 100))) * 100
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
            amounts = self.calculate_amount(application.rent)
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


class CreateApplicationView(APIView):
    # FIXME Remove id usages
    permission_classes = (IsAuthenticated,)
    serializer_class = ApplicationPublicSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        house = get_object_or_404(House, uuid=kwargs.get('house_uuid'))
        tenant = self.request.user.tenant
        amounts = self.calculate_rent(house)
        rent = amounts['calculated_rent']
        fee = self.get_fee_instance()
        date = DateRange(lower=self.start_date, upper=self.end_date)
        serializer = self.serializer_class(data=dict(start_date=self.start_date, end_date=self.end_date))
        serializer.is_valid(raise_exception=True)
        serializer.save(tenant=tenant, rent=rent, fee=fee, date=date, house=house)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    def calculate_rent(self, house):
        self.start_date = datetime.strptime(self.request.data['startDate'], '%Y-%m-%d').date()
        self.end_date = datetime.strptime(self.request.data['endDate'], '%Y-%m-%d').date()
        promo_code = self.request.data.get('promo_code', [])
        # FIXME: Add rent calculation Logic
        amounts = {
            'calculated_rent': 500,
            'service_fee': 700,
            'total_rent': 1200
        }
        return amounts

    def get_fee_instance(self):
        return Fee.objects.get(active=True)


class BookingAmountView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            house = House.active_objects.get(uuid=self.kwargs['house_uuid'])
        except (KeyError, House.DoesNotExist):
            raise Http404
        else:
            booking_info = BookingInfoSerializer(data=request.GET)
            if booking_info.is_valid(raise_exception=True):
                promo_codes = booking_info.validated_data.get('promo_codes', [])
                try:
                    promo_objs = PromotionalCode.objects.validate_list(
                        codes=promo_codes, user=request.user,
                        applied_on_content_type=ContentType.objects.get(app_label='application', model='application'),
                        applier_type='T'
                    )
                except ValueError as e:
                    return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

                amount_details = BillingFee.init(
                    house=house,
                    date_range=[booking_info.validated_data['start_date'], booking_info.validated_data['end_date']],
                    guests_num=booking_info.validated_data['guests'], promotional_codes=promo_objs
                ).tenant_account.to_dict()
                print(amount_details, "here")
                serializer = BookingAmountDetailsSerializer(amount_details)
                return Response(serializer.data)
