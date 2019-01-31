from django.contrib import messages
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import render, get_object_or_404, redirect, reverse
from rest_framework.decorators import api_view
from django.views.decorators.http import require_GET
from rest_framework.generics import GenericAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from datetime import datetime
from django.http import Http404
from rest_framework import generics, status
from application.serializers import BookingAmountDetailsSerializer, BookingInfoSerializer, \
    ApplicationCreateSerializer
from billing.models import Fee
import pytz
from psycopg2.extras import DateRange

from billing.utils import Fee as BillingFee
from house.forms import ApplyForm
from house.models import House
from house.serializers import HouseSerializer, HouseDetailsPublicSerializer
from payments.stripe_wrapper import retrieve_customer, create_customer, create_charge
from application.models import Application, ApplicationState, AccountDetail
from billing.models import Fee, Order
from rest_framework.settings import api_settings
from rest_framework import status
from promotions.models import PromotionalCode

# FIXME: Needs to be removed
# @require_GET
from user_custom.models import Account


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


class CreateApplicationView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ApplicationCreateSerializer

    PaymentGateway = 'S'  # Stripe, Refer to user_custom.models.Account

    def process_payment(self, request, stripe_token, fee_model, house):
        user = request.user
        try:
            account = user.account_set.get(payment_gateway=self.PaymentGateway)
        except Account.DoesNotExist:
            customer = create_customer(email=request.user.email, source=stripe_token)
            account = Account(
                user=user, payment_gateway=self.PaymentGateway, details={'customer_id': customer.id}
            )
            account.save()
        else:
            customer_id = account.get_details('customer_id', default=None)

            if customer_id:
                customer = retrieve_customer(customer_id)
                customer.source = stripe_token
                customer.save()
            else:
                customer = create_customer(email=request.user.email, source=stripe_token)
                account.details['customer_id'] = customer.id
                account.save()

        destination_amount = fee_model.destination_amount
        destination_account = house.home_owner.account_id

        charge = create_charge(
            customer=customer,
            target_account_id=destination_account,
            amount=fee_model.source_amount,
            destination_amount=destination_amount,
            receipt_email=user.email,
        )
        return charge

    def create(self, request, *args, **kwargs):
        try:
            house = House.objects.get(uuid=kwargs.get('house_uuid'))
        except House.DoesNotExist:
            raise Http404

        tenant = self.request.user.tenant

        print(request.data)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            promo_codes = serializer.validated_data['booking_info']['promo_codes']
            try:
                promo_objs = PromotionalCode.objects.validate_list(
                    codes=promo_codes, user=request.user,
                    applied_on_content_type=ContentType.objects.get(app_label='application', model='application'),
                    applier_type='T'
                )
            except ValueError as e:
                return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            tenant_meta = None
            app_obj = Application(
                house=house, tenant=tenant, tenant_meta=tenant_meta, rent=house.rent,
                date=DateRange(lower=serializer.validated_data['booking_info']['start_date'],
                               upper=serializer.validated_data['booking_info']['end_date']),
            )
            app_obj.save()
            app_obj.promotional_code.add(*promo_objs)

            fee_model = BillingFee.init(
                house=house,
                date_range=(serializer.validated_data['booking_info']['start_date'],
                            serializer.validated_data['booking_info']['end_date']),
                guests_num=serializer.validated_data['booking_info']['guests'], promotional_codes=promo_objs
            )

            AccountDetail(
                application=app_obj, fee=fee_model.fee,
                tenant=fee_model.tenant_account.to_json_dict(),
                home_owner=fee_model.home_owner_account.to_json_dict(),
                meta=fee_model.to_json_dict()
            ).save()

            charge = self.process_payment(request, serializer.validated_data['stripe_token'], fee_model, house)
            Order(application=app_obj, charge_id=charge.id)

            return Response({"details": "success"}, status=status.HTTP_201_CREATED)


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
                serializer = BookingAmountDetailsSerializer(amount_details)
                return Response(serializer.data)
