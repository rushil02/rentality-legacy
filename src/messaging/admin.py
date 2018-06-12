from django.contrib import admin

from messaging.models import Thread, ThreadUser, Message, ThreadUserMessage

admin.site.register(Thread)
admin.site.register(ThreadUser)
admin.site.register(Message)
admin.site.register(ThreadUserMessage)
