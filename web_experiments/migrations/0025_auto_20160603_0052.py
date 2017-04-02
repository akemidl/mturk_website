# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0024_auto_20160516_0423'),
    ]

    operations = [
        migrations.AddField(
            model_name='bandit_trial',
            name='AID',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='bandit_trial',
            name='HID',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='questionnairemodel',
            name='AID',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='questionnairemodel',
            name='HID',
            field=models.CharField(default=None, max_length=200),
            preserve_default=True,
        ),
    ]
