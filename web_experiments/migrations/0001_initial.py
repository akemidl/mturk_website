# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('PID', models.CharField(max_length=200)),
                ('enter_date', models.DateTimeField(verbose_name=b'date entered')),
                ('completion_code', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Trial',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('enter_date', models.DateTimeField(verbose_name=b'date entered')),
                ('resp', models.CharField(max_length=200)),
                ('rt', models.CharField(max_length=200)),
                ('mag1', models.CharField(max_length=200)),
                ('mag2', models.CharField(max_length=200)),
                ('outcome', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
