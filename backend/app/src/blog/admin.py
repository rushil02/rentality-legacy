from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import Article, Tag


class ArticleAdmin(SummernoteModelAdmin):
    summernote_fields = ('content',)
    prepopulated_fields = {"slug": ("title",)}
    list_display = ('title', 'active', 'create_time', 'update_time')


class TagAdmin(admin.ModelAdmin):
    list_display = ('verbose', 'priority', 'create_time')


admin.site.register(Tag, TagAdmin)
admin.site.register(Article, ArticleAdmin)
