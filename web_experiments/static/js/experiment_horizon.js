


// LOSS OR REWARD 
console.log(outcome_type)
var totalpoints
if(outcome_type=='gain'){
 totalpoints = 0
 var sign = 1

}else if(outcome_type=='loss'){
 totalpoints = 10000
 var sign = -1

}

/// Number of Trials

var total_gametrials = 10 // know max horizon??
var total_games = 10
var total_games_max = 360 // this is the one counterbalanced to
var total_instruct = 10  // check below 
var gls = [5,10]
var mu = [40, 60]
var mu_deltas = [-30, -20, -12, -8, -4, 4, 8, 12, 20, 30]
var ambi_conds = [1, 2, 2, 3]
var currentevent = -1 // current game or instruction
var game = 0 
var gametrial = 0 

// Practice Trials //
var pgamevalues = [[[50,54,46,48,53,51,59,44,47,53],[60,64,56,58,63,61,69,54,57,63]],[[50,51,52,53,54],[60,61,62,63,64]]]
var pgametypes = [10,5]
var pfixed_choices= [[0,1,1,0],[0,0,0,1]] 

console.log(pfixed_choices)

// Starting Permissions
var canProceed = true // allowed to press space bar 
var trialRespond = true // respond left or right (only during trial)



// For Debugging // 

//var eventarray = ['instruct-0','instruct-1','instruct-2','pgame-3-0','instruct-4','instruct-5','instruct-6','game-0','game-1','endscreen'];
//var eventarray = ['instruct-0','game-0','game-1','endscreen'];
//var gamevalues = [[[50,51,52,53,54],[60,61,62,63,64]],[[50,51,52,53,54,50,51,52,53,54],[50,51,52,53,54,50,51,52,53,54]]]
//var gametypes = [5,10]
//var fixed_choices= [[0,1,1,0],[0,0,0,1]] 


var eventarray = []
eventarray = ['instruct-0','instruct-1','pgame-0+2','instruct-3','instruct-4','pgame-1+5','instruct-6']

var current_instruct 

// within an instruction screen the p-game might have seperate instructions // 
// games get appended to this. 




$(document).ready( function() {
	

	/*Setup Functions */
	$('#button_continue').show();
	$('#button_previous').hide();
	$('#button_return_home').hide();
	

	$('#outcome').hide();

	$('#trialcounter').hide();
	$('#pointscounter').hide();
	$('#instruct').show();

	$('#thanks').hide();
	$('#left_bandit').hide()
	$('#right_bandit').hide()

	

	var out = generate_trial_order(eventarray)
	eventarray=out[0]
	gamevalues=out[1]
	gametypes=out[2]
	fixed_choices=out[3]

	//$(document).bind('keyup',Proceed);
	$(document).bind('keyup',Pressedleft);
	$(document).bind('keyup',Pressedright);

	$("#button_continue" ).click(function() {
		Proceed('next');
	});
	$("#button_previous" ).click(function() {
		Proceed('previous');
	});
	console.log(eventarray)
	console.log(gametypes)
	console.log(gamevalues)
	console.log(fixed_choices)
	Proceed('next');



	
});

/// Key Codes
// 32 = space
// 13 = enter
// 77 = m
// 90 = z
// 37 = left arrow 
// 39 = right arrow 

/// for trial's don't send next.. or previous.. 


/// 320 games (160 of 5,10)
/// 4 blocks of 80
/// guassian 8 points 
/// one mean was either 40 or 60
/// other mean was 4, 8, 12, 20, 30

/// counter balancing
/// generate total list of the options 


/// difference [so then in that 80=+diff 10 options.. 8 each
/// true mean 

/// then randomly shuffle this (a few times?)

/// don't worry about side of the screen. 
/// 

/// Actually should I just get a particular CB and use the same one for everyone???? 

/*

function generate_trial_arrays(){

	
	for (gl = 0; gl<2;gl++){ 
		for (side = 0; side<2; ii++){ 
			for (b = 0; b<2, b++){
				base=mu[b]
				for(d=0; d<10,d++){
					diff = mu_deltas[d]
				}
			
			}
	
		}


	}
	
	/// game-type [160 5 and 10 games]

	var gametypes_5 = []
	var gametypes_10 = []
	for (ii = 0; ii <total_games_max/2; ii++) {var gametypes_5 = gametypes_5.concat(5)}
	for (ii = 0; ii <total_games_max/2; ii++) {var gametypes_10 = gametypes_10.concat(10)}
	var gametypes = gametypes_5.concat(gametypes_10)

	/// base mean [40=40, 40=60, 40=+diff, 40=+diff, then other option]
	mean_left // 40,60,40+diff,60+diff // for each game type. 
	mean_right// 40+diff,60+diff, 40, 60

	

	for (ii = 0; ii <total_games_max; ii++) {
		// choose the length of the game
		var gl  = Math.floor(Math.random()*2)
		var game_length = gls[gl]
		var gametypes = gametypes.concat(game_length)

	}

	return [gametypes]

}

*/



function generate_trial_order(eventarray){

	
	var gamevalues = []
	var gametypes = [] // REMOVE
	var fixed_choices = []

	// add instructions 
	/*for (i = 0; i <total_instruct; i++) {
		var eventarray = eventarray.concat('instruct-'+i.toString())
	}


	// add practice games
	for (i = 0; i <2; i++) {
		var eventarray = eventarray.concat('pgame-'+i.toString())
	}

	// add more instructions
	for (i = 0; i <2; i++) {
		var eventarray = eventarray.concat('instruct-'+i.toString())
	}
	*/


	// add games 
	for (ii = 0; ii <total_games; ii++) {
		var eventarray = eventarray.concat('game-'+ii.toString())

		/// REMOVE
		var gl  = Math.floor(Math.random()*2)
		var game_length = gls[gl]
		var gametypes = gametypes.concat(game_length)

		// add game trials 
		larray = []
		rarray = []

		// decide whether left or right is better. 

		// decide what the mu is.. 

		// calculate mu delta
		for (j = 0; j <game_length; j++){
			var l = Math.round(normal_variable(40,64))
			var r = Math.round(normal_variable(40+10,64))
			var larray = larray.concat(l)
			var rarray = rarray.concat(r)
		}
		var array = [[larray,rarray]]
		var gamevalues = gamevalues.concat(array)

		// add fixed choices 
		var fixed_choices= fixed_choices.concat([[0,1,1,0]])

		// if break needed. 
		if(i % 10 ==9){
			var eventarray = eventarray.concat('break')
		}
	}

	var eventarray = eventarray.concat('endscreen')
	console.log(eventarray)
	return [eventarray,gamevalues,gametypes,fixed_choices]

}
////




function Proceed(e){


	if (canProceed==true){

		// increment the event counter 
		if(e=='next'){
			currentevent+=1
		}
		if(e=='previous'){
			currentevent-=1
		}

		if(currentevent<0){
			currentevent=0
		}

		// get the name of the current event 
		eventt=String(eventarray[currentevent])
		console.log('event: ')
		console.log(eventt)

		//// Do current event 
		if (eventt.indexOf('instruct')==0){
			$('#instruct').show()
			$('#button_continue').show()
			$('#button_previous').show()
			$('#trialcounter').hide()
			$('#pointscounter').hide()

			trialRespond = false
			current_instruct = parseInt(eventt.split('-')[1])// get number
			RunInstruct(current_instruct);

		} else if (eventt.indexOf('pgame')==0){
			$('#instruct').show()
			$('#button_continue').hide()
			$('#button_previous').hide()
			$('#pointscounter').show()
			$('#left_bandit').show()
			$('#right_bandit').show()
			trialRespond=true
			
			game = parseInt(eventt.split('-')[1])// get number  
			current_instruct = parseInt(eventt.split('+')[1])// get number  
			
			var instruct = instructs[current_instruct][gametrial]
			if(instruct == null){instruct=''}
			
		
			document.getElementById('instruct').innerHTML=instruct
			startTrialTime = new Date().getTime();
			game_length = pgametypes[game]	

			fixed_c = pfixed_choices[game][gametrial]
			
			if(fixed_c == null){fixed_c=2}
			outcomes = [pgamevalues[game][0][gametrial],pgamevalues[game][1][gametrial]]
		
			if(gametrial==0){
				move_green_boxes(game,gametrial,fixed_c)
				make_game_size(game_length)
				$('#button_previous').show()
			}else if(gametrial<game_length){
				move_green_boxes(game,gametrial,fixed_c)
			}else if(gametrial==game_length){
				//reset_xx();
				gametrial=0
				//currentevent+=1

				trialRespond=false
				//$('#left_bandit').hide()
				//$('#right_bandit').hide()
				//Proceed('next')
				$('#button_continue').show()
				

			}	



		} else if (eventt.indexOf('game')==0){
			$('#instruct').hide()
			$('#button_continue').hide()
			$('#button_previous').hide()
			$('#trialcounter').show()
			$('#pointscounter').show()
			$('#left_bandit').show()
			$('#right_bandit').show()	
			trialRespond=true
			game = parseInt(eventt.split('-')[1])
			game_length = gametypes[game]	
			startTrialTime = new Date().getTime();

			
			//console.log(fixed_choices)
			//console.log(gametrial)

			fixed_c = fixed_choices[game][gametrial]
			if(fixed_c == null){fixed_c=2}
			outcomes = [gamevalues[game][0][gametrial],gamevalues[game][1][gametrial]]

		

			// FIRST TRIAL 
			if(gametrial==0){
				make_game_size(game_length)
				// update Trial Counter
				var element = document.getElementById("trialcounter");
				element.innerHTML='Completed: '+game.toString()+'/'+total_games
				$('#trialcounter').show()
				// only highlight first box
				move_green_boxes(game,gametrial,fixed_c)
			// MIDDLE TRIALS 
			}else if(gametrial<game_length){
				move_green_boxes(game,gametrial,fixed_c)
			// LAST TRIAL 
			}else if(gametrial==game_length){
				gametrial=0
				canProceed=false;
				trialRespond=false;
				// Proceed after break (look up what is next in event array) 
				setTimeout(function() {
					/// change borders and numbers back to starting position. 
					reset_xx();
					$('#left_bandit').hide()
					$('#right_bandit').hide()
					canProceed=true;
					trialRespond=true;
					Proceed('next');
					}, 2000);	
			}
		
		}else if(eventt.indexOf('break')==0){
			RunBreak();
		} 
		else if (eventt.indexOf('endscreen')==0){
			
			RunEndScreen();
		}
	}
}



function Pressedleft(e) {
if(trialRespond){
	console.log('pressed left')
	//console.log(fixed_c)
	if (e.keyCode==90) {
		if(fixed_c!=1){
			Outcome('left')	
		}
	}
}
}
function Pressedright(e) {
if(trialRespond){
	console.log('pressed right')
	if (e.keyCode==77) {
		if(fixed_c!=0){
			Outcome('right')	
		}
	}
}
}




function make_game_size(game_length){
					// make the game the appropriate length. 
	for (i = 0; i < total_gametrials; i++) {
	    	if(i<game_length){
		$('#b'+(i).toString()+'_l').show();
		$('#b'+(i).toString()+'_r').show();					
		}else{
		$('#b'+(i).toString()+'_l').hide();
		$('#b'+(i).toString()+'_r').hide();
		}
	}
}

function move_green_boxes(game,gametrial,fixed_c){
		if(gametrial>0){
		document.getElementById('b'+(gametrial-1).toString()+'_l').style.borderColor = "black";
		document.getElementById('b'+(gametrial-1).toString()+'_r').style.borderColor = "black";
		}
				
		if(fixed_c==0){
			document.getElementById('b'+(gametrial).toString()+'_l').style.borderColor = "green";
		}else if(fixed_c==1){
			document.getElementById('b'+(gametrial).toString()+'_r').style.borderColor = "green";
		}else if(fixed_c==2){
			document.getElementById('b'+(gametrial).toString()+'_l').style.borderColor = "green";
			document.getElementById('b'+(gametrial).toString()+'_r').style.borderColor = "green";
		}
							
}

function reset_xx(){
	for (i = 0; i < total_gametrials; i++) {
		document.getElementById('b'+(i).toString()+'_l').style.borderColor = "black";
		document.getElementById('b'+(i).toString()+'_r').style.borderColor = "black";
	    	var element = document.getElementById('b'+(i).toString()+'_l')
		element.innerHTML = 'XX'
		var element = document.getElementById('b'+(i).toString()+'_r')
		element.innerHTML = 'XX'
	}
}


function reveal_outcome(response,game,gametrial){
	/// Display outcome 
	if(response=='left'){
			var element = document.getElementById('b'+(gametrial).toString()+'_l')
			outcome = outcomes[0]
			element.innerHTML = outcome
			choice = 0
	}else if (response=='right'){
			var element = document.getElementById('b'+(gametrial).toString()+'_r')
			outcome=outcomes[1]
			element.innerHTML = outcome
			choice = 1
	}
	return outcome

}



function Outcome(response){

	outcome=reveal_outcome(response,game,gametrial)


	// Display Total Points
	totalpoints+=outcome*sign
	var element = document.getElementById("pointscounter");
	element.innerHTML='Points: '+totalpoints
	$('#pointscounter').show()
		
	// get RT
	var currentTime = new Date().getTime();
	var RT = currentTime - startTrialTime;
	
	// Store data (sends get query to django)
	$.get("?resp="+response+"&rt="+RT+"&game_number="+game+"&game_trial_number="+gametrial+"&totalpoints="+totalpoints+"&left_value="+outcomes[0]+"&right_value="+outcomes[1]+"&trialstart="+startTrialTime+"&choice="+choice+"&fixed="+fixed_c+"&gametype="+outcome_type, function(response){});

	gametrial+=1
	Proceed('stay')
	
		
}




/////////////////// INTRUCTIONS //////////////////////////////



//// WRite TExt Here 


instructs = ['Welcome! The aim of this task is to gain as many points as you can. Your score at the end will be compared to the other participants, and your relative ranking will determine the bonus you may receive. A bonus of $3 will be awarded to participants that score in the top 5%, $1 to those in the top 10%, and $0.25 to the top 50%. The participants used to establish rankings will be those tested within a 1-week window.',

	'In order to gain points, you have to choose between two slot machines. Each column of boxes represents one slot machine. In this case, you can choose between the two slot machines 10 times, as indicated by the number of rows. These 10 choices constitute a single game and there will be 100 games.',

	[['For the first 4 choices of each game, you have to select the slot machine with a green border. Press Z for the left slot machine now.'],
	 ['The amount of points awarded will be revealed in the box. In this case, you won 50 points. Your total points will be displayed in the upper right corner. You do not get to see what you would have received had you chosen the other slot machine. Now, you can choose the right slot machine by pressing M. '],
	['Select right again'],
	['Select left'],
	['After the first 4 choices, you will be able to choose from either slot machine. You can press either Z or M now for the next 6 choices.'],
	[''],
	[''],
	[''],
	[''],
	[''],
	['As you can see, the left and right slot machines deliver a different amount of points on average. The left slot machine tended to deliver around 50 points, while the right tended to deliver around 60 points. In this game, you would want to choose the right slot machine to gain more points. Note however, that there is variability in the amount of points delivered, and in some games it may not be obvious which slot machine is better. This variability is the same for both slot machines and stays constant throughout the experiment.']
	],


	'Next, the slot machines will be reset and you will start a new game. Importantly, the average reward levels for the left and right slot machines are randomly re-chosen to be between 0 and 100, and do not depend on the previous game. One slot machine will always have a higher reward than the other, but whether it is on the right or left is randomly chosen for each game.',

	'In addition to 10 choice games, there will be games with 5 choices like this.',

[['Again, for the first 4 choices of each game, you have to select the slot machine with a green border. Press Z for the left slot machine now.'],
	[''],
	[''],
	[''],
	['After the first 4 choices, you will be able to choose from either slot machine for your last choice.'],
	[''],
	['']
	],

	'STOP! You are about to start the experiment. Once you click CONTINUE, you will not be able to go back. If you would like to re-read the instructions, please click GO BACK. It is NOT possible to refresh the page and start off where you left off. If you are ready to begin the experiment, click CONTINUE.']



instructs_loss = []

//// Add functionality to the text (e.g. display boxes under certaint instruction screens etc. 


function RunInstruct(currentnumber){
	
	//console.log(currentnumber)
	//console.log(instructs)
	document.getElementById('instruct').innerHTML=instructs[currentnumber]
	
	
	if(currentnumber==0){
		$('#button_previous').hide();
		$('#left_bandit').hide()
		$('#right_bandit').hide()
		
	}else if(currentnumber==1){
		
		// make the game the appropriate length. 
		
		make_game_size(10)

		$('#left_bandit').show()
		$('#right_bandit').show()

	}else if(currentnumber==3){
		make_game_size(10)
		reset_xx()
	}else if(currentnumber==4){
		make_game_size(5)
		$('#left_bandit').show()
		$('#right_bandit').show()
	}else if(currentnumber==6){
		// Last instruction before games
		reset_xx()
		$('#left_bandit').hide()
		$('#right_bandit').hide()
		console.log(outcome_type)
		console.log('here')
		if(outcome_type=='gain'){
		 totalpoints = 0
	         console.log('made it')
		 console.log(totalpoints)
		}else if(outcome_type=='loss'){
		 totalpoints = 10000
		}
		var element = document.getElementById("pointscounter");
		element.innerHTML='Points: '+totalpoints
		
	}




	
}


////////////////// BREAK //////////////////


function RunBreak(event){
	$('#instruct').show()
	$('#button_continue').show()
	$('#button_previous').show()
	document.getElementById('instruct').innerHTML='Take a break. When you are ready to begin, click CONTINUE.'
}

////////////////// END SCREEN //////////////////

function RunEndScreen(){
	console.log('here')
	var element = document.getElementById("trialcounter");
	element.innerHTML='Completed: '+game.toString()+'/'+total_games
	//document.getElementById("thanks2").innerHTML='You have earned an extra: $'+totalpoints*.0005
	$('#fixation').hide()
	
	$('#thanks').show()
	$('#button_return_home').show();
	canProceed = false 
// Store data (sends get query to django)
	finished=1
	$.get("?finished="+finished, function(response){});
	
	
	
	/// Genenerate finished key 
	
}


////////////////// Helper Functions //////////////////

function normal_variable(mu,desired_var) {
    // mean will be at 50 
    var x = 0
    var n_required = (Math.pow(100,2)/12)/desired_var // this is from variance of uniform and variance of a sum. 
    for(i = 0; i < n_required; i++){
	var x = x+Math.random()*100
     }
    var x = x/i // create my normal random variable. 
    var x = x-50 + mu
    return x;             
}



/*
//// TESTING NORMAL FUNCTION /// 
/// WORKS!! 
// draw a bunch of random variables. 

nn = 200
xs = []
for(n=0; n<nn;n++){
	var x = normal_variable(40,64)
	var xs = xs.concat(x) // store it
}

// find the mean and variance of my normal variable, and check 
console.log(xs)
var mean = 0
for(n=0; n<nn;n++){
    mean+=xs[n]
}
var mean = mean/n
console.log('mean')
console.log(mean)
var ss = 0
for(n=0; n<nn;n++){
    ss+=Math.pow(xs[n]-mean,2)
}
var ss = ss/n
console.log('var')
console.log(ss)

*/
