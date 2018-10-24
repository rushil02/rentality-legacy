from django.shortcuts import render, get_object_or_404
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator

from blog.models import Article


def home(request):
    article_list = Article.active_objects.filter()
    paginator = Paginator(article_list, 4)

    page = request.GET.get('page', 1)
    articles = paginator.get_page(page)
    return render(request, 'blog/home.html', {"articles": articles})


def article(request, slug):
    return render(request, 'blog/article.html', {'article': get_object_or_404(Article, slug=slug, active=True)})


def search(request, terms):
    # TODO: setup ES blog link
    return render(request, 'blog/search.html', {})
