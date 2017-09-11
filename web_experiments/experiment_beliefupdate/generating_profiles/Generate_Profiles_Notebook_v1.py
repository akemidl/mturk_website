


#### DOES NOT WORK RIGHT NOW -- DB Hangs ####

import argparse
parser = argparse.ArgumentParser()
parser.add_argument("date", help="need a date like 2017-09-05")
args = parser.parse_args()

#date = '2017-09-05'
date = args.date

# In[2]:

import MySQLdb
import json
import os
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
#get_ipython().magic('matplotlib inline')


# In[3]:

db=MySQLdb.connect(host="christest.c5s5wgavsyu2.us-west-2.rds.amazonaws.com",user="christest",
                  passwd="gags1313",db="chrisdb")


# In[4]:

# get the header
db.query("""SELECT column_name FROM information_schema.columns WHERE table_name = 'web_experiments_participant'""")
r=db.store_result() # sends the whole results
header = r.fetch_row(0)
header = [hh[0] for hh in header]
print(header)


# In[21]:

# get MIDs for that day
db.query("""SELECT * FROM web_experiments_participant WHERE (start_date LIKE '"""+'%'+str(date)+'%'+"""')""")
r=db.store_result() # sends the whole results
rows = r.fetch_row(2000) # there shouldn't be more than 2000

MIDs = []
for row in rows:
    MIDs.append(row[1])
MIDs = list(set(MIDs))
MIDs


# In[24]:

MIDs_copy = MIDs[:]
for MID in MIDs:

    failed_mid =False

    # create folder for subject
    directory = 'session1/'+str(MID)+'/'
    if not os.path.exists(directory):
        os.makedirs(directory)

    for resp in ['work_style_questions','self_describe_page','sat_grades_entry']:

        # get session 1 data for each trial
        db.query("""SELECT responses FROM web_experiments_beliefupdate_trial WHERE (save_time LIKE '"""+'%'+str(date)+'%'+"""') AND (MID='"""+str(MID)+"""') AND (session ='"""+str(1)+"""') AND (trial_name='"""+resp+"""')""")
        r=db.store_result() # sends the whole results
        rows = r.fetch_row(100)
        if len(rows)==1:
            response_dict = eval(rows[0][0])


            # save to json
            with open(directory+resp+'.json', 'w') as fp:
                json.dump(response_dict, fp)
        else:
            # missing something so fail this subject
            failed_mid = True

    if failed_mid:
        print('Failed on MID:'+MID)
        MIDs_copy.remove(MID) # remove subject from list for making plots
        os.removedirs(directory) # remove folder

MIDs = MIDs_copy
print(MIDs)




# In[25]:

for MID in MIDs:

    # load data
    with open(directory+'work_style_questions.json', 'r') as f:
        ws_dict = json.load(f)

    # process
    x = [round(int(ws_dict['Q'+str(q)])-1.5) for q in range(7)]
    print(x)
    y = [str(q) for q in range(7)]
    print(y)

    options = []
    options.append(['autonomous worker','group worker'])
    options.append(['sets deadlines','likes deadlines set'])
    options.append(['advice seeker','works on own first'])
    options.append(['detailed thinker','big picture thinker'])
    options.append(['analytical thinker','intuitive thinker'])
    options.append(['factual presenter','entertaining presenter'])
    options.append(['keeps short to-dos','long to do'])
    options.append(['detailed planner','adaptive'])

    qs = [options[n][1] if _y >=0 else options[n][0] for n,_y in enumerate(y)]
    print(qs)

    colors = ['blue' for _y in y]

    # plot
    sns.axes_style('white')
    sns.set_style('white')

    ax = sns.barplot(x, y,palette=colors,orient='h',alpha=0.5)
    fig = plt.gcf()
    fig.set_size_inches(4, 5)

    for n, (_, _x,q) in enumerate(zip(y,x,qs)):
        ax.annotate(
            s='{:}'.format(q +'\n (+'+str(abs(_x))+')'),
            xy=(_x,n),
            ha='center',va='center',
            xytext=(np.sign(_x)*40,0),
            textcoords='offset points',
            weight='bold'
        )

        ax.annotate(
            s='',
            xy=(0,n),
            ha='center',va='center',
            xytext=(10,0),
            textcoords='offset points',
        )
    # axes formatting
    ax.set_yticks([])
    ax.set_xticks([])
    sns.despine(ax=ax, bottom=True, left=True)
    ax.set_title('Working Style Profile')
    plt.savefig(directory+'working_style_profile.png',dpi=100)
    #plt.clf()
    #plt.close()


# In[ ]:
