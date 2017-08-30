


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
  pages: ["<p>Recall that you and your classmates are starting an internship program for company ABC. "+
        "You will be forming a teams with your classmates in order to complete a project.</p>",
        "In this session, you will see the information provided by pairs of your classmates (anonymized) and you will choose people that you'd like to be on your team. Your choices will be anonymous.</p>"
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
	'<p>Please consider these two candidates. </p>'+
	'<div id="stim_left">'+
	'<p>Adam XYZ'+String(i)+'</p>'+
	'<img src='+images[0]+' style="max-height: 300px; max-width: 300px;">'+
	'<p>Description: asdfasdfadsfasdfasfas</p>'+
	'</div>'+
	'<div id="stim_right">'+
	'<p>Jeffrey</p>'+
	'<img src='+images[1]+' style="max-height: 300px; max-width: 300px;">'+
	'<p>Description: asdfasdfadsfasdfasfas</p>'+
	'</div>'

	var trial_show_stimuli = {
	  type: 'single-stim',
	  stimulus: stim,
	  is_html: true, /// this is important it allows you to specify full html..
	  choices: [],
	  timing_stim: 10000,
	  timing_response: 10000,
	  timing_post_trial: 0,
		response_ends_trial: false,
		on_finish: function(data) {
	    console.log('The trial just ended.');
	    ///console.log(JSON.stringify(data));
	  }
	  //prompt: getFBBar
	};

	var idx = stim.search('candidates.')
	stim = text_insert(stim, idx, 'You may now use the "left arrow" or "right arrow" keys to respond')

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
  text: "Thanks. Goodbye."
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
			window.location.href = "/";
    }
  })

//};
