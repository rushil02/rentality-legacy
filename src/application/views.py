from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.contenttypes.models import ContentType
from django.contrib.sites.shortcuts import get_current_site
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
from utils.mailer import send_template_mail


@login_required
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
        }
        return render(request, 'react_base.html', {"extra_data": context})
    else:
        messages.add_message(request, messages.ERROR,
                             "%s" % '; '.join(str(x) for x in form.errors.values()))
        return redirect(reverse("house:info", args=[house_uuid]))


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
        )
        return charge

    def create(self, request, *args, **kwargs):
        # FIXME: Atomicity or States - Need at least 1 paradigm covered
        try:
            house = House.objects.get(uuid=kwargs.get('house_uuid'))
        except House.DoesNotExist:
            raise Http404

        tenant = self.request.user.tenant

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

            tenant_meta = serializer.validated_data['tenant_details']
            meta = {'guests': serializer.validated_data['booking_info']['guests']}
            app_obj = Application(
                house=house, tenant=tenant, tenant_meta=tenant_meta, rent=house.rent, meta=meta,
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
            Order.objects.create(application=app_obj, charge_id=charge.id, payment_gateway=self.PaymentGateway)

            email_context = {'application': app_obj, 'current_site': get_current_site(request)}

            send_template_mail(
                subject="Rentality - Booking Confirmed",
                template_name='emails/tenant/booking/confirmed.html',
                context=email_context,
                from_email='support@rentality.com.au',
                recipient_list=[self.request.user.email],
                text_message="Your booking has been confirmed. Please enable text/html to view this email correctly."
            )

            send_template_mail(
                subject="Rentality - Booking Made",
                template_name='emails/home_owner/booking/confirmed.html',
                context=email_context,
                from_email='support@rentality.com.au',
                recipient_list=[house.home_owner.user.email],
                text_message="A booking has been made. Please enable text/html to view this email correctly."
            )

            return Response({"details": "success", "msg": ""}, status=status.HTTP_201_CREATED)


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


def application_completion(request):
    valid = request.GET['valid']

    if valid in ['T', 't', 'true', 'True']:
        messages.add_message(request, messages.SUCCESS, "%s" % 'Payment Successful, Your booking has been confirmed.'
                                                               ' Check your email for confirmed booking details.')
    else:
        msg = request.GET.get('msg', default='Transaction Failed to process.')
        messages.add_message(request, messages.ERROR, "Payment Failure - %s" % msg)
    return redirect(reverse("user:dashboard"))
