# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0020_auto_20160323_1518'),
    ]

    operations = [
        migrations.AddField(
            model_name='bandit_trial',
            name='order',
            field=models.IntegerField(default=None),
            preserve_default=True,
        ),
    ]
