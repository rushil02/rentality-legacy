from django.core.mail import send_mail
from django.template.loader import render_to_string


def send_template_mail(subject, template_name, context, from_email, recipient_list, text_message):
    """
    Easy wrapper for template mails

    :param subject: string
    :param template_name: django path to template
    :param context: dictionary
    :param from_email: string
    :param recipient_list: A list of strings, each an email address. Each member of recipient_list will see the other
    recipients in the “To:” field of the email message.
    :param text_message: string. text message with available context for formatting
    :return: None
    """

    html_message = render_to_string(template_name, context)
    text_message = text_message.format(**context)
    send_mail(
        subject=subject, message=text_message, from_email=from_email,
        recipient_list=recipient_list, html_message=html_message
    )
