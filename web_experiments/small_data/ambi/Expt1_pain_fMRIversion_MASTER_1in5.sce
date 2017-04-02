##NOTE: Noughts are the same as 'red' in old version, crosses are same as 'blue' in old version

#######!!!!!!!!Note that before begin for fMRI, need to have the button codes set in Presentation settings to what
#######!!!!!!!!they should be for the button box in the scanner rather than for this laptop version... 

###Codes for Biopac and shock box noting time points and sending shocks over the pins in parallel port
#Shock machine uses pin 1 in Oxford
#Biopac uses pins 2 and 3 in Oxford

#Shock delivered: code 1 : Duration: 5 (Pin 1)

#Biopac:sending timings that each screen is presented:
#Screen 1: ITI :  code 2 : Duration: 20 (Pin 2) 
#Screen 2: Information presented (Urns shown, decision period):  code 2 : Duration: 50(Pin 2)
#Screen 3: Choice time (Question mark):  code 2 : Duration: 100 (Pin 2)
#Screen 4: Participant choice displayed/ISI :  code 4: Duration:20 (Pin 3)
#Screen 5: Outcome displayed : code 4 : Duration: 50 (Pin 3)
#Screen 6: Outcome history displayed (once every ten trials):  code 4 : Duration: 100(Pin 3)
#Screen 7: Shock to be delivered displayed (once every ten trials):  code 6 : Duration: 20(Pins 2 and 3)
#Screen 8: Extended ITI following shock:  code 6 : Duration: 50 (Pins 2 and 3)
#Screen 9: Break screen: code 6: Duration: 100 (Pins 2 and 3)

#Button codes
active_buttons=2;
button_codes=11,22; 
# buttons should be set, on response tab (in this order) to:
# 1, 2,5 (for simulating scanner triggers)

# screen tweak
default_background_color = 255,255,255; # white

#####!!!!!!!!!! Need more screen tweak parameters here to ensure that the Eye tracker and Presentation are working the same and talking to each other properly...

#Need to tell it that the screen I'm presenting it on...am I doing it by visual angle? Check help- need to give Presentation the right units of screen size and distance of participant from screen- visual angle or centrimeters...need to tell it.
#Eyelink works in terms of visual angle...

###Settings added for the FMRI: taken from Laleh/Amal's code...
scenario_type = fMRI_emulation; #comment this for real thing. This is so we can test it without actually running fMRI    
scan_period = 3000; #used in emulation mode, time interval, in msec, between the main pulses emulated by Presentation.  1st emulated main pulse will be at scenario time 0.
#scenario_type = fMRI;

pulse_code = 222; #For Presentation logfile: used to id scanner TTL in logfile
pulses_per_scan = 1; #For Presentation logfile to record when each trigger comes from the scanner. If the value is N, Pres will record 1st pulse, then skip the next N-1 pulses before recording the next pulse. 

#stimulus_properties = name, string, resp_type, number, resp_time, number; #I don't think I need these...
#event_code_delimiter = "\t"; #Don't need this I think...
#response_matching = simple_matching; #Don't need this I think...

response_port_output = false;   #determines if response events generate port output associated with those events

#Uncomment to write codes: this makes sure that the timings for the start of each screen are sent to the files recording the eye tracker and biopack stuff...so we know the timings for the data and can record the epochs correctly...
write_codes = true; #to write codes to an output port that depend on the event value of port_code will be written to the output port at the occurance of all stimuli for which port_code is defined
#When responses occur, the codes given in either button_codes or target_button_codes will be used

#==========================================================================================================================================
# declare stimuli in SDL
#Declare and initialise variables

##For the logfile we also need each picture to be called with a default_code so it has a name in the logfile for when it's presented...
##though as we are running it in loops, would it just record this on every iteration then??!
begin;

#### For eyelink
###THIS BIT IS ALL THAT IS NEEDED IN THE SCENARIO FILE FOR THE EYETRACKER...

picture{
   background_color = 127,127,127; #####Note that Mike has 127,127,127 in his sce here for Mike Tim Task...which one suits Berkeley eye tracker??
}et_calibration;


text{caption="magnitude_left";font_size=40; font_color=0,0,0,127;} magnitude_left; #will provide info on magnitude value of noughts in left urn 
text{caption="magnitude_right";font_size=40 ; font_color=0,0,0,127;} magnitude_right; #will provide info on magnitude value of noughts in right urn
text{caption="Too slow! Computer has randomly selected for you"; font_size=40; font_color=255,255,255;} feedbackchoice_text;
text{caption="Computer choice"; font_size=40; font_color=255,255,255;} computerchoice_text; 
text{caption="X"; font_size=20; font_color=0,0,0,128;} urn_tokens_x;
text{caption="O"; font_size=20; font_color=0,0,0,128;} urn_tokens_o;
text{caption="!"; font_size=20; font_color=0,0,0,128;} urn_tokens_exc;
text{caption="="; font_size=20; font_color=0,0,0,128;} urn_tokens_equal;
text{caption = "+"; font_size = 40; font_color=0,0,0,127;}fixationcross;
text{caption="?"; font_size = 40; font_color=0,0,0,127;}questionmark;

box {height=105; width=105; color=127,127,127;}outcome_box; #box which indicates which urn was chosen.
box {height=85; width=85;}outcome_box_border;
box{height=1; width= 50; color=127,127,127;}reward_bin1;
box{height=1; width=50; color=127,127,127;}reward_bin2;
box{height=1;width=50; color=127,127,127;}reward_bin3;
box{height=1;width=50; color=127,127,127;}reward_bin0;
box {height=100; width=70; color=255,255,255;}result_box; #box which indicates which urn was chosen. 
box {height=120; width=90; color=127,127,127;}result_boxoutline;
#box {height=10;width=10;color=127,127,127;} origin; #for visualising where items are on screen relative to the origin...

text{caption="X";font_size=50; font_color=127,127,127,127;} feedback_graphic;
text{caption="Zeros=Shock";font_size=25; font_color=127,127,127,127;} NoughtsEqualsShock;

#baseline picture: #THIS WILL BECOME SCREEN 1
picture{
text{caption = "+"; font_size = 40; font_color=0,0,0,127;};
	x = 0; y = -80; 
}default;


#breaktime picture: 
picture{
	text{caption = "Please take a break.\n Press 1 or 2 when you wish to continue"; font_size = 40; font_color=0,0,0,127;}breaktext;
	x = 0; y = 0;
}break_picture;

#result picture every 10 trials: 
picture{
	text{caption = " "; font_size = 25; font_color=0,0,0,127;}result_text;
	x = 0; y = 0;
}result_picture;

picture{} urn; #includes the 'left urn', the 'right urn', and the magnitude info later on...

#=======================================================================================================================================
begin_pcl;

preset string subID;
preset bool EyeTracker = false; #This is to toggle between Eyetracker code being used or not...add as preset

preset string section_number; #This is whether it is section 1,2,3 or 4...will be used to call different parameter files...

#Need to include all the possible input parameter and timing files for all of the sections
include "colours/colours_toinput.txt"; #calling colours array that changes the positions of the tokens in the urns- sets so same for everyone...
#include fname; #calling colours array that changes the positions of the tokens in the urns- sets so same for everyone...
#include "colours_toinput_" + section_number + ".txt"; #calling colours array that changes the positions of the tokens in the urns- sets so same for everyone...
include "parameters/input_file_piloting.txt"; #calling variables from the array
include "timings/Timings_all.txt"; #Calling durations for each screen from the array...

output_file mylogfile = new output_file; #Creating output file for variables to be written to
mylogfile.open("Expt1Pain_Behaviour_" + subID + "_" +section_number + ".txt"); #Could change here to save in different folder?

######################Define Output Port#########################################

if (output_port_manager.port_count() == 0) then
   term.print( "Forgot to add an output port!" )
end;
output_port oport = output_port_manager.get_port( 1 );

##########################################################################################
int shock_amount;
int shockdel=0;   ##  checks number of shocks actually delivered
int nshocklev=0;

###################################Load shock lookup table into variable##############################
array <int> shocklook[0];

input_file shocklookup = new input_file;
#UNCOMMENT BELOW FOR BERKELEY...
#shocklookup.open("../sub_test1/"+subID+"_pain_scale.dat",bool(1)); 
shocklookup.open(subID+"_pain_scale.dat",bool(1)); 
loop until
   shocklookup.end_of_file()
   || !shocklookup.last_succeeded()  
begin
   nshocklev = nshocklev + 1;
   shocklook.add(shocklookup.get_int());
   if !shocklookup.last_succeeded() then
    nshocklev=nshocklev-1;
   end;
end;

if !shocklookup.end_of_file() then
 exit( "Problem Loading Shock Lookup\n" )
end; 

shocklookup.close();
#============================================================================================================================
#Variables for the expt===================================================================================================================

## fMRI wait for trigger variables
#Might need to change the below for my settings- and might not need all of it...


#NEED TO UNCOMMENT FOR BERKELEY...
int FMRI_TRIGGER_COUNT = 5; #num of pulses it waits at beginning and end, 5 normally but if you want it to last less use 1. Need this to be T for Berkeley??
int theprevtrigger = 0;
int thecurrtrigger = 1;
int mytrigger = 1;
int trigger_time = 0;

## output variables (ports, files etc)
int send_pulse=0; 
string msg = "";  #Need to this initiate the message we will send to the eye tracker when each screen is presented...
int thepin = 2; #this is the code for Biopac (the number that needs to be sent) #need to initialise these here??! Same in Berkeley and Oxford?
int thewidth = 20;
string logout = "";
string timedatestamp1 = date_time("hhnnddmmyy") ; #Need this to use in naming the file below...
string tracker_directory = "";


##Uncomment for eyetracker
## make tracker directory 
eye_tracker tracker;

#open edf file on the tracker.
string edf_nameonETcomp = "init";
string edf_name = "init.edf"; 

if EyeTracker then
tracker_directory = logfile_directory; #I can change this name
/*if !directory_exists(tracker_directory) then
	create_directory(tracker_directory);
end;
*/

##Uncomment for eyetracker

#####################################Initialise Eyelink#############################################
tracker = new eye_tracker( "PresLink" );

int dheight = display_device.height(); #need to check where this is coming from and if it matches my screen measurements...
int dwidth  = display_device.width();

#connect to Eyelink tracker.
tracker.start_tracking(); #Note that this doesn't start recording, only starts the connection between the Eyelink computer and Stim1...

string tracker_ver = tracker.get_parameter("tracker_version");

##Mike doesn't have this bit to change the name of the file...
#ToDO figure out how to get sess nb and sub ID etc 


edf_name = "Ambi_" + subID + "_" + "block" + section_number + "_" + timedatestamp1 + ".edf";
edf_nameonETcomp = subID + "_A_" + section_number;

term.print(edf_name);
mylogfile.print("Eyetracker File is:\t" + (edf_name));

tracker.set_parameter("open_edf_file",edf_nameonETcomp);

#tracker.send_command("button_function 5 'accept_target_fixation'");  ## You can try and use this to accept fixation from laptop
#set preamble;
#tracker.send_command("add_file_preamble_text 'Emma_Ambi_Task'");

### This generates data on screen resoultion etc and puts it at the start of the edf file
string msg_res = "0 0 ";
        msg_res.append(string(dwidth-1));
        msg_res.append(" ");
        msg_res.append(string(dheight-1));

string msg_coord = "DISPLAY_COORDS 0 0 ";
                msg_coord.append(string(dwidth-1));
                msg_coord.append(" ");
                msg_coord.append(string(dheight-1));
                
tracker.set_parameter("screen_pixel_coords", msg_res);
tracker.send_message(msg_coord); 

#Need to read up on checking that these are the parameters we are interested in...
tracker.set_parameter("file_sample_data","LEFT,RIGHT,GAZE,AREA,GAZERES,STATUS,HTARGET,INPUT");  ## need to check this makes sense- this is the same in both Mike and Laleh's files...

##### Calibrate eye tracker
#clear out the default calibration target so that we don't get data from previous drawing.
        et_calibration.set_background_color(150,150,150);
        et_calibration.clear(); 
        et_calibration.present();
        
        #start calibration with camera support
        tracker.calibrate( et_calibrate_default, 1.0, 0.0, 0.0 );
end;
/*
################Variables for the experiment####################################
#Might need to use the values below for the expt...or might need to copy more over from Laleh's code 

		int thewidth = 20; #these are to send the codes to the Biopac file when each screen is shown. Initialise here and then change before the presentation of each screen :-)
		int thepin = 1; #This has been set to be 2 above...
		string trial_code = "";

*/

int n=100; # number of balls in both urns
int ntrials=50; #number of trials in a block
int t=1; #t changes on each trial
int array_index=1; #this is to be reset every 10 trials at the moment- chose an outcome from every 10 trials to randomly be rewarded...

int timeout_choice=5000; #time during which subjects may choose which to bet on, in milliseconds
int warningtime_duration=1000; #Time before the end of the choice period when the question mark goes dark and they need to press their choice.

bool question_mark=false;
bool reveal=false; #boolean which tells the response loop when to stop running (when changed to true) 
bool risky_trial=false;

#variables for the loops specifing the position of the tokens in the array
double j=0.0; 
double m=0.0;
int M=1; #variables for sorting to left and right when ordering tokens
int N=0;
int R=0;
int x_coord_variable=0;

#defining font sizes for the magnitude information #DON'T NEED ALL OF THESE IN NEW VERSION...Need to come back and remove some...
double mr1=40.0;
double mr2=90.0;
double mr=40.0;
double br_left=40.0;
double br_right=90.0;
double br=40.0;
double magnitude_ref_double=50.0;

double p_left=input_file_piloting [int(section_number)][t][4]; #proportion of crosses on the left
double p_right=input_file_piloting [int(section_number)][t][3]; #proportion of crosses on the right
double pr=input_file_piloting [int(section_number)][t][5]; #proportion of the balls that are revealed (ie not 'covered' by "!") initially on the right urn
double pr_left=input_file_piloting [int(section_number)][t][6]; #proportion of the balls that are revealed (ie not 'covered' by "!") initially on the left

double UrnsPresented_duration=Timings_all[int(section_number)][t][2]; #Screen '2'
double ChoiceTime_duration=Timings_all[int(section_number)][t][3];
double ChoiceDisplayed_duration=Timings_all[int(section_number)][t][4];
double OutcomeDisplayed_duration=Timings_all[int(section_number)][t][5];
double ITI_duration=Timings_all[int(section_number)][t][1]; #Screen '1'
double OutcomeHistoryDisplayed_duration=Timings_all[int(section_number)][t][6]; #Only every 10 trials...
double ShockOutcomeDisplayed_duration=Timings_all[int(section_number)][t][7];
double ExtraITI_duration=Timings_all[int(section_number)][t][8];

int outcome_box_x=-300;
int outcome_box_border_x=-300;
bool outcome_icon=false;

#shoudl be able to remove these later...
int R_total=0; #If we want to display how may points they have accumulated- probably don't need this now...
double points=1.0; #number of reward points they have accumulated (sum of all outcomes over trial)
string R_total_caption="0";

#Variables for the bins displayed at the top of the screen...
int height_rewardbin1=1;
int height_rewardbin2=1;
int height_rewardbin3=1;
int height_rewardbin0=1;
int y_rewardbin1=1;
int y_rewardbin2=1;
int y_rewardbin3=1;
int y_rewardbin0=1;
int number_bin1=0;
int number_bin2=0;
int number_bin3=0;
int number_bin0=0;
#========================================================================================================================================
#CREATING AN ARRAY TO REPRESENT THE BALLS IN BOTH URNs
array <int> colours [n]; #creating an array called colours with n zeros initially for the n balls- some will be turned into ones later to represent the other colour
array <double> x [n]; array <double> y [n]; #creating an nxn array for the x and y coords for each of the balls
array <double> outcomes[5];

##MAKE ARRAY SUCH THAT x AND Y POSITIONS ARE APPROPRIATE...
#loop for positions of right urn
loop int i=1; 
until i> n/2
begin
	x[i]=80.0+30.0*j;
	y[i]=-230.0+30.0*m;
		j=j+1.0;

		if mod(i,5)==0 then j=0.0; m=m+1.0;
		end;
	
	i=i+1;
end;

j=0.0;
m=0.0;

#loop for positions of left urn
loop int i=n/2+1;  
until i> n
begin
	x[i]=-200.0+30.0*j;
	y[i]=-230.0+30.0*m;
		j=j+1.0;

		if mod(i,5)==0 then j=0.0; m=m+1.0;
		end;
	
	i=i+1;
end;
	
#========================================================================================================================================
int numshock=0; ## this is a counter for the number of shocks given
int numberofshocks=numshock;
int shockadmin=111111; ## this is the number of shocks which should be given

##################################Deliver shock Subroutine #####################################################################
sub  int variable_shock( int cumulativeshock)
begin
	numshock=0; ## this is a counter for the number of shocks given
	shockadmin=1; ## this is the number of shocks which should be given
	### First use the shock look up table to convert the value of the shocks to a number to deliver

	loop
	until shocklook[shockadmin]>=cumulativeshock
	begin
		shockadmin=shockadmin+1;
	end;
				### Then administer shock
				loop
				until numshock>=shockadmin-1  ###  the first number is always 0, so shocking to shockadmin-1 means the lowest level is 1 shock
				begin
					oport.send_code( 64, 5 );
					logfile.add_event_entry("shock delivered");
					wait_interval( 12 );
					numshock=numshock+1;
				end;
				
				numberofshocks=numshock;
				return numshock;		
end;
#============================================================================================================================================
##MAKE URN SUBROUTINE
sub make_urn #subroutine-defined here and then called later on in the script. This subroutine makes all of the dots and the 'themometer'
begin
	urn.clear(); #remove urn from previous run
	urn.add_part(magnitude_left, -145, 145); #magnitude info for the two coloured dots- these will need to be redefined on each trial from matrix.
	urn.add_part(magnitude_right, 145, 145);
	urn.add_part(NoughtsEqualsShock,0,-300);
	urn.add_part(fixationcross,0,-80);
	
	##Reward Bins
	height_rewardbin1=10*number_bin1;
	height_rewardbin2=10*number_bin2;
	height_rewardbin3=10*number_bin3;
	height_rewardbin0=10*number_bin0;
	
	if height_rewardbin1==0 then height_rewardbin1=1;end;
	if height_rewardbin2==0 then height_rewardbin2=1;end;
	if height_rewardbin3==0 then height_rewardbin3=1;end;
	if height_rewardbin0==0 then height_rewardbin0=1;end;
	
	y_rewardbin1=250+height_rewardbin1/2; 
	y_rewardbin2=250+height_rewardbin2/2;
	y_rewardbin3=250+height_rewardbin3/2;
	y_rewardbin0=250+height_rewardbin0/2;
	
	reward_bin1.set_height(height_rewardbin1);	#Change height of reward bins according to outcome...
	reward_bin2.set_height(height_rewardbin2);
	reward_bin3.set_height(height_rewardbin3);
	reward_bin0.set_height(height_rewardbin0);

	urn.add_part(reward_bin1,-10,y_rewardbin1); #Add reward bins
	urn.add_part(reward_bin2,70,y_rewardbin2);
	urn.add_part(reward_bin3,150,y_rewardbin3);
	urn.add_part(reward_bin0,-150,y_rewardbin0);

######################adding tokens to urns###############		
M=1; #moving along x-coords left hand side
N=0; #moving along x-coords right hand side
R=0; #moving through urn
	
	#Adding balls to urn using positions and colours defined in arrays above
	loop int i=1; until i>n begin;
	
int a=int(double(n/2)*pr);
		#RIGHT URN
	if i<=int(double(n/2)*pr) then # if dot is in % revealed. pick colour from array that will be repopulated before this subroutine is called below. The array will then have the shuffled red and blue balls as zeros and ones.
			if colours[i]==1 then x_coord_variable=M+(R*5); M=M+1;urn.add_part(urn_tokens_x,int(x[x_coord_variable]),int(y[i])); #urn_tokens.set_caption("X");
			elseif colours[i]==0 then 
				if mod(a,5)==0 then x_coord_variable=(5-N)+(R*5); N=N+1; urn.add_part(urn_tokens_o,int(x[x_coord_variable]),int(y[i])); #urn_tokens.set_caption("O");
				elseif mod(a,5)!=0 then
					if a-(R*5)<5 then x_coord_variable=(a-N); N=N+1; urn.add_part(urn_tokens_o,int(x[x_coord_variable]),int(y[i])); #urn_tokens.set_caption("O");
					elseif a-(R*5)>5 then x_coord_variable=(5-N)+(R*5); N=N+1; urn.add_part(urn_tokens_o,int(x[x_coord_variable]),int(y[i])); #urn_tokens.set_caption("O");
					end
				end;
			end; 
				if mod(i,5)==0 then M=1; N=0; R=R+1; 
				end;
	elseif i>int(double(n/2)*pr) && i<=(n/2) then urn.add_part(urn_tokens_equal,int(x[i]),int(y[i])); if mod(i,5)==0 then M=1; N=0; R=R+1; end; # random start positions for individual dots # add the new dot to the main stimulus

		#LEFT URN
	elseif i>n/2 && i<=n then 
		if i==(n/2)+1 then   ##RESETTING FOR 'LEFT URN'...
		M=1; #moving along x-coords left hand side
		N=0; #moving along x-coords right hand side
		R=10; #moving through urn
		end;

	int b=int(double(n/2)*pr_left);
		if i<=int(double(n/2)*pr_left)+n/2 then # if dot is in % revealed. pick colour from array that will be repopulated before this subroutine is called below. The array will then have the shuffled red and blue balls as zeros and ones.
			if colours[i]==1 then x_coord_variable=M+(R*5); M=M+1;urn.add_part(urn_tokens_x,int(x[x_coord_variable]),int(y[i])); #urn_tokens.set_caption("X");
			elseif colours[i]==0 then 
				if mod(b,5)==0 then x_coord_variable=(5-N)+(R*5); N=N+1; urn.add_part(urn_tokens_o,int(x[x_coord_variable]),int(y[i])); #urn_tokens.set_caption("O");
				elseif mod(b,5)!=0 then
					if b-(R*5)<5 then x_coord_variable=((b-N)+n/2); N=N+1; urn.add_part(urn_tokens_o,int(x[x_coord_variable]),int(y[i])); #urn_tokens.set_caption("O");
					elseif b-(R*5)>5 then x_coord_variable=(5-N)+(R*5); N=N+1; urn.add_part(urn_tokens_o,int(x[x_coord_variable]),int(y[i])); #urn_tokens.set_caption("O");
					end
				end;
			end; 
				if mod(i,5)==0 then M=1; N=0; R=R+1; 
				end;
	elseif i>(int(double(n/2)*pr_left) + n/2) && i<=(n) then urn.add_part(urn_tokens_equal,int(x[i]),int(y[i])); if mod(i,5)==0 then M=1; N=0; R=R+1; end; # random start positions for individual dots # add the new dot to the main stimulus
	
end;
end;

		i=i+1;
	end;
	
	#urn.add_part(origin,0,0); #just had this to see where the urns where positioned relative to the middle of the screen...
	
	#Add question mark so participants know that they can make their decision now...
	if question_mark==true
		then urn.add_part(questionmark,0,80);
		end;
	
	#Add highlighting box once they have made their choice.
	if reveal==true
	then  
	urn.remove_part(1);urn.remove_part(1); 
	urn.add_part(outcome_box,outcome_box_x,145);
	urn.add_part(outcome_box_border,outcome_box_border_x,145);
	urn.add_part(magnitude_left, -145, 145); 
	urn.add_part(magnitude_right, 145, 145);
	end;
	
	#Give them feedback as they are getting shocked (or not shocked!)
	if outcome_icon==true
	then 
		urn.add_part(feedback_graphic,0,145);
	end;
	
end;

####################################################################################################################
##################################################################################################################

#### Get Eye Tracker Going#############################	
#Note that this will only happen if tracker has been set to true by having Eyetracker bool set to true at the start...
# Always send a TRIALID message before starting to record.
# It should contain trial condition data required for analysis.
if EyeTracker then
msg = "Begining Task";
tracker.send_message(msg); #sends to the edf file (like the logfile)

#set the the tracker to idle mode.
tracker.send_command("set_idle_mode"); #Eyetracker needs time to get going. The send comand tells eye tracker to do something
#give some time for the tracker to switch mode.
wait_interval(50);
        
#start recording
tracker.set_recording(true); #will start recording...for me probably want this to go for whole experiment from here...)
end;


##Wait for scanner trigger
######################################Wait for trigger pulse (MRI mode)###################################
logout = "Scanner Trigger at times:";

loop
until 	
	(pulse_manager.main_pulse_count() > FMRI_TRIGGER_COUNT)
begin
	thecurrtrigger = pulse_manager.main_pulse_count();
	if thecurrtrigger != theprevtrigger then
		trigger_time = pulse_manager.main_pulse_time(thecurrtrigger);
		logout.append("\t" + string(trigger_time));
		theprevtrigger = thecurrtrigger;
	end;
	
end;

thecurrtrigger = pulse_manager.main_pulse_count();
trigger_time = pulse_manager.main_pulse_time(thecurrtrigger);
logout.append("\t" + string(trigger_time)+ "\n");

mylogfile.print(logout);
logout = "";

####################################Write Headers for Log File####################################
mylogfile.print( " br\t p_left\t p_right\t pr\t pr_left\t magnitude_left\t magnitude_right\t UrnsPresented_duration\t ChoiceTime_duration\t ChoiceDisplayed_duration\t OutcomeDisplayed_duration\t ITI_duration\t OutcomeHistoryDisplayed_duration\t ShockOutcomeDisplayed_duration\t ExtraITI_duration\t time_urns_presented\t time_button_press\t time_participant_choice_presented\t token_chosen_presented_time\t shock_time\t resultpicture_time\t time_ITI_begin\t time_Extra_ITI_begin\t trial number\t choice time\t participantsbet\t computerchoice_outcome\t did_right_win\t did_left_win\t numberofshocks\t outcome_chosen\t outcome\t numberbin1\t numberbin2\t numberbin3\t numberbin0\t outcome_intoarray\t result_given1in10\t breaktime\t length_break\t FIRST_ITI_start\t ITI_start\t UrnsPresented_start\t QuestionMark_start\t ButtonPress_start\t ChoiceDisplayed_start\t Outcome_start\t OutcomeHistoryDisplayed_start\t ShockOutcomeDisplay_start\t Shock_start\t ExtraITI_start\t Trial_starttime\n ");

########################
#Add text to default screen now so shown for all of the ITIs...
default.add_part(NoughtsEqualsShock,0,-300);

#*************************************************************************************************************************
#*************************************************************************************************************************
#########################################################################################################################
#***************************************************************************************************************************
#***************************************************************************************************************************
# TRIAL LOOP*********************************** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!***********************************=========================================================================================================================

loop t=1;
until t>ntrials
begin
	
	int trial_starttime=clock.time(); #SUBTRACT FROM CLOCK TIMES LATER
	logfile.add_event_entry("trial_" + string(t) + "_onset");
	
		##Uncomment for eyetracker- this is to send the message to the eyetracker what trial we are on...
	      
	#Tell Eye Tracker Trial:
	if EyeTracker then
	msg = "Trial " + string(t) + " Start, Load ";
	tracker.send_message(msg);
	end;
	

###############################BREAKS############################################################	
#We don't need these breaks anymore now that we will be breaking up into 4 blocks... 

string breaktime="blah";

bool flagbreak=false;
string length_break=string (3333333);
/*	
if mod (t,50)==1 && t!=ntrials && t!=1 then 
	
	
		#Set so default has the bins of height 1 (i.e. all empty at the moment...)
	reward_bin1.set_height(1);	#Change height of reward bins according to outcome...
	reward_bin2.set_height(1);
	reward_bin3.set_height(1);
	reward_bin0.set_height(1);
	default.add_part(reward_bin1,-10,250.5); #Add reward bins
	default.add_part(reward_bin2,70,250.5);
	default.add_part(reward_bin3,150,250.5);
	default.add_part(reward_bin0,-150,250.5);
	
	breaktime=string(clock.time()-trial_starttime);
	oport.send_code(6,100); #Tell Biopac that the breaktime screen has begun...
	logfile.add_event_entry("break_begin");
	
	#Eyetracker message sent
	if EyeTracker then
	msg="BREAK SCREEN PRESENT ";
	msg.append(string(t));
	tracker.send_message(msg);
	end;
	
	int a=response_manager.total_response_count();

	loop int start_timebreak=clock.time();
			until flagbreak==true
	begin
			break_picture.present();
			if response_manager.total_response_count()>a then
				if response_manager.last_response()==1 || response_manager.last_response()==2 then length_break=string(clock.time()-start_timebreak); flagbreak=true;
				end;
			end;
		end;

		default.remove_part(3); default.remove_part(3); default.remove_part(3); default.remove_part(3); #Remove reward bins from default picture...
elseif t==ntrials then breaktime="No break";
elseif mod (t,50)>1 || mod(t,50)<1  then breaktime="No break";
end;
*/

#=====================================================================================================
	if pr==1.00 then risky_trial=true; #determining whether it is a risk trial
	end;

	#REDEFINING PARAMETERS FROM LAST TRIAL
	p_right=input_file_piloting [int(section_number)][t][3]; #need to redefine as participants were allowed to change these on the last trial.
	p_left=input_file_piloting [int(section_number)][t][4];
	pr=input_file_piloting [int(section_number)][t][5];
	pr_left=input_file_piloting [int(section_number)][t][6];
	reveal=false;
	outcome_icon=false;
	
	#Setting magnitude captions appropriately from values in array
	string magnitude_left_string=string(input_file_piloting[int(section_number)][t][1]); #Magnitude for urn on left- may or may not be the ambiguous urn...
	string magnitude_right_string=string(input_file_piloting[int(section_number)][t][2]);#Magnitude for urn on right...
	magnitude_left.set_caption(magnitude_left_string); 
	magnitude_right.set_caption(magnitude_right_string);
	magnitude_left.set_font_size(mr1); magnitude_right.set_font_size(br_left); #This is unnecessary now??!
	magnitude_left.redraw();
	magnitude_right.redraw();
	
	#Setting the duration for each screen from the timings in the text file...
	UrnsPresented_duration=Timings_all [int(section_number)][t][2]; #Screen '2'
	ChoiceTime_duration=Timings_all[int(section_number)][t][3];
	ChoiceDisplayed_duration=Timings_all[int(section_number)][t][4]; #this is the isi too...
	OutcomeDisplayed_duration=Timings_all[int(section_number)][t][5];
	ITI_duration=Timings_all[int(section_number)][t][1]; #Screen '1'
	OutcomeHistoryDisplayed_duration=Timings_all[int(section_number)][t][6]; #Only every 10 trials...
	ShockOutcomeDisplayed_duration=Timings_all[int(section_number)][t][7];
	ExtraITI_duration=Timings_all[int(section_number)][t][8];
	

#set colours of balls for this trial from input array:
loop int c=1;
until c==n
begin
	colours[c]=colours_toinput[int(section_number)][t][c];
	c=c+1;
end;

	#===========================================================================================================================
string FIRST_ITI_start="Not_first_trial";	
	#First trial or on break times we need a brief ITI a la Mike just so the first thing they see is not the urns. Will they also need an instruction screen?
if t==1 then
		string intertrialinterval="blah_de_blah";
		intertrialinterval=string(clock.time()-trial_starttime);
		logfile.add_event_entry("FIRST_ITI_starttime");
		FIRST_ITI_start=string(clock.time());
		oport.send_code(2,20); #Tells the Biopac that the ITI screen was presented...
		
	#Eyetracker message sent
	if EyeTracker then
		msg="ITI_SET_PERIOD PRESENT ";
		msg.append(string(t));
		tracker.send_message(msg);
	end;
	
		loop int start_time1=clock.time();
		until (clock.time()-start_time1)>10000 #Two second initial inter trial interval...
		begin

		default.present();
		end;	
end;

#This was for the ITI after the breakscreen and don't need it anymore as we have the sessions broken into 50 trials...
/*	
	if mod (t,50)==1 && t!=ntrials && t!=1 then 
			reward_bin1.set_height(1);	#Change height of reward bins according to outcome...
			reward_bin2.set_height(1);
			reward_bin3.set_height(1);
			reward_bin0.set_height(1);
			default.add_part(reward_bin1,-10,250); #Add reward bins
			default.add_part(reward_bin2,70,250);
			default.add_part(reward_bin3,150,250);
			default.add_part(reward_bin0,-150,250);
			
			string intertrialinterval="blah_de_blah";
				intertrialinterval=string(clock.time()-trial_starttime);
				logfile.add_event_entry("ITI_starttime");
				oport.send_code(2,20); #Tells the Biopac that the ITI screen was presented...
			
			#Eyetracker message sent

			if EyeTracker then
			msg="ITI_SET_PERIOD PRESENT ";
			msg.append(string(t));
			tracker.send_message(msg);
				end;
			
				loop int start_time1=clock.time();
				until (clock.time()-start_time1)>2000 #Two second initial inter trial interval...
				begin
				default.present();
			end;	
						
			default.remove_part(3); default.remove_part(3); default.remove_part(3); default.remove_part(3); #Remove reward bins from default picture...
	end;
*/

################SCREEN 2: URN INFO PRESENTED- Participants see all of the info but they can't choose yet...
	make_urn();
	
	string time_urns_presented=string(clock.time()-trial_starttime);
	
	string UrnsPresented_start=string(clock.time()); 
	
	logfile.add_event_entry("UrnsPresented_starttime");
	
	oport.send_code(2,50); #Tells Biopac that the Urns have now been presented...
	#Eyetracker message sent
	
	if EyeTracker then
	msg="Urn_info_Decision_Period PRESENT ";
	msg.append(string(t));
	tracker.send_message(msg);
		end;
#
	loop int start_time1_1=clock.time();
	until (clock.time()-start_time1_1)>int(UrnsPresented_duration)
	begin 
		urn.present();
	end;
	
	#SCREEN 3: BET SCREEN
	
############PARTICIPANTS CAN CHOOSE WHETHER TO BET ON CROSSES IN EITHER URN===========================================================================
	
	question_mark=true;
	string ButtonPress_start="No button press";
	
	make_urn(); #now making with new proportion of tokens shown.
	
	bool flag=false;
	int choice_time=0;
	string button_press="No Button Press";
	
	# response loop for participants to select to bet on crosses in risky/ambiguous urn or the reference urn.
	int r=response_manager.total_response_count(); #defining r. 
	#string time_choice_allowed=string(clock.time()-trial_starttime); #Not used anywhere??
	logfile.add_event_entry("Choice_Period_starttime");
	oport.send_code(2,100); #Tells Biopac that the choice period has started (question mark). 
		#Eyetracker message sent
	
	if EyeTracker then
	msg="Choice_time_Period PRESENT ";
	msg.append(string(t));
	tracker.send_message(msg);
		end;

	
	string QuestionMark_start=string(clock.time());
	
	loop int start_time2=clock.time();
	until (clock.time()-start_time2)>int(ChoiceTime_duration) || flag==true
	begin 
		urn.present();
		if response_manager.total_response_count()>r then
			if response_manager.last_response()==1 then outcome_box_x=-145; outcome_box_border_x=-145; mr=mr2; br=br_left; button_press=string(clock.time()-trial_starttime); choice_time=(clock.time()-start_time2); ButtonPress_start=string(clock.time()); flag=true; #THEY SELECTED LEFT URN 
			elseif response_manager.last_response()==2 then outcome_box_x=145; outcome_box_border_x=145; mr=mr1; br=br_right; button_press=string(clock.time()-trial_starttime); choice_time=(clock.time()-start_time2); ButtonPress_start=string(clock.time()); flag=true; #THEY SELECTED RIGHT URN 
			end;
		end;
		
		if (clock.time()-start_time2)>int(ChoiceTime_duration-double(warningtime_duration)) then
			questionmark.set_font_color(0,0,0); #Make the question mark darker one second before loop ends...
			questionmark.set_font_size(70);
			questionmark.redraw();
		end;
			
		make_urn();
		urn.present(); #this will show the old urn same proportion of coloured dots, but just show participant what they have chosen.
	end;
	
		questionmark.set_font_color(0,0,0,127); #Make the question mark back to normal for next trial...
		questionmark.set_font_size(40);
		questionmark.redraw();
#############################If too slow to chose, computer chooses and present what computer chose########################	
	#If too slow to choose, computer chooses the colour
	string computerchoice_outcome="Nothing yet";

	if flag==false #i.e. they took too long to choose and didn't use up key to enter the info...
		then 
			if random()<=0.5 then outcome_box_x=-145; outcome_box_border_x=-145; br=br_left; mr=mr2;reveal=true; computerchoice_outcome="left urn"; #REFERENCE URN 
			else outcome_box_x=145; outcome_box_border_x=145; br=br_right; mr=mr1; reveal=true;computerchoice_outcome="right urn"; #right urn 
			end;
		make_urn();
	end;
#######################################################################################################################################	
#SCREEN 4: CHOICE/RESPONSE DISPLAY SCREEN and ISI- this now is going to be a lot longer...will act as ISI as well...

#Presenting the urns with the square indicating the participants/computers choice.
	question_mark=false;
	reveal=true;
	make_urn();
	string participant_choice_presented=string(clock.time()-trial_starttime);
	#add pin and code stuff here. Send to biopac here (also log it)...
	logfile.add_event_entry("Participant_Response_Displayed_starttime");
	oport.send_code(4,20); #Tell Biopac that participant choice is displayed (ISI)...
		#Eyetracker message sent
	if EyeTracker then
	msg="Participant_Response_Display_Period (ISI) PRESENT ";
	msg.append(string(t));
	tracker.send_message(msg);
		end;

	string ChoiceDisplayed_start=string(clock.time());
	
	loop int start_time3=clock.time();
	until (clock.time()-start_time3)>int(ChoiceDisplayed_duration)
	begin
	urn.present();
	end;
	
############################DETERMINING OUTCOME########################################################################################	
	#Define the parameters relevant to the outcome
	double mag_left=input_file_piloting [int(section_number)][t][1]; #magnitudes of red and blue as doubles (from array)
	double mag_right=input_file_piloting[int(section_number)][t][2];
	double did_right_win=0.0;
	double did_left_win=0.0;
	double outcome=0.0;
	string whetherwon="You won!";

	#Determine outcome based on randomly selecting a ball from the urn and what participants chose.
	#Randomly generate number between 0 and 1. 
	
	#Ball selected at random from right urn
	if random()>p_right then  did_right_win=1.0; #nought was chosen- hence they will be shocked
	end;

	#Ball selected at random from reference urn
	if random()>p_left then  did_left_win=1.0; #nought was chosen, hence they will be shocked
	end;

	if flag==false #ie computer chose for this trial
		then	
		if computerchoice_outcome=="Computer chose right urn" then br=br_right;  
		elseif computerchoice_outcome=="Computer chose reference urn" then br=br_left;
		end;
	end;

	#Determine outcome for participants based on what they bet on and what ball was selected. Display this info.
	if br==br_right then outcome= did_right_win*mag_right;  #they bet on right urn- outcome is mag of 0 in right urn if nought was chosen and zero otherwise
	elseif br==br_left then outcome= did_left_win*mag_left; #they bet on reference urn
	end;

	if (br==br_right) && (did_right_win==1.0) then whetherwon="You lost!";  #nought was chosen in urn they chose- they will be shocked
	elseif (br==br_right) && (did_right_win==0.0) then whetherwon="You won!";
	elseif (br==br_left) && (did_left_win==0.0) then whetherwon="You won!";
	elseif (br==br_left) && (did_left_win==1.0) then whetherwon="You lost!"; #nought was chosen in urn they chose- they will be shocked
	end;

####On 11th trial etc need to reset for this new block of ten...##########################
	if mod(t,5)==1 then array_index=mod(t,5); number_bin1=0; number_bin2=0; number_bin3=0; number_bin0=0;
	loop int i=1
	until i>5
	begin
	outcomes[i]=0.0; #every 5 trials reset the outcomes array and array_index goes back to 1.
	i=i+1;
	end;
	end;
##############################################
	##POPULATE ARRAY OF OUTCOMES WITH THE OUTCOME FROM THIS TRIAL
	outcomes[array_index]=outcome; #set the outcome in the position in array for the block of 5 trials
	points=points+outcome; #may not need this anymore???!
	
	##increasing number in each bin....
	if outcome<=50.0 && outcome>0.0 then number_bin1=number_bin1+1; 
	elseif outcome>50.0 && outcome<=100.0 then number_bin2=number_bin2+1;
	elseif outcome>100.0 then number_bin3=number_bin3+1;
	elseif outcome==0.0 then number_bin1=number_bin1; number_bin2=number_bin2; number_bin3=number_bin3; number_bin0=number_bin0+1;
	end;
	
	int number_bin1_output=number_bin1;
		int number_bin2_output=number_bin2;
			int number_bin3_output=number_bin3;
				int number_bin0_output=number_bin0;
	
#################################PRESENT OUTCOME SECTION##################################################
outcome_icon=true;

if whetherwon=="You won!" then feedback_graphic.set_caption("X"); #They won't be shocked
elseif whetherwon=="You lost!" then feedback_graphic.set_caption("O"); #They will be shocked
end;
feedback_graphic.redraw();

make_urn();

#################################PRESENT URN WITH OUTCOME (i.e. nought or cross)###########################################
#SCREEN 5: Outcome for individual trial displayed...

string token_chosen_presented_time=string(clock.time()-trial_starttime);
logfile.add_event_entry("Outcome_Individualtrial_Displayed_starttime");
oport.send_code(4,50); #Tell Biopac that outcome for individual trials displayed...
	#Eyetracker message sent
	if EyeTracker then
	msg="Outcome_Display_Period PRESENT ";
	msg.append(string(t));
	tracker.send_message(msg);
	#
	end;

string Outcome_start=string(clock.time());
	
loop int start_time4=clock.time();
	until (clock.time()-start_time4)>int(OutcomeDisplayed_duration)
	begin
	urn.present();
end;

##########GIVE THEM THE OUTCOME THEY ACCUMULATE EVERY 10 TRIALS###############################
#Need to split this into two screens: one for showing everything other than the 
int outcome_chosen=random(1,5);
string reward_received_string="Not fifth trial";
string shock_time="Not shocked this trial";
string resultpicture_time="No picture this trial";
string extra_intertrialinterval="blah_de_blah_de_blah";
string ExtraITI_start="Not fifth trial";
string Shock_start="Not fifth trial";
string ShockOutcomeDisplay_start="Not fifth trial";
string OutcomeHistoryDisplayed_start="Not fifth trial";

#########################SCREEN 6: Outcome history displayed for the five trials but with no other info...This is now like another ISI##############################

if mod(t ,5)==0 || t==ntrials
	then 

		result_picture.add_part(reward_bin1,-10,y_rewardbin1); #Add reward bins
		result_picture.add_part(reward_bin2,70,y_rewardbin2);
		result_picture.add_part(reward_bin3,150,y_rewardbin3);
		result_picture.add_part(reward_bin0,-150,y_rewardbin0);
	
#screen here where it has the result bins but none of them are highlighted yet and the info about the magnitude shock they will get is not displayed...
			resultpicture_time=string(clock.time()-trial_starttime);
			logfile.add_event_entry("OutcomeHistoryDisplayed_starttime");
			oport.send_code(4,100); #Tell Biopac that outcome history display about to start...
				#Eyetracker message sent
				if EyeTracker then
			msg="Outcome_History_Display PRESENT ";
			msg.append(string(t));
			tracker.send_message(msg);
					end;
	
	OutcomeHistoryDisplayed_start=string(clock.time());

			loop int start_time5=clock.time();
				until (clock.time()-start_time5)>int(OutcomeHistoryDisplayed_duration)
				begin
				result_picture.present();
			end;	
		
#################################################################
	#####Setting up for SCREEN 7:'Outcome with shock info displayed'...
	if 0.0<outcomes[outcome_chosen] && outcomes[outcome_chosen]<=50.0 then result_picture.remove_part(2); result_picture.add_part(result_boxoutline,-10,300); result_picture.add_part(result_box,-10,300); result_picture.add_part(reward_bin1,-10, y_rewardbin1);
	elseif 50.0<outcomes[outcome_chosen] && outcomes[outcome_chosen]<=100.0 then result_picture.remove_part(3); result_picture.add_part(result_boxoutline,70,300); result_picture.add_part(result_box,70,300); result_picture.add_part(reward_bin2,70, y_rewardbin2); 
	elseif 100.0<outcomes[outcome_chosen] then result_picture.remove_part(4); result_picture.add_part(result_boxoutline,150,300); result_picture.add_part(result_box,150,300); result_picture.add_part(reward_bin3,150, y_rewardbin3);
	elseif outcomes[outcome_chosen]==0.0 then result_picture.remove_part(5); result_picture.add_part(result_boxoutline,-150,300); result_picture.add_part(result_box,-150,300); result_picture.add_part(reward_bin0,-150, y_rewardbin0);
	end;
	
	int reward_received=int(outcomes[outcome_chosen]);
	reward_received_string=string (reward_received);
	result_text.set_caption("The trial result randomly selected from this block was: \n" + reward_received_string);
	result_text.redraw();

###HAVE SHOCK AFTER THEY SEE THE NUMBER. SHOULD THEY SEE screen with exact number of shock??!! YES?!
########Screen 7#####################################################################################################
			resultpicture_time=string(clock.time()-trial_starttime);
			logfile.add_event_entry("ShockOutcomeDisplayed_starttime");
			ShockOutcomeDisplay_start=string(clock.time());
			oport.send_code(6,20); #Tell Biopac that the 'Shock info screen' is about to be presented... 
				#Eyetracker message sent
			if EyeTracker then
			msg="ShockOutcomeDisplay_Period PRESENT ";
			msg.append(string(t));
			tracker.send_message(msg);
						end;
		
			loop int start_time6=clock.time();
				until (clock.time()-start_time6)>int(ShockOutcomeDisplayed_duration)
				begin
				result_picture.present();
			end;
		##Shock after they have had warning from the screen...
	shock_time=string(clock.time()-trial_starttime);
	Shock_start=string(clock.time());
	logfile.add_event_entry("shock time");
	###Could send Biopac pulse that shock to be delivered...
	variable_shock(int (outcomes[outcome_chosen])); #Delivers shock to participants
			
		number_bin1=0; number_bin2=0; number_bin3=0; number_bin0=0;
		result_picture.remove_part(2); result_picture.remove_part(2); result_picture.remove_part(2); result_picture.remove_part(2); result_picture.remove_part(2); result_picture.remove_part(2); #remove the boxes for the next loop...

	result_text.set_caption(" "); #Need to remove the text for the next time this is presented...
	result_text.redraw();
#############################SCREEN 8: WIll need an extra ITI after every 10 trials (the long ITI...)

	extra_intertrialinterval="blah_de_blah_de_blah";
	extra_intertrialinterval=string(clock.time()-trial_starttime);
	logfile.add_event_entry("ExtraITI_starttime");
	ExtraITI_start=string(clock.time());
	oport.send_code(6,50); #Tell Biopac that the extra ITI screen is about to start...
	#Eyetracker message sent
	if EyeTracker then
	msg="ExtraITI_Period PRESENT ";
	msg.append(string(t));
	tracker.send_message(msg);
		end;
#
	##Reward Bins
	number_bin1=0;
	number_bin2=0;
	number_bin3=0;
	number_bin0=0;
	
	height_rewardbin1=10*number_bin1;
	height_rewardbin2=10*number_bin2;
	height_rewardbin3=10*number_bin3;
	height_rewardbin0=10*number_bin0;
	
	if height_rewardbin1==0 then height_rewardbin1=1;end;
	if height_rewardbin2==0 then height_rewardbin2=1;end;
	if height_rewardbin3==0 then height_rewardbin3=1;end;
	if height_rewardbin0==0 then height_rewardbin0=1;end;
	
	y_rewardbin1=250+height_rewardbin1/2;
	y_rewardbin2=250+height_rewardbin2/2;
	y_rewardbin3=250+height_rewardbin3/2;
	y_rewardbin0=250+height_rewardbin0/2;
	
	reward_bin1.set_height(height_rewardbin1);	#Change height of reward bins according to outcome...
	reward_bin2.set_height(height_rewardbin2);
	reward_bin3.set_height(height_rewardbin3);
	reward_bin0.set_height(height_rewardbin0);
	
	default.add_part(reward_bin1,-10,y_rewardbin1); #Add reward bins
	default.add_part(reward_bin2,70,y_rewardbin2);
	default.add_part(reward_bin3,150,y_rewardbin3);
	default.add_part(reward_bin0,-150,y_rewardbin0);
	
	loop int start_time7=clock.time();
	until (clock.time()-start_time7)>int(ExtraITI_duration)
	begin
	default.present(); 
	end;	
	default.remove_part(3); default.remove_part(3); default.remove_part(3); default.remove_part(3); #Remove reward bins from default picture...	
end;				
						
#####################Variable ITI#########################
#Add the current bin levels to the ITI picture...if not the ITI after the result picture

#THIS IS SCREEN 1 : currently has the result bins on there as well
#This is shown on every trial now, even after the Extra ITI...
#Is there a problem that it will flash between the Extra ITI screen and the ITI screen?
string intertrialinterval="blah_de_blah";

	default.add_part(reward_bin1,-10,y_rewardbin1); #Add reward bins
	default.add_part(reward_bin2,70,y_rewardbin2);
	default.add_part(reward_bin3,150,y_rewardbin3);
	default.add_part(reward_bin0,-150,y_rewardbin0);
	default.add_part(NoughtsEqualsShock,0,-300);
intertrialinterval=string(clock.time()-trial_starttime);
logfile.add_event_entry("ITI_starttime");
string ITI_start=string(clock.time());
oport.send_code(2,20); #Tell Biopac that the ITI screen about to start...
	#Eyetracker message sent
	if EyeTracker then
	msg="ITI PRESENT ";
	msg.append(string(t));
	tracker.send_message(msg);
		end; 
#

loop int start_time1=clock.time();
	until (clock.time()-start_time1)>int(ITI_duration)
	begin
	default.present();
	end;					
	default.remove_part(3); default.remove_part(3); default.remove_part(3); default.remove_part(3); default.remove_part(3);
		
	#=================================================================================================================================	
	string bet="blah";
	if br==br_left then bet="bet_left";
	elseif br==br_right then bet="bet_right";
	end;

	#save information from this trial in log file
	mylogfile.print(string(br) +"\t");
	mylogfile.print(string(p_left)+"\t");
	mylogfile.print(string(p_right)+"\t");
	mylogfile.print(string(pr)+"\t");
	mylogfile.print(string(pr_left)+"\t");
	mylogfile.print(string(mag_left) +"\t");
	mylogfile.print(string(mag_right) +"\t");
	
	mylogfile.print(string(UrnsPresented_duration) +"\t");
	mylogfile.print(string(ChoiceTime_duration) +"\t");
	mylogfile.print(string(ChoiceDisplayed_duration) +"\t"); #This is also ISI
	mylogfile.print(string(OutcomeDisplayed_duration) +"\t");
	mylogfile.print(string(ITI_duration) +"\t");
	mylogfile.print(string(OutcomeHistoryDisplayed_duration) +"\t");
	mylogfile.print(string(ShockOutcomeDisplayed_duration) +"\t");
	mylogfile.print(string(ExtraITI_duration) +"\t");
	
	mylogfile.print(time_urns_presented +"\t");
	mylogfile.print(button_press +"\t");
	mylogfile.print(participant_choice_presented +"\t");
	mylogfile.print(token_chosen_presented_time +"\t");
	mylogfile.print(shock_time +"\t");
	mylogfile.print(resultpicture_time +"\t");
	mylogfile.print(intertrialinterval +"\t");
	mylogfile.print(extra_intertrialinterval +"\t"); #Add to header files...
	mylogfile.print(string(t) + "\t");
	mylogfile.print(string (choice_time) + "\t");
	mylogfile.print(bet + "\t"); #whether bet on reference urn or right urn
	mylogfile.print(computerchoice_outcome + "\t"); 
	mylogfile.print(string(did_right_win) + "\t");
	mylogfile.print(string(did_left_win) + "\t");
	mylogfile.print(string(numberofshocks) + "\t"); #number of subjective shocks corresponding to that magnitude shock
	mylogfile.print(string(outcome_chosen)  +"\t"); #random number between 1 and 10 used to extract result from array of outcomes every ten trials
	mylogfile.print(string(outcome) + "\t"); #magnitude of result
	
	mylogfile.print(string (number_bin1_output)+ "\t");
		mylogfile.print(string (number_bin2_output)+ "\t");
			mylogfile.print(string (number_bin3_output)+ "\t");
				mylogfile.print(string (number_bin0_output)+ "\t");
	mylogfile.print(string (outcomes[array_index]) + "\t"); #the outcome put into array- just check it is same as above...
	mylogfile.print(reward_received_string  + "\t"); #the outcome chosen to deliver as a shock every 10 trials...
	mylogfile.print(breaktime + "\t"); #how long participants break for
	mylogfile.print(length_break + "\t");
	
	mylogfile.print(FIRST_ITI_start + "\t");
	mylogfile.print(ITI_start + "\t");
	mylogfile.print(UrnsPresented_start + "\t");
	mylogfile.print(QuestionMark_start + "\t");
	mylogfile.print(ButtonPress_start + "\t");
	mylogfile.print(ChoiceDisplayed_start + "\t");
	mylogfile.print(Outcome_start + "\t");
	mylogfile.print(OutcomeHistoryDisplayed_start + "\t");
	mylogfile.print(ShockOutcomeDisplay_start + "\t");
	mylogfile.print(Shock_start + "\t");
	mylogfile.print(ExtraITI_start + "\t");
	mylogfile.print(string(trial_starttime) +"\n"); #need to add to headers- might want to take this out...
	
	t=t+1; #change to next trial
	array_index=array_index+1;
	risky_trial=false; #change back for next trial
end;




#waits for scan trigger before quits
loop
	
	theprevtrigger = pulse_manager.main_pulse_count();
	mytrigger = theprevtrigger;
	trigger_time = pulse_manager.main_pulse_time(theprevtrigger);
	logout.append("\t" + string(trigger_time));
until 	
	(pulse_manager.main_pulse_count() > FMRI_TRIGGER_COUNT + mytrigger)
begin
	default.present();
	thecurrtrigger = pulse_manager.main_pulse_count();
	if thecurrtrigger != theprevtrigger then
		trigger_time = pulse_manager.main_pulse_time(thecurrtrigger);
		logout.append("\t" + string(trigger_time));
		theprevtrigger = thecurrtrigger;
	end;
	
end;

mylogfile.print(logout);


##Uncomment for eyetracker


#stop recording
if EyeTracker then
tracker.set_recording(false); #read up on this... This is what stops recording...


## get edf file

##Uncomment for eyetracker

# Get eye tracking data
string edf_fname = tracker_directory + "\\" + edf_name;
tracker.set_parameter("get_edf_file",edf_fname); #get edf file from host (Eyelink computer) and transfer it- with names that we gave earlier... 
tracker.stop_tracking();#removes connection between Eyelink and Stim1...
end;