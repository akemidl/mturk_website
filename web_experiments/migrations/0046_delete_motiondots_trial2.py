# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0045_delete_motiondots_trial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='MotionDots_Trial2',
        ),
    ]
