"""
Created on 16 Apr 2018

@author: Jos van den Eijnden
"""

import os
import json
from tnt.models import RfDevice, RfDeviceProduct, RfDeviceType, Floor, Location
from pprint import pprint
from SCHAT.settings import STATIC_ROOT


def get_devices():
    empty_set = False
    # TODO: implement REST API
    device_list = json.load(open(os.path.join(STATIC_ROOT, 'tnt', 'RfDeviceList.json')))

    # check for empty query set
    if not RfDevice.objects.exists():
        empty_set = True

    for device in device_list:
        if empty_set or not RfDevice.objects.filter(pk=device['Id']).exists():
            empty_set = False
            # TODO: won't work with multiple IDs
            details = json.load(open(os.path.join(STATIC_ROOT, 'tnt', '2.json')))
            RfDevice.objects.create(pk=details['Id'],
                                    code=details['RfCode'],
                                    type=RfDeviceType.objects.get(pk=details['RfDeviceTypeId']),
                                    low_battery=device['HasLowBatt'])
    return True


def get_lists():
    # TODO: implement REST API
    details = json.load(open(os.path.join(STATIC_ROOT, 'tnt', '2.json')))

    for device_type in details['RfDeviceTypes']:
        if not RfDeviceType.objects.filter(pk=device_type['Id']).exists():
            RfDeviceType.objects.create(pk=device_type['Id'],
                                        display_text=device_type['DisplayText'])

    for product in details['RfDeviceProducts']:
        if not RfDeviceProduct.objects.filter(pk=product['Id']).exists():
            RfDeviceProduct.objects.create(pk=product['Id'],
                                           display_text=product['DisplayText'])

    for location in details['Locations']:
        if not Location.objects.filter(pk=location['Id']).exists():
            Location.objects.create(pk=location['Id'],
                                    name=location['DisplayText'],
                                    floor=Floor.objects.get(pk=2))


# def get_passages():
#     details = json.load(open(os.path.join(STATIC_ROOT, 'tnt', '2.json')))
#
#     for passage in details['LocationPassageses']:

