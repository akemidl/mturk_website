from django.shortcuts import render_to_response, render

# import shared stuff
from web_experiments.models import Participant
from web_experiments.views import *

# import mscl
import numpy as np
import json
import datetime


def exp_page_questionnaires(request,survey_name):

    #### Getting Session Information / Updating Participant Table ######
    tasks = [str(x) for x in request.session['tasks']]
    cb = list(request.session['cb'])

    ## Get MID  based on Session Cookie
    if request.session['MID'] is not None:

      	# if they exist in the data base, grab their progress and completion code
    	if Participant.objects.filter(MID=request.session['MID']).exists():
    		repeat_session,participant=get_same_participant_session(request,tasks)

            # updating progress into participant table
    		ptime = str(participant.progress_times2)
    		if('experiment questionnaires start' not in ptime):
    			ptime = ptime+';experiment questionnaires start:'+str(datetime.datetime.now()) # this is all in seconds #
    			participant.progress_times2 = ptime
    			participant.save()


    return(render_to_response('experiment_questionnaires.html'))
