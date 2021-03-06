# Generated by Django 2.0.4 on 2018-05-07 19:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tnt', '0005_auto_20180418_0122'),
    ]

    operations = [
        migrations.CreateModel(
            name='Floor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('floor', models.IntegerField()),
                ('image', models.ImageField(default='static/tnt/img/no_img.png', upload_to='')),
                ('bottom_left_latitude', models.DecimalField(decimal_places=6, default=0, max_digits=8)),
                ('bottom_left_longitude', models.DecimalField(decimal_places=6, default=0, max_digits=8)),
                ('top_right_latitude', models.DecimalField(decimal_places=6, default=0, max_digits=8)),
                ('top_right_longitude', models.DecimalField(decimal_places=6, default=0, max_digits=8)),
                ('building', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tnt.Building')),
            ],
        ),
        migrations.AlterField(
            model_name='location',
            name='floor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tnt.Floor'),
        ),
    ]
