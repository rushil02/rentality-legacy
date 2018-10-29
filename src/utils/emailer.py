import sendgrid
import os
from sendgrid.helpers.mail import *
from django.conf import settings


def send_grid(to_email, subject, content, from_email):
    sg = sendgrid.SendGridAPIClient(apikey=os.environ.get('SENDGRID_API_KEY'))
    from_email = Email(from_email)
    to_email = Email(to_email)
    subject = subject
    content = Content("text/plain", content)
    mail = Mail(from_email, subject, to_email, content)
    response = sg.client.mail.send.post(request_body=mail.get())
    print(response.status_code)
    print(response.body)
    print(response.headers)


def send_mail(to_email, subject, content, from_email=settings.DEFAULT_FROM_EMAIL):
    send_grid(to_email, subject, content, from_email)
