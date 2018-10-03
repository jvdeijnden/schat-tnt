from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django_countries.fields import CountryField

"""
REST API Models
"""


class RfDeviceType(models.Model):
    display_text = models.CharField(max_length=64, default='')
    id = models.PositiveIntegerField(primary_key=True)

    def __str__(self):
        return self.display_text


class RfDeviceProduct(models.Model):
    display_text = models.CharField(max_length=64, default='')
    id = models.PositiveIntegerField(primary_key=True)

    def __str__(self):
        return self.display_text


class RfDevice(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    code = models.PositiveIntegerField(default=0)
    type = models.ForeignKey(RfDeviceType, on_delete=models.CASCADE)
    low_battery = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.id)


"""
TNT Models
"""


class Building(models.Model):
    name = models.CharField(max_length=64, default='')
    address = models.CharField(max_length=64, default='')
    postal_code = models.CharField(max_length=6, default='')
    city = models.CharField(max_length=64, default='')
    country = CountryField()
    image = models.ImageField(default='static/tnt/img/no_img.png')
    latitude = models.DecimalField(max_digits=8, decimal_places=6, default=0)
    longitude = models.DecimalField(max_digits=8, decimal_places=6, default=0)
    zoom = models.PositiveIntegerField(default=0)
    slug = models.SlugField(default='', editable=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)

        super(Building, self).save(*args, **kwargs)


class Floor(models.Model):
    number = models.IntegerField()
    name_text = models.CharField(max_length=64, default='')
    info_text = models.CharField(max_length=200, default='')
    image = models.CharField(max_length=200, default='no_img.png')
    building = models.ForeignKey(Building, on_delete=models.CASCADE)
    bottom_left_latitude = models.DecimalField(max_digits=8, decimal_places=6, default=0)
    bottom_left_longitude = models.DecimalField(max_digits=8, decimal_places=6, default=0)
    top_right_latitude = models.DecimalField(max_digits=8, decimal_places=6, default=0)
    top_right_longitude = models.DecimalField(max_digits=8, decimal_places=6, default=0)

    def __str__(self):
        return self.name_text


class Location(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=64, default='')
    floor = models.ForeignKey(Floor, on_delete=models.CASCADE)
    latitude = models.DecimalField(max_digits=8, decimal_places=6, default=0)
    longitude = models.DecimalField(max_digits=8, decimal_places=6, default=0)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=64, default='')
    image = models.ImageField(default='static/tnt/img/no_img.png')

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    manufacturer_long = models.CharField(max_length=64, default='')
    manufacturer_short = models.CharField(max_length=64, default='')
    product_family = models.CharField(max_length=64, default='')
    product_model = models.CharField(max_length=64, default='')
    image = models.ImageField(default='static/tnt/img/no_img.png')
    product_info_URL = models.URLField()
    slug = models.SlugField(default='', editable=False)
    # tags = TaggableManager()

    def __str__(self):
        return self.manufacturer_short + ' ' + self.product_family + ' ' + self.product_model

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.manufacturer_short + ' ' + self.product_family + ' ' + self.product_model)

        super(Product, self).save(*args, **kwargs)


class Tracker(models.Model):
    product = models.ForeignKey(Product, default=0, on_delete=models.CASCADE)
    rf_device = models.OneToOneField(RfDevice, on_delete=models.CASCADE)

    def __str__(self):
        return 'Product: ' + self.product.__str__() + \
               '\nID: ' + self.rf_device.__str__()


class Passage(models.Model):
    datetime = models.DateTimeField(default=timezone.now)
    tracker = models.ForeignKey(Tracker, default=0, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, default=0, on_delete=models.CASCADE)

    def __str__(self):
        return 'Voorwerp: ' + self.tracker.__str__() + \
               '\nLocatie: ' + self.location.__str__() + \
               '\nTijd:' + str(self.datetime)


class Changelog(models.Model):
    datetime = models.DateTimeField(default=timezone.now)
    major_version = models.PositiveIntegerField()
    minor_version = models.PositiveIntegerField()
    text = models.CharField(max_length=300)
