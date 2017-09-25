from django.shortcuts import render
# from .forms import InputForm
from django.http import HttpResponse
from .DatabaseAccess import *
from .telnet import *
import json


# Create your views here.
def index(request):
    return render(request, 'index.html')


def get_subscribers(request):
    s = getSubscribers()
    print(s)
    s = json.dumps(s)


    return HttpResponse(s)


def show_status(request):
    s = getSubscribers()

    list = []

    for sub in s:
        a = sub[0]
        list = list + [a]

    checkSub = checkSubsState(list)
    print(checkSub)

    checkJson = json.dumps(checkSub)

    return HttpResponse(checkJson)

def send_broadcast(request):
    print(request)

    msg = request.GET.get('msg')
    subs = request.GET.getlist('subs[]')

    print(subs)
    print(msg)

    #broadcastSMS(subs, msg)

    return HttpResponse('send_broadcast success')


def del_sub(request):

    subs = request.GET.getlist('subs[]')
    print(subs)

    for s in subs:

        delSub(s)

    return HttpResponse('del_sub success')


def add_sub(request):

    imsi = request.GET.get('imsi')
    name = request.GET.get('name')

    print(imsi, name)

    s = addSub(imsi, name)

    return HttpResponse(s)