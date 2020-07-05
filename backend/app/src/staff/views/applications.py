from django.contrib import messages
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import render, get_object_or_404, redirect, reverse
from django.contrib.admin.views.decorators import staff_member_required

from application.models import Application
from utils.mailer import send_template_mail


@staff_member_required
def applications_list(request):
    return render(request, 'staff/application/list.html', {
        'applications': Application.objects.all().select_related('tenant', 'house__home_owner', 'tenant__user',
                                                                 'house__home_owner__user')})


@staff_member_required
def application_details(request, uuid):
    return render(request, 'staff/application/details.html', {'application': get_object_or_404(Application, uuid=uuid)})


def application_resend_email(request, entity, uuid):
    app = get_object_or_404(Application, uuid=uuid)
    email_context = {'application': app, 'current_site': get_current_site(request)}

    if entity == 'tenant':
        send_template_mail(
            subject="Rentality - Booking Confirmed",
            template_name='emails/tenant/booking/confirmed.html',
            context=email_context,
            from_email='support@rentality.com.au',
            recipient_list=[app.tenant.user.email],
            text_message="Your booking has been confirmed. Please enable text/html to view this email correctly."
        )
        messages.add_message(request, messages.SUCCESS, "Email sent to Tenant")
    elif entity == 'homeowner':
        send_template_mail(
            subject="Rentality - Booking Made",
            template_name='emails/home_owner/booking/confirmed.html',
            context=email_context,
            from_email='support@rentality.com.au',
            recipient_list=[app.house.home_owner.user.email],
            text_message="A booking has been made. Please enable text/html to view this email correctly."
        )
        messages.add_message(request, messages.SUCCESS, "Email sent to Home Owner")
    else:
        messages.add_message(request, messages.ERROR, "Invalid Submission")

    return redirect(reverse('staff:application_details', kwargs={'uuid': app.uuid}))
