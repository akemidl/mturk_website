# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0033_auto_20160719_1606'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ambi_trial',
            name='prop_left',
            field=models.FloatField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='prop_right',
            field=models.FloatField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='revealed_left',
            field=models.FloatField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='revealed_right',
            field=models.FloatField(default=0),
            preserve_default=True,
        ),
    ]
