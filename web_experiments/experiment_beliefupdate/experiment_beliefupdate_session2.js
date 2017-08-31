


var progress_value = 0 //set starting value
var stage1_trials = 5;

getFBBar = function() {
	return '<progress class = feedback_bar value = "' + progress_value +
		'" max = "100"></progress><div class = goal_1></div><div class = goal_2></div>'
}


var text_insert = function(text, index, insert_value) {
	text = text.slice(0, index) + insert_value + text.slice(index);
	return text
}

var text_insert = function(text, index, insert_value) {
	text = text.slice(0, index) + insert_value  + text.slice(index);
	return text
}


var getRespondStim = function() {
	var curr_trial = jsPsych.progress().current_trial_global
	var curr_data = jsPsych.data.getData()[curr_trial - 1]
	var stim = curr_data.stimulus.slice(0, -6)
	var response = curr_data.key_press
	console.log(stim)
	if (response == 37) {
		insert_in = stim.search('stim_left')
		stim = text_insert(stim, insert_in, 'selected_')
	} else if (response == 39) {
		insert_in = stim.search('stim_right') /// Find's in the string where 'stim right' is (e.g. id='stim_right')
		console.log(insert_in)
		stim = text_insert(stim, insert_in, 'selected_') /// replaces that with id='selected stim_right'
	}
	console.log('stim after')
	console.log(stim)
	return stim
}


/////////////////////////////
var welcome_block = {
  type: "text",
  text: "Welcome back! Press any key to begin."
};

var instructions_block_backstory = {
  type: "instructions",
  pages: ["<p>Recall, that in the last session you were asked to provide information about yourself. </p>"+
         "<p>In this session, you will be shown pairs of your classmates and each time, you will choose one to include on your team."+
				 "You will be shown the answers to their questions, their self-description and their grades."+
				 "Your choices will be anonymously shown to your classmates.</p>"+
				 "<p>For each pair of people, you have 1 minute to consider the candidates before you are allowed to decide. "+
				 "You then have as long as you need after that.</p>",
				 "Click 'Next' to see the first pair of candidates"
        ]
  ,
  show_clickable_nav: true,
    timing_post_trial: 200
};

/* create experiment timeline array */
var timeline = [];
timeline.push(welcome_block);
timeline.push(instructions_block_backstory);
/////////////////////////////

//// Embed this in a loop like Poldrack ////
for (var i = 0; i < stage1_trials; i++) {


	var stim =
	'<p>Please consider these two candidates. You will be allowed to respond in 1 minute. </p>'+
	'<div id="stim_left">'+
	'<p>Adam XYZ'+String(i)+'</p>'+
	'<img src='+images[0]+' style="max-height: 300px; max-width: 300px;">'+
	'<p>Description: I majored in Psychology and recently completed a senior thesis. For the past 2 summers, I worked at AIG analyzing the shipping industy.</p>'+
	'<p>Grades:</p>'+
	'<ul>'+
	'<li>Geophysics: A</li>'+
	'<li>Psychology 101: B</li>'+
	'</ul>'+
	'</div>'+
	'<div id="stim_right">'+
	'<p>Jeffrey</p>'+
	'<img src='+images[1]+' style="max-height: 300px; max-width: 300px;">'+
	'<p>Description: I majored in Psychology and recently completed a senior thesis. For the past 2 summers, I worked at AIG analyzing the shipping industy.</p>'+
	'<p>Grades:</p>'+
	'<ul>'+
	'<li>Geophysics: A</li>'+
	'<li>Psychology 101: B</li>'+
	'</ul>'+
	'</div>'

	var trial_show_stimuli = {
	  type: 'single-stim',
	  stimulus: stim,
	  is_html: true, /// this is important it allows you to specify full html..
	  choices: [],
	  timing_stim: 600,
	  timing_response: 600,
	  timing_post_trial: 0,
		response_ends_trial: false,
		on_finish: function(data) {
	    console.log('The trial just ended.');
	    ///console.log(JSON.stringify(data));
	  }
	  //prompt: getFBBar
	};

	var idx = stim.search('1 minute. ')
	stim = stim.replace('You will be allowed to respond in 1 minute.','<p> You may now use the "left arrow" or "right arrow" keys to respond. Feel free to continue making your decision. You have as much time as you need. </p> ')
	//stim = text_insert(stim, idx,

	var trial_allow_response = {
	  type: 'single-stim',
	  stimulus: stim,
	  is_html: true, /// this is important it allows you to specify full html..
	  choices: [37,39],
	  data: {
	    stim1_value: 99,
	    trial_id: 'stim_response',
	    condition: 'stable',
	    exp_stage: 'test'
	  },
	  timing_stim: 100000,
	  timing_response: 100000,
	  timing_post_trial: 0,
		response_ends_trial: true,
		on_finish: function(data) {
	    console.log('The trial just ended.');
	    ///console.log(JSON.stringify(data));
	  }
	  //prompt: getFBBar
	};

	/// Or just add another variable which times out ..
	/// I can add another timeout in single-stim.js that prevents response (but make my own single-stim-chris.js)

	var trial_show_response = {
		type: 'single-stim',
		stimulus: getRespondStim,
		is_html: true,
		choices: 'none',
		data: {
			correct_response: 'test'
		},
		timing_stim: 1500,
		timing_response: 1500,
		timing_post_trial: 0,
		on_finish: function(data) {
			console.log('Response shown');
			///console.log(JSON.stringify(data));
		}
		//prompt: getFBBar
	};

timeline.push(trial_show_stimuli);
timeline.push(trial_allow_response);
timeline.push(trial_show_response);

}

/////////////////////////////
var end_block = {
  type: "text",
  text: "Thanks. Press 'Enter' on your keyboard to be redirected to the home screen."
};


timeline.push(end_block);


function save_data(data){
   var data_table = "table_beliefupdate_1"; // change this for different experiments
   value = 'test_value'
   $.ajax({
      type:'get',
      cache: false,
      data: {
          table: data_table,
          json: JSON.stringify(data),
          opt_data: {key: value}
      },
      success: function(output) { console.log(output); } // write the result to javascript console
   });
}


/*jsPsych.preloadImages(images, function(){ startExperiment(); });

//// START /////
function startExperiment(){*/
  jsPsych.init({
    timeline: timeline,
		//show_progress_bar: true,
    //fullscreen: true,
    on_finish: function() {
      save_data(jsPsych.data.getData());
			window.location.href = '/';
			//location.reload();
    }
  })

//};
