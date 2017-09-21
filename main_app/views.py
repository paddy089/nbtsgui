from django.shortcuts import render
# from .forms import InputForm
from django.http import HttpResponse
from .DatabaseAccess import *
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
    #print(s)
    return HttpResponse(s)

# def send_sms():


# subs = [
#     (1, '2017-09-21 08:00:01', '2017-09-21 09:22:24', 262029916008251, '', '32171', 0, '1184922295', 0, '2017-09-21 09:22:14')
# ]