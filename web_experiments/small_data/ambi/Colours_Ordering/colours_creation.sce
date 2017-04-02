##Creating the file that will store the positions of the tokens that we will then use for all subsequent trials...

begin;
begin_pcl;

int ntrials=50; #number of trials in a block
int t=1; #t changes on each trial
int n=100; # number of balls in both urns

array <int> colours [n]; #creating an array called colours with n zeros initially for the n balls- some will be turned into ones later to represent the other colour
include "input_parameters_forcolours.txt"; #calling variables from the array
output_file mylogfile = new output_file; #Creating output file for variables to be written to
mylogfile.open("colours_Behaviour_1in5_block4.txt");

double p_left=input_parameters_forcolours[t][4]; #4
double p_right=input_parameters_forcolours[t][3]; #proportion of the balls that are crosses #3

################################################################################################################
loop t=1;
until t>ntrials
begin
	p_left=input_parameters_forcolours[t][4];
	p_right=input_parameters_forcolours[t][3];
	
# set colours of balls for this trial
	loop int c=1; #telling that the loop will go from c=1 to c=n (for all values in array).
	until c>n
	begin
		
		#colours for trial urn (urn on right)
		if c<=int(double(n/2)*p_right) then	colours[c]=1;	
		elseif int(double(n/2)*p_right)<c && c<=(n/2) then colours[c]=0;	#need to work out how to shuffle just these elements of the array without shuffling the others...
		
		#colours for reference urn (urn on left)
		elseif (n/2)<c && c<=(n/2)+int(double(n/2)*p_left) then colours[c]=1;
		elseif ((n/2)+int(double(n/2)*p_left))<c && c<=(n) then colours[c]=0;
		end; #if c<number of blue balls according to proportion, then make element=1. Else=0 (ie will become red).
		
		c=c+1;
	end;
			
		colours.shuffle(1,n/2); #shuffle array elements so that we now have a random order of the correct proportion of zeros and ones in the array
		colours.shuffle(n/2+1,n);
			
	loop int c=1; #telling that the loop will go from c=1 to c=n (for all values in array).
	until c>n
	begin
		if c==1 then mylogfile.print("{" + string(colours[c]) + ",");
		elseif c>1 && c<n then mylogfile.print(string(colours[c]) + ",");
		elseif c==n then mylogfile.print(string(colours[c])+ "},"+ "\n");
		end;
	c=c+1;
end;

t=t+1;
end;