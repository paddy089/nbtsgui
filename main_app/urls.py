from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^get_subscribers/$', views.get_subscribers, name='get_subscribers'),
    url(r'^send_broadcast/$', views.send_broadcast, name='send_broadcast'),
]
