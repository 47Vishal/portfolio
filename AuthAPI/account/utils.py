from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
import os

# def send_activation_email(recipient_email, activation_url):
# subject = 'Activate Your account on ' + settings.SITE_NAME
# from_email = settings.EMAIL_HOST_USER
# to = [recipient_email]

# #Load the HTML Email Template 
# html_content = render_to_string('account/email_link.html', {'activation_url': activation_url})
# text_content=strip_tags(html_content)
# email = EmailMultiAlternatives(subject, text_content, from_email, to)
# email.attach_alternative(html_content,"text/html")
# email.send()



class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(
            subject= data['subject'],
            body=data['body'],
            from_email=os.environ.get('EMAIL_FROM'),
            to=[data['to_email']]
        )
        email.send()

