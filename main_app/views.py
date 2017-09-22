from django.shortcuts import render
# from .forms import InputForm
from django.http import HttpResponse
from .DatabaseAccess import *
from .telnet import *
import json


# Create your views here.
def index(request):
    # s = getSubscribers()
    # return HttpResponse('<h1>' + s + '</h1>')
    #return render(request, 'index.html', {'subs', subs})
    return render(request, 'index.html')


def get_subscribers(request):
    # id = request.GET.get('', None)
    # form = InputForm(request.POST)
    # if from.is_valid():
    s = getSubscribers()

    #print(s[0])

    s = json.dumps(s)
    print(s)
    return HttpResponse(s)


def send_broadcast(request):
    print(request)

    msg = request.GET.get('msg')
    subs = request.GET.getlist('subs[]')

    print(subs)
    print(msg)

    broadcastSMS(subs, msg)

    return HttpResponse('send_broadcast success')
