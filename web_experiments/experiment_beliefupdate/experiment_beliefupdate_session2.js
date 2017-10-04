
// could replace with this, but then I need new descriptions etc. ['10112342','10518512']
example_stim1 = html_for_pairwise(pairs[0],profile_chart_img_paths[0],self_describes[0],sat_grades[0],opening_instructions='',if_you=false,include=1)
example_stim12 = html_for_pairwise(pairs[0],profile_chart_img_paths[0],self_describes[0],sat_grades[0],opening_instructions='',if_you=false,include=12)
example_stim123 = html_for_pairwise(pairs[0],profile_chart_img_paths[0],self_describes[0],sat_grades[0],opening_instructions='',if_you=false,include=123)
example_stim1234 = html_for_pairwise(pairs[0],profile_chart_img_paths[0],self_describes[0],sat_grades[0],opening_instructions='',if_you=false,include=1234)


var instructions_block_backstory1 = {
  type: "instructions",
  pages: [
          "<p>Welcome back! Recall that you and your classmates are starting internships for company ABC.</p>"+
 				 "<p>In the last session, you wrote a short description of yourself, provided grades and SAT scores, and answered questions about your 'work style'. </p>"+
         "<p>In this session, you and your classmates will use this information to decide who to work with.",
				 "<p>You will be shown 15 pairs of your classmates, and each time you will choose the one who you think would be better to work with.</p> "+
				 "<p>For each pair, pick the person that you think will be best regardless of who you have already chosen.</p>",

				 "<p>Here is an example of the type of choice you will make. "+
			 	 "You will be shown two possible partners, as shown below. Each person has been given a randomly generated 8-digit ID number.</p> ",
			 	 "<p>We have taken the answers to the questions in session 1 and used them to generate these summary bar plots, which show where each individual is relative to all others on these three traits. ",
			 	 "<p>Below that you'll see a free description that each individual, including yourself, has provided. </p></br>",
			 	 "<p>At the bottom, you'll see the SAT scores and the 3 grades that the individual has chosen to share.</p>",
			 ]
  ,
	after_button_html:['','',example_stim1,example_stim12,example_stim123,example_stim1234],
  show_clickable_nav: true,
    timing_post_trial: 50,
		allow_keys: false,
};


var instructions_block_backstory2 = {
  type: "instructions",
  pages: ["<p> You may use any or all of this information to influence your choice. You have as long as you need to decide.</p>"+
				 "<p>So here, if you wanted to choose a person on the left, you would press the 'left arrow' key. You can also switch your choice by pressing the 'right arrow' key.</p>"+
				 "<p>Press 'enter' to register your choice.</p>"
	],
	after_button_html:[example_stim1234],
  show_clickable_nav: false,
    timing_post_trial: 50,
		allow_backward: false,
		key_forward:'enter',
		key_extra1: 'leftarrow',
		key_extra2: 'rightarrow',
		key_extra1_func: select_left,
	 key_extra2_func: select_right,
	 on_finish: function(data) {
		 console.log('The trial just ended.');
		 console.log(JSON.stringify(data));
	 }
};

var instructions_block_backstory3 = {
  type: "instructions",
  pages: ["Click 'Next' to see the first pair of candidates.",
	]
  ,
  show_clickable_nav: true,
    timing_post_trial: 500,
		allow_keys:false,
};


/* create experiment timeline array */
var timeline = [];
timeline.push(instructions_block_backstory1);
timeline.push(instructions_block_backstory2);
timeline.push(instructions_block_backstory3);



//// Embed this in a loop like Poldrack ////
for (var i = 0; i < num_trials; i++) {

	opening_instructions=
  //'<p style="float:right">'+String(i)+'/10</p>'+
  '<p style="width:100%">Please consider these two candidates and choose the one you would rather work with.</p> <p>Use the "left arrow" or "right arrow" keys to respond. You have as much time as you need. </p>'

  stim = html_for_pairwise(pairs[i],profile_chart_img_paths[i],self_describes[i],sat_grades[i],opening_instructions=opening_instructions)

	var trial_allow_response = {
	  type: 'alt-choice-gagne',
	  stimulus: stim,
	  is_html: true, /// this is important it allows you to specify full html..
	  timing_stim: -1,
	  timing_response: -1,
	  timing_post_trial: 750,
		response_ends_trial: false,
		key_extra1: 'leftarrow',
		key_extra2: 'rightarrow',
		key_end_trial: 'enter',
		key_extra1_func: select_left,
	  key_extra2_func: select_right,
		data: {trial_name: 'choosing_resp',pair:String(pairs[i][0])+','+String(pairs[i][1])},
		on_finish: function(data) {
	    console.log('The trial just ended.');
	    console.log(JSON.stringify(data));
	  },
	};

timeline.push(trial_allow_response);

}

/////////////////////////////
var instructions_midway1 = {
  type: "instructions",
  pages: ["<p>Thanks!</p><p>Your choices will be shown anonymously to your classmates in session 3.</p> "],
      show_clickable_nav: true,
      timing_post_trial: 200,
      data: {trial_name: 'instruction_traits'},
      on_finish: function(data){
                console.log('The trial just ended.');
                console.log(JSON.stringify(data))
              }
};
timeline.push(instructions_midway1)

var feedback_question2 = {
  type: "survey-multi-choice",
  questions: ['When choosing who to work with, which information did consider the most?'],
  options: [['"Work style"','Personal description','SAT scores','Grades']],
};

timeline.push(feedback_question2)

var instructions_midway = {
  type: "instructions",
  pages: [
  "<p>Before you finish this session, we'd like you to answer a few questions about your personality and mood. The answers to these questions will <strong>not</strong> be shown to your classmates. " +
      "They are for us (the researchers) to look at how different traits affect peoples' choices. So, please answer as honestly as possible.</p>"],
      show_clickable_nav: true,
      timing_post_trial: 200,
      data: {trial_name: 'instruction_traits'},
      on_finish: function(data){
                console.log('The trial just ended.');
                console.log(JSON.stringify(data))
              }
};

timeline.push(instructions_midway)


////////////
var survey_stai_state = {
    type: 'survey-likert',
    preamble: preamble_stai_state,
    labels: choices_stai_state,
    questions: questions_stai_state,
    data: {trial_name: 'survey_stai_state'},
    check_completion: true,
    on_finish: function(data){$(document).ready(function () {window.scrollTo(0,0);})}
};

var survey_stai_trait = {
    type: 'survey-likert',
    preamble: preamble_stai_trait,
    labels: choices_stai_trait,
    questions: questions_stai_trait,
    data: {trial_name: 'survey_stai_trait'},
    check_completion: true,
    on_finish: function(data){$(document).ready(function () {window.scrollTo(0,0);})}
};

var survey_cesd = {
    type: 'survey-likert',
    preamble: preamble_cesd,
    labels: choices_cesd,
    questions: questions_cesd,
    data: {trial_name: 'survey_cesd'},
    check_completion: true,
    on_finish: function(data){$(document).ready(function () {window.scrollTo(0,0);})}
};

var survey_masq = {
    type: 'survey-likert',
    preamble: preamble_masq,
    labels: choices_masq,
    questions: questions_masq,
    data: {trial_name: 'survey_masq'},
    check_completion: true,
    on_finish: function(data){$(document).ready(function () {window.scrollTo(0,0);})}
};

timeline.push(survey_stai_state);
timeline.push(survey_stai_trait);
timeline.push(survey_cesd);
timeline.push(survey_masq);

/////////////////////////////
var end_block = {
  type: "text",
  text: "<p>Thanks! You have completed this part of the experiment. "+
  "Press 'enter' on your keyboard and wait for a link to appear below. "+
  "This should take a 5-30 seconds. "+
  "Do not close your browser until this process is complete. </p>"+
  ""
  +"<p>(If you are doing this as a demo. Please just close the window <strong>without</strong> pressing 'enter')</p>"
};
timeline.push(end_block);
/////////////////////////////


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
      success: function(output) { console.log(output);
				console.log('here')
				var el = jsPsych.getDisplayElement();
				el.append('<div><a id="button_return_home" href="/">Return Home</a></div>')

			} // write the result to javascript console
   });
}




jsPsych.pluginAPI.preloadImages(profile_chart_img_paths, function(){
	startExperiment(); });



//// START /////
function startExperiment(){
  jsPsych.init({
    timeline: timeline,
		//show_progress_bar: true,
    fullscreen: true,
    on_finish: function() {
      save_data(jsPsych.data.getData());
			//location.reload();
    }
  })
};
