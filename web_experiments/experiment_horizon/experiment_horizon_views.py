
from django.shortcuts import render_to_response, render

# import shared stuff
from web_experiments.models import Participant
from web_experiments.views import *

# import mscl
import numpy as np
import json
import datetime






########################################
############## Horizon ####################

def exp_page_horizon(request,outcome_type):

    tasks = [str(x) for x in request.session['tasks']]

    ## Get same person based on Session Cookie.
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)
    		# need time stamp
    print(outcome_type)


    variables = {}
    variables['outcome_type'] = outcome_type

    ###### Save trial to database #####
    # Get button presses upon subsequent presses
    resp = request.GET.get('resp')
    if resp is not None:
        T = Horizon_Trial(trialstart=request.GET.get('trialstart'),
        start_date=datetime.datetime.now(),
        game_number = request.GET.get('game_number'),
        game_trial_number = request.GET.get('game_trial_number'),
        left_value = request.GET.get('left_value'),
        right_value=request.GET.get('right_value'),
        choice=request.GET.get('choice'),
        fixed=request.GET.get('fixed'),
        reaction_time=request.GET.get('rt'),
        MID=p.MID,
	session_id=p.session_id,
	loss_or_reward=request.GET.get('gametype'),
        totalpoints=request.GET.get('totalpoints'))
        T.save()

    finished=request.GET.get('finished')
    #### Update Progress
    if finished=='1' or finished==1:
        p.progress+=1
	### need time stamp
	p.save()

    return(render_to_response('experiment_horizon.html',variables))
