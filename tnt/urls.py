"""
Created on 21 Feb 2018

@author: Jos van den Eijnden
"""

from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('search/<slug:search_slug>/', views.search, name='search'),
    path('product/<slug:product_slug>/', views.product, name='product'),
    path('product/<slug:product_slug>/tracker/<int:tracker_id>/', views.product, name='tracker'),
    path('categories/', views.categories, name='categories'),
    path('products/', views.products, name='products'),
    path('map/', views.plan, name='map'),
    path('map/<slug:building>/', views.plan, name='map'),
    path('map/<slug:building>/<slug:floor>/', views.plan, name='map'),
    path('map/<slug:building>/<slug:floor>/data/', views.plan, name='map'),
    path('map/<slug:building>/<slug:floor>/filter/product/<slug:product_slug>/', views.plan, name='filter_product'),
    path('map/<slug:building>/<slug:floor>/filter/tracker/<int:tracker_id>/', views.plan, name='filter_tracker'),
    path('about/', views.about, name='about'),
]
