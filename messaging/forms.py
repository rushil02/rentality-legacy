from django import forms

from messaging.models import Message


class MessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['content', ]
        widgets = {
            'content': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Message'})
        }
