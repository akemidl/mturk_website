# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_experiments', '0035_auto_20160719_1610'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ambi_trial',
            name='five_trial_outcome',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='mag_left',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='mag_right',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='noresp',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='prop_left',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='prop_right',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='reaction_time',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='received_mag',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='revealed_left',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='revealed_right',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ambi_trial',
            name='totalpoints',
            field=models.CharField(default=b'NaN', max_length=200),
            preserve_default=True,
        ),
    ]
