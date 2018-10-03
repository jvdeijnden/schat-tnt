"""
Created on 21 Feb 2018

@author: Jos van den Eijnden
"""

from django.http import HttpResponse, HttpResponseRedirect
from django.template.loader import get_template
from django.shortcuts import redirect, get_list_or_404, get_object_or_404
from django.db.models import Q
from .models import Building, Floor, Category, Product, Tracker
import simplejson as json
from .rest import get_devices, get_lists


def index(request):
    products = Product.objects.all()

    template = get_template('tnt/base.html')
    return HttpResponse(template.render({'page': 'index',
                                         'products': products},
                                        request))


def search(request, search_slug=None):
    search_string = search_slug.replace('-', ' ')
    results = Product.objects.filter(Q(product_model__icontains=search_string) |
                                     Q(manufacturer_long__icontains=search_string) |
                                     Q(category__name__icontains=search_string))

    template = get_template('tnt/base.html')
    return HttpResponse(template.render({'page': 'search',
                                         'results': results},
                                        request))


def categories(request):
    categories = get_list_or_404(Category)

    template = get_template('tnt/base.html')
    return HttpResponse(template.render({'page': 'categories',
                                         'categories': categories},
                                        request))


def products(request):
    products = Product.objects.order_by('manufacturer_short' + '')
    print(products)
    template = get_template('tnt/base.html')
    return HttpResponse(template.render({'page': 'products',
                                         'products': products},
                                        request))


def product(request, product_slug=None, tracker_id=None):
    product = get_object_or_404(Product, slug=product_slug)

    template = get_template('tnt/base.html')

    if tracker_id is not None:
        return redirect('vitalis-vonderhof/0', permanent=False)
        tracker = get_object_or_404(Tracker, pk=tracker_id)
        return HttpResponse(template.render({'page': 'tracker',
                                             'product': product,
                                             'tracker': tracker},
                                            request))

    trackers = Tracker.objects.filter(product=product)

    return HttpResponse(template.render({'page': 'product',
                                         'product': product,
                                         'trackers': trackers},
                                        request))


# def tracker(request, tracker_id=None):
#     tracker = get_object_or_404(Tracker, pk=tracker_id)
#
#     template = get_template('tnt/base.html')
#     return HttpResponse(template.render({'page': 'tracker',
#                                          'tracker': tracker},
#                                         request))


def plan(request, building=None, floor=None):
    if building is None:
        # return redirect('vitalis-vonderhof/-1', permanent=True)
        return redirect('floor', building='vitalis-vonderhof', floor='-1', permanent=True)
    if floor is None:
        # return redirect('-1', permanent=True)
        return redirect('floor', building='vitalis-vonderhof', floor='-1', permanent=True)

    building = get_object_or_404(Building, slug=building)
    floor = get_object_or_404(Floor, building=building, number=floor)
    trackers = Product.objects.all()

    if 'data' in request.get_full_path():
        output = {'building': {'name': building.name,
                               'latitude': building.latitude,
                               'longitude': building.longitude,
                               'zoom': building.zoom},
                  'floor': {'name_text': floor.name_text,
                            'info_text': floor.info_text,
                            'image': '/static/tnt/img/' + floor.image,
                            'botleftcoords': [floor.bottom_left_latitude, floor.bottom_left_longitude],
                            'toprightcoords': [floor.top_right_latitude, floor.top_right_longitude]},
                  'trackers': []}
        return HttpResponse(json.dumps(output))

    elif 'filter/product' in request.get_full_path():
        return 0
    elif 'filter/tracker' in request.get_full_path():
        return 0

    # floordata = get_list_or_404(Floor, building=building).order_by('number')
    floordata = Floor.objects.filter(building=building).order_by('number')

    template = get_template('tnt/base.html')
    return HttpResponse(template.render({'page': 'map',
                                         'floor': floor,
                                         'floordata': floordata,
                                         'trackers': trackers},
                                        request))


def stats(request):
    statistics = 0
    template = get_template('tnt/base.html')
    return HttpResponse(template.render({'page': 'stats',
                                         'statistics': statistics},
                                        request))


def about(request):
    # get_lists()
    # get_devices()

    template = get_template('tnt/base.html')
    return HttpResponse(template.render({'page': 'about'},
                                        request))
