
from django.shortcuts import render_to_response, render

# import shared stuff
from web_experiments.models import Participant
from web_experiments.views import *

# import mscl
import numpy as np
import json
import datetime


############MOTION DOTS#################

def exp_page_motiondots(request):
    print('here')

    tasks = [str(x) for x in request.session['tasks']]

    ## Get MID  based on Session Cookie, and get same database object
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)

    variables={} #nothing I actually need to input here...

###### Save trial to database #####
    # Get button presses upon subsequent presses

     #resp = request.GET.get('response')
    trialstart=request.GET.get('trialstart')
    print('TESTING')
    print(trialstart)
    if trialstart is not None:
	print('here')
        T = MotionDots_Trial2(
        start_date=datetime.now(),
        response = request.GET.get('response'),
	slider_start_position=request.GET.get('slider_start_position'),
        RT = request.GET.get('rt'),
        trial_type = request.GET.get('trial_type'),
        currenttrial = request.GET.get('currenttrial'),
	numbertrials_elapsed=request.GET.get('numbertrials_elapsed'),
        slider_position_subjectresponse=request.GET.get('slider_position_subjectresponse'),
        slider_position_subjectresponse_array=request.GET.get('slider_position_subjectresponse_array'),
        speed_eachdot=request.GET.get('speed_eachdot'),
        colour_eachdot=request.GET.get('colour_eachdot'),
        true_outcome_colour=request.GET.get('true_outcome_colour'),
        true_outcome_speed=request.GET.get('true_outcome_speed'),
	outcome_bar_position=request.GET.get('outcome_bar_position'),
        trialstart=request.GET.get('trialstart'),
        choicebutton_side=request.GET.get('choicebutton_side'),
	choicemade_array=request.GET.get('choicemade_array'),
        correct=request.GET.get('correct'),
        category_boundary=request.GET.get('category_boundary'),
        last_pressed=request.GET.get('last_pressed'),

	#noresp=request.GET.get('noresp'),
        MID=p.MID,
	    session_id=p.session_id, #Do we have this for motion dots? Same with AID and HID...
	    AID=p.AID,
	    HID=p.HID)

        T.save()

    print('MID= '+str(p.MID))
    print('progress= '+str(p.progress))

    finished=request.GET.get('finished')
    #### Update Progress
    if finished=='1' or finished==1:
        p.progress+=1
	ptime = str(p.progress_times)
	p.progress_times = ptime
	p.save()

    return(render_to_response('experiment_motiondots_django.html',variables))



############MOTION DOTS COLOUR and SPEED#################

def exp_page_motiondots_colourspeed(request):
    print('here')

    tasks = [str(x) for x in request.session['tasks']]

    ## Get MID  based on Session Cookie, and get same database object
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)

    variables={} #nothing I actually need to input here...

###### Save trial to database #####
    # Get button presses upon subsequent presses

     #resp = request.GET.get('response')
    trialstart=request.GET.get('trialstart')
    print('TESTING')
    print(trialstart)
    if trialstart is not None:
	print('here')
        T = MotionDots_ColourSpeed_Trial(
        start_date=datetime.now(),
        response = request.GET.get('response'),
        RT = request.GET.get('rt'),
        trial_type = request.GET.get('trial_type'),
        currenttrial = request.GET.get('currenttrial'),
	numbertrials_elapsed=request.GET.get('numbertrials_elapsed'),
        speed_eachdot=request.GET.get('speed_eachdot'),
        colour_eachdot=request.GET.get('colour_eachdot'),
        true_outcome_colour=request.GET.get('true_outcome_colour'),
        true_outcome_speed=request.GET.get('true_outcome_speed'),
        trialstart=request.GET.get('trialstart'),
        choicebutton_side=request.GET.get('choicebutton_side'),
	choicemade_array=request.GET.get('choicemade_array'),
        correct=request.GET.get('correct'),
        category_boundary_speed=request.GET.get('category_boundary_speed'),
        category_boundary_colour=request.GET.get('category_boundary_colour'),
        last_pressed=request.GET.get('last_pressed'),
	#speed_array_thistrial=request.GET.get('speed_array_thistrial'),
	#rb_array_thistrial=request.GET.get('rb_array_thistrial'),
	#rc_array_thistrial=request.GET.get('rc_array_thistrial'),
	random_numbers_array=request.GET.get('random_numbers_array'),

	#noresp=request.GET.get('noresp'),
        MID=p.MID,
	    session_id=p.session_id, #Do we have this for motion dots? Same with AID and HID...
	    AID=p.AID,
	    HID=p.HID)

        T.save()

    print('MID= '+str(p.MID))
    print('progress= '+str(p.progress))

    finished=request.GET.get('finished')
    #### Update Progress
    if finished=='1' or finished==1:
        p.progress+=1
	ptime = str(p.progress_times)
	p.progress_times = ptime
	p.save()

    return(render_to_response('experiment_motiondots_colourspeed_django.html',variables))
