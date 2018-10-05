"""
Created on 03 Oct 2018

@author: Jos van den Eijnden
"""

from django.urls import path

from . import views

urlpatterns = [
    path('admin/', views.admin, name='admin'),
    path('bladderscan/', views.bladderscan, name='bladderscan'),
    path('bladderscan_1/', views.bladderscan_1, name='bladderscan_1'),
    path('bloeddrukmeter/', views.bloeddrukmeter, name='bloeddrukmeter'),
    path('bloeddrukmeter_1/', views.bloeddrukmeter_1, name='bloeddrukmeter_1'),
    path('bloeddrukmeter_2/', views.bloeddrukmeter_2, name='bloeddrukmeter_2'),
    path('ecg/', views.ecg, name='ecg'),
    path('ecg_1/', views.ecg_1, name='ecg_1'),
    path('help/', views.help, name='help'),
    path('index/', views.index, name='index'),
    path('meetinstrumenten/', views.meetinstrumenten, name='meetinstrumenten'),
    path('meldingen/', views.meldingen, name='meldingen'),
    path('mobiliteit/', views.mobiliteit, name='mobiliteit'),
    path('over/', views.over, name='over'),
    path('tillift/', views.tillift, name='tillift'),
    path('tillift_1/', views.tillift_1, name='tillift_1'),
    path('tillift_2/', views.tillift_2, name='tillift_2'),
    path('tillift_3/', views.tillift_3, name='tillift_3'),
    path('under_construction/', views.under_construction, name='under_construction'),
    path('under_construction_1/', views.under_construction_1, name='under_construction_1'),
]
