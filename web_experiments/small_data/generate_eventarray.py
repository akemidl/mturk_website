
import csv
import random 
from itertools import izip
n_instructs = 13 # make sure matches the number of instructions in the java script (poor design but what'evs)
n_trials = 180
breakfreq=10 # how many trials before break. 

####################### EVENT LIST ######################################

row=[]
for i in range(n_instructs):
    row.append('instruct-'+str(i))
    
t=0
while t < n_trials:
    row.append('trial-'+str(t))
    if (t%breakfreq==0)&(t!=0):
        row.append('break')
    t+=1
        
    
row.append('endscreen')

## write to csv
    
with open("eventarray.csv", "w") as output:
    writer = csv.writer(output, lineterminator='\n')
    for val in row:
        writer.writerow([val])   
    
## Test the read 
included_cols=[0] 
content = []
with open('eventarray.csv', 'rb') as f:
    reader = csv.reader(f)
    for row in reader:
            c=list(row[i] for i in included_cols)
            content.append(c[0])
print content




####################### SIDE OF SCREEN ######################################
left=[]
right=[]
for i in range(n_trials):
    r = random.randint(0,1)
    if r ==1:
        left.append('green')
        right.append('blue')  ## green is on left ## 
    else:
        left.append('blue')
        right.append('green') 
        
with open('screenside.csv', 'wb') as f:
    writer = csv.writer(f)
    writer.writerows(izip(left,right))
    
    
    
column=[]
included_cols = [0,1]
with open('screenside.csv', 'rb') as f:
    reader = csv.reader(f)
    for row in reader:
            c=list(row[i] for i in included_cols)
            column.append(c[1])
            print(row)
print(column)
