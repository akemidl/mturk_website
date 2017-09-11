from django.shortcuts import render_to_response, render

# import shared stuff
from web_experiments.models import Participant
from web_experiments.views import *

# import mscl
import numpy as np
import json
import datetime

# import experiment specific data table
from experiment_beliefupdate_models import BeliefUpdate_Trial

def exp_page_beliefupdate(request,session):

    print(session)
    #### Probably want to put a session variable in here ####

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
    		if('experiment beliefupdate'+str(session)+' start' not in ptime):
    			ptime = ptime+';experiment beliefupdate'+str(session)+' start:'+str(datetime.datetime.now())
                participant.progress_times2 = ptime
                participant.which_completion_message=1
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
            Trial = BeliefUpdate_Trial(
                save_time=datetime.datetime.now(),
                rt = item_data['rt'],
                time_elapsed = item_data['time_elapsed'],
                trial_type = item_data['trial_type'],
                trial_index = item_data['trial_index'],
                trial_name = item_data['trial_name'] if 'trial_name' in item_data else 'NaN',
                session_id=participant.session_id,
                session = session,
                AID=participant.AID,
                HID=participant.HID,
                MID=participant.MID,
                key_press = item_data['key_press'] if 'key_press' in item_data else "NaN",
                responses = item_data['responses'] if 'responses' in item_data else "NaN",
                questions = item_data['questions'] if 'questions' in item_data else "NaN",
                labels = item_data['labels'] if 'labels' in item_data else 'NaN',
                tags = item_data['tags'] if 'tags' in item_data else 'NaN',
                view_history = item_data['view_history'] if 'view_history' in item_data else 'NaN',
                pair = item_data['pair'] if 'pair' in item_data else 'NaN',
            )

            Trial.save() # save row to dataset

        # update participants progress (this will then bring the next experiment up)
        participant.progress+=1
        print('progress...')
        print(participant.progress)

        # update partipcant progress times
        ptime = str(participant.progress_times2)
        ptime = ptime+';experiment_beliefupdate'+str(session)+' end:'+str(datetime.datetime.now())
        participant.progress_times2 = ptime
        participant.save()

    #### Optional (Inputing data into Experiment) ######


    variables = {}
    variables['input_variable1']=np.array([0,1,1])

    ### load profiles
    print('session {:}'.format(session))

    if session=='2' or session=='3':

        descriptions = ''
        sat_grades=''
        profile_charts=''
        pairs_str = ''
        feedback_str = '' # session 3

        # load candidates
        if session=='2':
            with open('web_experiments/experiment_beliefupdate/generating_profiles/session2/'+str(participant.MID)+'/pairs_for_comparison.txt', 'r') as f:
                pairs = f.readlines()
        if session=='3':
            with open('web_experiments/experiment_beliefupdate/generating_profiles/session3/'+str(participant.MID)+'/pairs_for_feedback.txt', 'r') as f:
                pairs = f.readlines()
        print(pairs)

        for pi,pair in enumerate(pairs):
            split_pair = pair.split(',')

            if len(split_pair)>2:
                feedback = str(pair.split(',')[2].replace('\n',''))
            else:
                feedback = 'NaN'

            for i in range(2):
                MID = split_pair[i]
                MID = MID.replace('\n','')
                directory = str('web_experiments/experiment_beliefupdate/generating_profiles/session1/'+str(MID)+'/')
                directory_img = str('/static/generating_profiles/session1/'+str(MID)+'/')
                if i ==0:
                    split='SPLIT_MID'
                elif i==1:
                    split='SPLIT_PAIR'

                with open(directory+'self_describe_page.json', 'r') as f:
                     descriptions = descriptions+(str(json.load(f)['Q0']))+split

                with open(directory+'sat_grades_entry.json', 'r') as f:
                    dic = json.load(f)
                    sat_grades = sat_grades +str(','.join([dic['Q'+str(k)] for k in range(len(dic))])) +split

                profile_charts = profile_charts+(directory_img+'working_style_profile.png')+split
                pairs_str = pairs_str+MID+split

            if pi==0:
                feedback_str = feedback
            else:
                feedback_str = feedback_str+','+feedback


        variables['profile_charts'] = profile_charts
        variables['sat_grades'] = sat_grades
        variables['self_describes'] = descriptions
        variables['pair_str']=pairs_str
        variables['feedback_str']=feedback_str

        print(variables['self_describes'])
        print(variables['sat_grades'])
        print(variables['profile_charts'])
        print(variables['pair_str'])
        print('feedback str')
        print('')
        print(variables['feedback_str'])


    return(render_to_response('experiment_beliefupdate_session'+str(session)+'.html',variables))
