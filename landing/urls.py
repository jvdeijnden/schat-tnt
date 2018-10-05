"""
Created on 03 Oct 2018

@author: Jos van den Eijnden
"""

from django.urls import path

from . import views

urlpatterns = [
    path('', views.landing, name='landing'),
]
