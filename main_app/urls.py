from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^get_subscribers/$', views.get_subscribers, name='get_subscribers'),
    # url(r'^post_url/$', views.post_treasure, name='post_treasure'),
]
