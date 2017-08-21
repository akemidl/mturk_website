from django.shortcuts import render_to_response, render

# import shared stuff
from web_experiments.models import Participant
from web_experiments.views import *

# import mscl
import numpy as np
import json
import datetime

# import experiment specific data table
from experiment_example_models import Example_Trial

def exp_page_example(request):

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
    		if('experiment example start' not in ptime):
    			ptime = ptime+';experiment example start:'+str(datetime.datetime.now()) # this is all in seconds #
    			participant.progress_times2 = ptime
    			participant.save()



    #### STORING DATA IN DATABASE AT THE END OF EXPERIMENT ######

    # look for data being stored in the get request (which is called at the end of the exp)
    if 'json' in request.GET:

        exp_data_json = json.loads(request.GET['json']) # this is a list of dictionaries

        # loop through the items (dicts) that jspsych creates (usually trials)
        n_timeline_items = len(exp_data_json)
        for item in range(n_timeline_items):
            item_data = exp_data_json[item]

            # create an example trial row instance
            Trial = Example_Trial(
                save_time=datetime.datetime.now(),
                rt = item_data['rt'],
                trial_type = item_data['trial_type'],
                key_press = item_data['key_press'],
                trial_index = item_data['trial_index'],
                session_id=participant.session_id,
                AID=participant.AID,
                HID=participant.HID,
                MID=participant.MID
            )

            Trial.save() # save row to dataset

        # update participants progress (this will then bring the next experiment up)
        participant.progress+=1

        # update partipcant progress times
        ptime = str(participant.progress_times2)
        ptime = ptime+';experiment_example end:'+str(datetime.datetime.now())
        participant.progress_times2 = ptime
        participant.save()

    #### Optional (Inputing data into Experiment) ######

    variables = {}
    variables['input_variable1']=np.array([0,1,1])


    return(render_to_response('experiment_example.html',variables))
