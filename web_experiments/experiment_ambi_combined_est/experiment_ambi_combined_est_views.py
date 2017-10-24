from django.shortcuts import render_to_response, render

# import shared stuff
from web_experiments.models import Participant, Ambi_Estimation_Trial
from web_experiments.views import *

# import mscl
import numpy as np
import json
import datetime



########################################
############## AMBI ####################

#http://127.0.0.1:8000/?MID=13233&tasks=experiment_ambicombined&cb=1&assign_id=adsfasdf&hit_id=asdfasdf

def exp_page_ambi_combined_est(request):

    print('here')
   # combined gain lossversion
    outcome_type='combined'

    # get task list
    tasks = [str(x) for x in request.session['tasks']]

    ## Get MID  based on Session Cookie, and get same database object
    if request.session['MID'] is not None:
  	# if they exist in the data base, grab their progress and completion code
	if Participant.objects.filter(MID=request.session['MID']).exists():
		repeat_session,p=get_same_participant_session(request,tasks)

		# progress time 2

		ptime = str(p.progress_times2)
		if('ambi combined start' not in ptime):
			ptime = ptime+'ambi combined start:'+str(datetime.datetime.now()) # this is all in seconds #
			p.progress_times2 = ptime
			p.save()


    ### Data to Pass in ###
    variables = {}
    variables['MID']=p.MID
    variables['outcome_type'] = outcome_type

    if 'vp' in p.MID:
        variables['in_person']=True
    else:
        variables['in_person']=False



    # PRACTICE  Data
    params_p=load_ambi_file3(version='2')
    print(params_p)
    variables['mag_l_p']=params_p[0]
    variables['mag_r_p']=params_p[1]
    variables['p_r_p']=params_p[2]
    variables['p_l_p']=params_p[3]
    variables['r_r_p']=params_p[4]
    variables['r_l_p']=params_p[5]
    variables['XOlist_p']=load_ambi_file2('web_experiments/experiment_ambi_combined/trial_orders/colours/colours_toinput_demo_chris_combined.txt')

    # TRIAL DATA
    params=np.loadtxt('web_experiments/experiment_ambi_combined/trial_orders/parameters/Parameters_block_gain_loss_combined_8_21_2017_tweaked_gain_loss_same.csv',delimiter=',',skiprows=1)
    variables['mag_l']=list(params[:,1])
    variables['mag_r']=list(params[:,2])
    variables['p_r']=list(params[:,3])
    variables['p_l']=list(params[:,4])
    variables['r_r']=list(params[:,5])
    variables['r_l']=list(params[:,6])
    with open('web_experiments/experiment_ambi_combined/trial_orders/colours/colours_toinput_simple_combined_8_21_2017.txt') as txt:
    	XOlist = txt.read()
    variables['XOlist']=XOlist


    # save trial data
    resp = request.GET.get('resp')


    if resp is not None:
	print('here')
        T = Ambi_Estimation_Trial(trialstart=request.GET.get('trialstart'),
        start_date=datetime.datetime.now(),
        outcome = request.GET.get('outcome'),
        resp = request.GET.get('resp'),
        trial_number = request.GET.get('currenttrial'),
        received_mag=request.GET.get('received_mag'),
        prop_left=request.GET.get('prop_left'),
        prop_right=request.GET.get('prop_right'),
        reaction_time=request.GET.get('rt'),
        revealed_right=request.GET.get('revealed_right'),
        revealed_left=request.GET.get('revealed_left'),
        mag_right=request.GET.get('mag_right'),
        mag_left=request.GET.get('mag_left'),
	practice=request.GET.get('practice'),
	revealed_o_r=request.GET.get('revealed_o_r'),
	revealed_o_l=request.GET.get('revealed_o_l'),
	revealed_x_r=request.GET.get('revealed_x_r'),
	revealed_x_l=request.GET.get('revealed_x_l'),
        MID=p.MID,
	session_id=p.session_id,
	AID=p.AID,
	HID=p.HID,
	loss_or_reward=outcome_type,
	noresp=request.GET.get('noresp'),
	five_trial_outcome = request.GET.get('five_trial_outcome'),
        totalpoints=request.GET.get('totalpoints'),
	instruct_number=request.GET.get('instruct_number'))

        T.save()

    finished=request.GET.get('finished')
    #### Update Progress
    if finished=='1' or finished==1:
        p.progress+=1
	ptime = str(p.progress_times)
	# progress time 2
	ptime = str(p.progress_times2)
	ptime = ptime+';ambi '+outcome_type+' end:'+str(datetime.datetime.now())
	p.progress_times2 = ptime
	p.save()


    return(render_to_response('experiment_ambi_combined_est.html',variables))


##########################



def load_ambi_file2(fname):
	with open(fname) as f:
		content = f.readlines()
	for cc,c in enumerate(content):
		content[cc]=content[cc].replace('{','').replace('}','').replace('\n','').replace('\r','').split(',')[0:100]

	content = [item for sublist in content for item in sublist]
	content = "".join(content) ## make a big string 100011...
	#print(content)
	return(content)

## just for practice.. easier copying the function rather than allowing different inptu
def load_ambi_file3(version=''):
	newlist=[]
	# version 2 is for combined
	fname = 'web_experiments/experiment_ambi_combined/trial_orders/parameters/input_file_piloting_demo_chris'+version+'.txt'
	with open(fname) as f:
		content = f.readlines()


	#print(content)
	for i in content:
		newlist.append(i.replace('{','').replace('}','').split(','))
	mag_l=[]
	mag_r=[]
	p_l=[]
	p_r=[]
	r_l=[]
	r_r=[]
	for iii in newlist:
		mag_l.append(iii[0])
		mag_r.append(iii[1])
		p_l.append(iii[2])
		p_r.append(iii[3])
		r_r.append(iii[4]) # supposed to be right
		r_l.append(iii[5])
	return([mag_l,mag_r,p_l,p_r,r_r,r_l])


###############################################
