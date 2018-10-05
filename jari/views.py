from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template


def admin(request):
    template = get_template('jari/admin.html')
    return HttpResponse(request, template)


def bladderscan(request):
    template = get_template('jari/bladderscan.html')
    return render(request, template)


def bladderscan_1(request):
    template = get_template('jari/bladderscan_1.html')
    return render(request, template)


def bloeddrukmeter(request):
    template = get_template('jari/bloeddrukmeter.html')
    return render(request, template)


def bloeddrukmeter_1(request):
    template = get_template('jari/bloeddrukmeter_1.html')
    return render(request, template)


def bloeddrukmeter_2(request):
    template = get_template('jari/bloeddrukmeter_2.html')
    return render(request, template)


def ecg(request):
    template = get_template('jari/ecg.html')
    return render(request, template)


def ecg_1(request):
    template = get_template('jari/ecg_1.html')
    return render(request, template)


def help(request):
    template = get_template('jari/help.html')
    return render(request, template)


def index(request):
    template = get_template('jari/index.html')
    return render(request, template)


def meetinstrumenten(request):
    template = get_template('jari/meetinstrumenten.html')
    return render(request, template)


def meldingen(request):
    template = get_template('jari/meldingen.html')
    return render(request, template)


def mobiliteit(request):
    template = get_template('jari/mobiliteit.html')
    return render(request, template)


def over(request):
    template = get_template('jari/over.html')
    return render(request, template)


def tillift(request):
    template = get_template('jari/tillift.html')
    return render(request, template)


def tillift_1(request):
    template = get_template('jari/tillift_1.html')
    return render(request, template)


def tillift_2(request):
    template = get_template('jari/tillift_2.html')
    return render(request, template)


def tillift_3(request):
    template = get_template('jari/tillift_3.html')
    return render(request, template)


def under_construction(request):
    template = get_template('jari/under_construction.html')
    return render(request, template)


def under_construction_1(request):
    template = get_template('jari/under_construction_1.html')
    return render(request, template)


