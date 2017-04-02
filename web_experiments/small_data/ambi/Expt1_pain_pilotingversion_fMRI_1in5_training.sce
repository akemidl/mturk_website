##NOTE: Noughts are the same as 'red' in old version, crosses are same as 'blue' in old version

active_buttons=2;
button_codes=11,22; 
# buttons should be set, on response tab (in this order) to:
# 1, 2

# screen tweak
default_background_color = 255,255,255; # white

#MIGHT NEED MORE SCREEN TWEAK PARAMETERS...
#==========================================================================================================================================
# declare stimuli in SDL
begin;

text{caption="magnitude_left";font_size=40; font_color=0,0,0,127;} magnitude_left; #will provide info on magnitude value of noughts in reference urn 
text{caption="magnitude_right";font_size=40 ; font_color=0,0,0,127;} magnitude_right; #will provide info on magnitude value of noughts in trial urn
text{caption="Too slow! Computer has randomly selected for you"; font_size=40; font_color=255,255,255;} feedbackchoice_text;
text{caption="Computer choice"; font_size=40; font_color=255,255,255;} computerchoice_text; 
text{caption="X"; font_size=20; font_color=0,0,0,128;} urn_tokens_x;
text{caption="O"; font_size=20; font_color=0,0,0,128;} urn_tokens_o;
text{caption="!"; font_size=20; font_color=0,0,0,128;} urn_tokens_exc;
text{caption="="; font_size=20; font_color=0,0,0,128;} urn_tokens_equal;
#text{caption="0"; font_size=40; font_color=0,0,0,128;} reward_accumulated;
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
#box {height=10;width=10;color=127,127,127;} origin;

text{caption="X";font_size=50; font_color=127,127,127,127;} feedback_graphic;
text{caption="Noughts=Shock";font_size=25; font_color=127,127,127,127;} NoughtsEqualsShock;

#baseline picture: 
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
	text{caption = " "; font_size = 20; font_color=0,0,0,127;}result_text;
	x = 0; y = 0;
}result_picture;

picture{} urn; #includes the 'reference urn', the 'trial urn', and the magnitude info

#=======================================================================================================================================
begin_pcl;

preset string subID;

include "colours/colours_toinput_training.txt"; #calling colours array that changes the positions of the tokens in the urns- sets so same for everyone...
include "parameters/input_file_piloting_training.txt"; #calling variables from the array
include "timings/Timings_all_training.txt"; #Calling durations for each screen from the array...
output_file mylogfile = new output_file; #Creating output file for variables to be written to
mylogfile.open("Expt1PainPilotNoughtsCrossesSorted_1in5_training_" + subID + ".txt");

####################################Write Headers for Log File####################################
mylogfile.print( " br\t p_left\t p_right\t pr\t pr_left\t magnitude_left\t magnitude_right\t UrnsPresented_duration\t ChoiceTime_duration\t ChoiceDisplayed_duration\t OutcomeDisplayed_duration\t ITI_duration\t OutcomeHistoryDisplayed_duration\t ShockOutcomeDisplayed_duration\t ExtraITI_duration\t time_urns_presented\t time_button_press\t time_participant_choice_presented\t token_chosen_presented_time\t shock_time\t resultpicture_time\t time_ITI_begin\t time_Extra_ITI_begin\t trial number\t choice time\t participantsbet\t computerchoice_outcome\t did_right_win\t did_left_win\t numberofshocks\t outcome_chosen\t outcome\t colours\t numberbin1\t numberbin2\t numberbin3\t numberbin0\t outcome_intoarray\t result_given1in10\t breaktime\t length_break\n");
		
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
#shocklookup.open("stim_intense/logfiles/" + logfile.subject() + "_pain_scale.dat",bool(1)); 
#shocklookup.open(subID+"_pain_scale.dat",bool(1)); 
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
int n=100; # number of balls in both urns
double j=0.0; #variables for the loop specifing the position of the balls in the array
double m=0.0;
int M=1; #variables for sorting to left and right
int N=0;
int R=0;
int x_coord_variable=0;

int ntrials=20; #number of trials
int t=1; #t changes on each trial
int array_index=1; #this is to be reset every 10 trials at the moment- chose an outcome from every 10 trials to randomly be rewarded...

int timeout_choice=5000; #time during which subjects may choose which to bet on, in milliseconds
int warningtime_duration=1000; #Time before the end of the choice period when the question mark goes dark and they need to press their choice.
bool question_mark=false;
bool reveal=false; #boolean which tells the response loop when to stop running (when changed to true) 
bool risky_trial=false;

#defining font sizes for the magnitude information #DON'T NEED ALL OF THESE IN NEW VERSION...
double mr1=40.0;
double mr2=90.0;
double mr=40.0;
double br_left=40.0;
double br_right=90.0;
double br=40.0;
double magnitude_ref_double=50.0;

double p_left=input_file_piloting_training [t][4];
double p_right=input_file_piloting_training [t][3]; #proportion of the balls that are blue
double pr=input_file_piloting_training [t][5]; #proportion of the balls that are revealed (ie not 'covered' by "!") initially on the right urn
double pr_left=input_file_piloting_training [t][6]; #proportion of the balls that are revealed (ie not 'covered' by "!") initially on the left

double UrnsPresented_duration=Timings_all_training [t][2]; #Screen '2'
double ChoiceTime_duration=Timings_all_training[t][3];
double ChoiceDisplayed_duration=Timings_all_training[t][4];
double OutcomeDisplayed_duration=Timings_all_training[t][5];
double ITI_duration=Timings_all_training[t][1]; #Screen '1'
double OutcomeHistoryDisplayed_duration=Timings_all_training[t][6]; #Only every 10 trials...
double ShockOutcomeDisplayed_duration=Timings_all_training[t][7];
double ExtraITI_duration=Timings_all_training[t][8];

int outcome_box_x=-300;
int outcome_box_border_x=-300;
bool outcome_icon=false;

int R_total=0;
double points=1.0; #number of reward points they have accumulated (sum of all outcomes over trial)
string R_total_caption="0";
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
#loop for positions of trial urn
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

#loop for positions of reference urn
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
int numshock=999999; ## this is a counter for the number of shocks given
int numberofshocks=numshock;
int shockadmin=111111; ## this is the number of shocks which should be given
int max_shock=100; #this should represent the outcome for the maximum shock- what people will receive when go over end of bar...
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
					oport.send_code( 1, 5 );
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
	#R_total_caption=string(R_total); # total reward accumulating over course of expt
	#reward_accumulated.set_caption(R_total_caption); 
	#reward_accumulated.redraw();
	#urn.add_part(reward_accumulated,500,-300);
	
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
		#RIGHT URN (old 'trial' urn)
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

		#LEFT URN- old 'reference' urn...
	elseif i>n/2 && i<=n then 
		if i==(n/2)+1 then   ##RESETTING FOR 'REFERENCE URN'...
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
# trial loop
loop t=1;
until t>ntrials
begin
	
	int trial_starttime=clock.time(); #SUBTRACT FROM CLOCK TIMES LATER
	logfile.add_event_entry("trial_" + string(t) + "_onset");

###############################BREAKS############################################################	
string breaktime="blah";

bool flagbreak=false;
string length_break=string (3333333);
	
	if mod (t,50)==1 && t!=ntrials && t!=1 then 
		breaktime=string(clock.time()-trial_starttime);
		logfile.add_event_entry("break_begin");
	
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
	elseif t==ntrials then breaktime="No break";
	elseif mod (t,50)>1 || mod(t,50)<1  then breaktime="No break";
	end;
#=====================================================================================================
	if pr==1.00 then risky_trial=true; #determining whether it is a risk trial
	end;

	#REDEFINING PARAMETERS FROM LAST TRIAL
	p_right=input_file_piloting_training [t][3]; #need to redefine as participants were allowed to change these on the last trial.
	p_left=input_file_piloting_training [t][4];
	pr=input_file_piloting_training [t][5];
	pr_left=input_file_piloting_training [t][6];
	reveal=false;
	outcome_icon=false;
	
	#Setting magnitude captions appropriately from values in array
	string magnitude_left_string=string(input_file_piloting_training[t][1]);
	string magnitude_right_string=string(input_file_piloting_training[t][2]);
	magnitude_left.set_caption(magnitude_left_string); 
	magnitude_right.set_caption(magnitude_right_string);
	magnitude_left.set_font_size(mr1); magnitude_right.set_font_size(br_left);
	magnitude_left.redraw();
	magnitude_right.redraw();

	#Setting the duration for each screen from the timings in the text file...
	UrnsPresented_duration=Timings_all_training [t][2]; #Screen '2'
	ChoiceTime_duration=Timings_all_training[t][3];
	ChoiceDisplayed_duration=Timings_all_training[t][4]; #this is the isi too...
	OutcomeDisplayed_duration=Timings_all_training[t][5];
	ITI_duration=Timings_all_training[t][1]; #Screen '1'
	OutcomeHistoryDisplayed_duration=Timings_all_training[t][6]; #Only every 10 trials...
	ShockOutcomeDisplayed_duration=Timings_all_training[t][7];
	ExtraITI_duration=Timings_all_training[t][8];
	
#set colours of balls for this trial from input array:
loop int c=1;
until c==n
begin
	
	colours[c]=colours_toinput_training[t][c];
	c=c+1;
end;

	#===========================================================================================================================

	#First trial or on break times we need a brief ITI a la Mike just so the first thing they see is not the urns. Will they also need an instruction screen?
	if t==1 then
		string intertrialinterval="blah_de_blah";
		intertrialinterval=string(clock.time()-trial_starttime);
		logfile.add_event_entry("ITI_starttime");
		
		loop int start_time1=clock.time();
		until (clock.time()-start_time1)>2000 #Two second initial inter trial interval...
		begin
		default.present();
		end;	
	end;
	
	if mod (t,50)==1 && t!=ntrials && t!=1 then #After the breaktime... 
	string intertrialinterval="blah_de_blah";
		intertrialinterval=string(clock.time()-trial_starttime);
		logfile.add_event_entry("ITI_starttime");
		
		loop int start_time1=clock.time();
		until (clock.time()-start_time1)>2000 #Two second initial inter trial interval...
		begin
		default.present();
		end;	
	end;
	
	#################SCREEN 2: URN INFO PRESENTED- Participants see all of the info but they can't choose yet...
	make_urn();
	
	string time_urns_presented=string(clock.time()-trial_starttime);
	logfile.add_event_entry("UrnsPresented_starttime");
	
	loop int start_time1_1=clock.time();
	until (clock.time()-start_time1_1)>int(UrnsPresented_duration)
	begin 
		urn.present();
	end;
	
	####################################SCREEN 3: BET SCREEN#######################################################
	
#PARTICIPANTS CAN CHOOSE WHETHER TO BET ON CROSSES IN EITHER URN===========================================================================
	
	question_mark=true;

	make_urn(); #now making with new proportion of tokens shown.
	
	bool flag=false;
	int choice_time=0;
	string button_press="No Button Press";
	
	# response loop for participants to select to bet on crosses in risky/ambiguous urn or the reference urn.
	int r=response_manager.total_response_count(); #defining r. 
	string time_choice_allowed=string(clock.time()-trial_starttime);
	logfile.add_event_entry("Choice_Period_starttime");
	
	loop int start_time2=clock.time();
	until (clock.time()-start_time2)>int(ChoiceTime_duration) || flag==true
	begin 
		urn.present();
		if response_manager.total_response_count()>r then
			if response_manager.last_response()==1 then outcome_box_x=-145; outcome_box_border_x=-145; mr=mr2; br=br_left; button_press=string(clock.time()-trial_starttime); choice_time=(clock.time()-start_time2); flag=true; #THEY SELECTED LEFT URN 
			elseif response_manager.last_response()==2 then outcome_box_x=145; outcome_box_border_x=145; mr=mr1; br=br_right; button_press=string(clock.time()-trial_starttime); choice_time=(clock.time()-start_time2); flag=true; #THEY SELECTED RIGHT URN 
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
	logfile.add_event_entry("Participant_Response_Displayed_starttime");
	
	loop int start_time3=clock.time();
	until (clock.time()-start_time3)>int(ChoiceDisplayed_duration)
	begin
	urn.present();
	end;
	
############################DETERMINING OUTCOME########################################################################################	
	#Define the parameters relevant to the outcome
	double mag_left=input_file_piloting_training[t][1]; #magnitudes of red and blue as doubles (from array)
	double mag_right=input_file_piloting_training[t][2];
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
	outcomes[i]=0.0; #every 10 trials reset the outcomes array and array_index goes back to 1.
	i=i+1;
	end;
	end;
##############################################
	##POPULATE ARRAY OF OUTCOMES WITH THE OUTCOME FROM THIS TRIAL
	outcomes[array_index]=outcome; #set the outcome in the position in array for the block of 10 trials
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

#########################SCREEN 6: Outcome history displayed for the ten trials but with no other info...##############################
if mod(t,5)==0 || t==ntrials
	then 

		result_picture.add_part(reward_bin1,-10,y_rewardbin1); #Add reward bins
		result_picture.add_part(reward_bin2,70,y_rewardbin2);
		result_picture.add_part(reward_bin3,150,y_rewardbin3);
		result_picture.add_part(reward_bin0,-150,y_rewardbin0);
	
#screen here where it has the result bins but none of them are highlighted yet and the info about the magnitude shock they will get is not displayed...
			resultpicture_time=string(clock.time()-trial_starttime);
			logfile.add_event_entry("OutcomeHistoryDisplayed_starttime");

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

			loop int start_time6=clock.time();
				until (clock.time()-start_time6)>int(ShockOutcomeDisplayed_duration)
				begin
				result_picture.present();
			end;
		##Shock after they have had warning from the screen...
	shock_time=string(clock.time()-trial_starttime);
	logfile.add_event_entry("shock time");
	variable_shock(int (outcomes[outcome_chosen])); #Delivers shock to participants
			
		number_bin1=0; number_bin2=0; number_bin3=0; number_bin0=0;
		result_picture.remove_part(2); result_picture.remove_part(2); result_picture.remove_part(2); result_picture.remove_part(2); result_picture.remove_part(2); result_picture.remove_part(2); #remove the boxes for the next loop...

	result_text.set_caption(" "); #Need to remove the text for the next time this is presented...
	result_text.redraw();
#############################SCREEN 8: WIll need an extra ITI after every 10 trials (the long ITI...)

	extra_intertrialinterval="blah_de_blah_de_blah";
	extra_intertrialinterval=string(clock.time()-trial_starttime);
	logfile.add_event_entry("ExtraITI_starttime");
	
	loop int start_time7=clock.time();
	until (clock.time()-start_time7)>int(ExtraITI_duration)
	begin
	default.present(); #This is just the fixation cross...
	end;	
		
end;				
						
#####################Variable ITI#########################
#Add the current bin levels to the ITI picture...if not the ITI after the result picture

#THIS IS SCREEN 1 : currently has the result bins on there as well...talk to Sonia- we might need to remove these?!
string intertrialinterval="blah_de_blah";
if mod(t,5)>0
then
	default.add_part(reward_bin1,-10,y_rewardbin1); #Add reward bins
	default.add_part(reward_bin2,70,y_rewardbin2);
	default.add_part(reward_bin3,150,y_rewardbin3);
	default.add_part(reward_bin0,-150,y_rewardbin0);
	default.add_part(NoughtsEqualsShock,0,-300);
intertrialinterval=string(clock.time()-trial_starttime);
logfile.add_event_entry("ITI_starttime");

loop int start_time1=clock.time();
	until (clock.time()-start_time1)>int(ITI_duration)
	begin
	default.present();
	end;					
	default.remove_part(2); default.remove_part(2); default.remove_part(2); default.remove_part(2); default.remove_part(2);
		
end;	
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
	mylogfile.print(length_break + "\n");

	t=t+1; #change to next trial
	array_index=array_index+1;
	risky_trial=false; #change back for next trial
end;