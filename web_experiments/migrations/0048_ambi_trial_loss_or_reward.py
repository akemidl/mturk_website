# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0047_motiondots_trial2'),
    ]

    operations = [
        migrations.AddField(
            model_name='ambi_trial',
            name='loss_or_reward',
            field=models.CharField(default=b'gain', max_length=200),
            preserve_default=True,
        ),
    ]
