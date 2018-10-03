from django.contrib import admin

from .models import Building, Category, Floor, Location, Product, Tracker, Passage

admin.site.register(Building)
admin.site.register(Category)
admin.site.register(Floor)
admin.site.register(Location)
admin.site.register(Product)
admin.site.register(Tracker)
admin.site.register(Passage)
