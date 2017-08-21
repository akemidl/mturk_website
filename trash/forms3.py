from django import forms
import numpy as np
from web_experiments.models import Questionnaire

class FormQuestionnaire(forms.ModelForm):
    
    class Meta:
            model = Questionnaire
    
