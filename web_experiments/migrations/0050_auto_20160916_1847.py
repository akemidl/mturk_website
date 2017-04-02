# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0049_auto_20160916_1842'),
    ]

    operations = [
        migrations.AddField(
            model_name='ambi_trial',
            name='revealed_x_l',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ambi_trial',
            name='revealed_x_r',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
    ]
