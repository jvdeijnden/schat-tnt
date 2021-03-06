# Generated by Django 2.0.4 on 2018-04-17 23:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tnt', '0004_auto_20180418_0120'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='location',
            name='location_id',
        ),
        migrations.RemoveField(
            model_name='rfdevice',
            name='device_id',
        ),
        migrations.RemoveField(
            model_name='rfdeviceproduct',
            name='product_id',
        ),
        migrations.RemoveField(
            model_name='rfdevicetype',
            name='type_id',
        ),
        migrations.AlterField(
            model_name='location',
            name='id',
            field=models.PositiveIntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='rfdevice',
            name='id',
            field=models.PositiveIntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='rfdeviceproduct',
            name='id',
            field=models.PositiveIntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='rfdevicetype',
            name='id',
            field=models.PositiveIntegerField(primary_key=True, serialize=False),
        ),
    ]
