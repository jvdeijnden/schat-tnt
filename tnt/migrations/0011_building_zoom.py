# Generated by Django 2.0.4 on 2018-05-16 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tnt', '0010_auto_20180516_1839'),
    ]

    operations = [
        migrations.AddField(
            model_name='building',
            name='zoom',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
