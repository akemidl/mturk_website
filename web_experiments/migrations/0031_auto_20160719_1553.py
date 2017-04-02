# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0030_auto_20160714_1456'),
    ]

    operations = [
        migrations.AddField(
            model_name='ambi_trial',
            name='AID',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ambi_trial',
            name='HID',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='MID',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='trial_number',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
    ]
