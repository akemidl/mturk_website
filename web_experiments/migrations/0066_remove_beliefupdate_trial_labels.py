# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0065_auto_20170905_2121'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='beliefupdate_trial',
            name='labels',
        ),
    ]
