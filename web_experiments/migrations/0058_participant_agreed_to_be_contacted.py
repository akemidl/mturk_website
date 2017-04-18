# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0057_auto_20170214_1415'),
    ]

    operations = [
        migrations.AddField(
            model_name='participant',
            name='agreed_to_be_contacted',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
