
// could replace with this, but then I need new descriptions etc. ['10112342','10518512']
example_stim1 = html_for_pairwise(pairs[0],profile_chart_img_paths[0],self_describes[0],sat_grades[0],opening_instructions='',if_you=false,include=1)
example_stim12 = html_for_pairwise(pairs[0],profile_chart_img_paths[0],self_describes[0],sat_grades[0],opening_instructions='',if_you=false,include=12)
example_stim123 = html_for_pairwise(pairs[0],profile_chart_img_paths[0],self_describes[0],sat_grades[0],opening_instructions='',if_you=false,include=123)
example_stim1234 = html_for_pairwise(pairs[0],profile_chart_img_paths[0],self_describes[0],sat_grades[0],opening_instructions='',if_you=false,include=1234)

var intro_block = {
  type: "instructions",
  pages: ["Thank you for coming back to take part in our experiment! "+
  "On the next page, see will see our consent form, which provides details about the study procedures. "+
  "In order to participate in this part, you will need to click a button at the bottom of the page indicating "+
  "that you agree to participate. "
],
  show_clickable_nav: true,
  timing_post_trial: 200,
  data: {trial_name : 'instructions_consent'},
  on_finish: function(data){
    console.log('The trial just ended.');
    console.log(JSON.stringify(data))
    $(document).ready(function () {window.scrollTo(0,0);});
  }
}

var consent_block = {
  type: "consent",
  text: consent_part2_html,
  continue_button: 'consent1_continue_button',
  buttons_groups_to_check: ['group1','group2','group3'],
  data: {trial_name : 'consent_part2_1'},
  on_finish: function(data){
    console.log('The trial just ended.');
    console.log(JSON.stringify(data))
    $(document).ready(function () {window.scrollTo(0,0);});
  }
}

var consented_out = {
    // no need to put this one in the timeline. because it's in a nested timelin
    type: 'text_noresp',
    text: 'You have chosen not to participate in our experiment. We thank you for your interest. You may leave the website whenever you would like.'
}

var if_consent = {
    timeline: [consented_out],
    conditional_function: function(){
        var data = jsPsych.data.getLastTrialData();
        if(data.responses.split(',')[0] == 'I disagree'){
            return true;
        } else {
            return false;
        }
    }
}



var instructions_block_backstory1 = {
  type: "instructions",
  pages: [
          "<p>Welcome back! Recall that you and other UCB students are starting hypothetical internships for company ABC.</p>"+
 				 "<p>In the last session, you wrote a short description of yourself, provided grades and SAT scores, and answered questions about your 'work style'. </p>"+
         "<p>In this session, we will show you anonymized profiles of other UCB students. "+
         "These will be divided into 15 pairs. For each pair, you will pick the one who you think would be better to work with. "+
				 "For each pair, pick the person you think will be better to work with irrespective of who you have chosen previously.</p>"+

				 "<p>Click 'next' for an example. The profiles in the example have been made up, but all other profiles you see will be real.</p> ",

         "<p>Each person has been given a randomly generated 8-digit ID number as demonstrated below.</p>",

			 	 "<p>Below each person's ID number, you will see a summary bar plot which shows where that individual is relative to all others on three traits. We have generated these plots using the answers to the questions in session 1. Click 'next' to see these. ",

         "<p>Click 'next' after you have looked at the bar plots.</p>",

			 	 "<p>In addition, you will see the open-ended description that each individual, including yourself, has provided. These will be presented beneath the bar plots. Click 'next' to see these.</p>",

         "<p>Click 'next' after you have looked at the open-ended descriptions.</p>",

			 	 "<p>At the very bottom of the each profile, you will see the SAT scores and the 3 grades that the individual has chosen to share. Click 'next' to see these.</p>",

         "<p>Click 'next' after you have looked at the SAT scores and grades.</p>",
			 ]
  ,
	after_button_html:['',example_stim1,'',example_stim12,'',example_stim123,'',example_stim1234],
  show_clickable_nav: true,
    timing_post_trial: 50,
		allow_keys: false,
};


var instructions_block_backstory2 = {
  type: "instructions",
  pages: ["<p> You may use any or all of this information to influence your choice. You have as long as you need to decide.</p>"+
				 "<p>So here, if you wanted to choose a person on the left, you would press the 'left arrow' key. You can also switch your choice by pressing the 'right arrow' key. The 'enter' key registers you choice. </p>"+
				 "<p>So, here please select the 'left arrow' or 'right arrow' and then press 'enter'. </p>"
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
  pages: ["Ok, now we are on to the task for real. Click 'next' to see the first pair of candidates.",
	]
  ,
  show_clickable_nav: true,
    timing_post_trial: 500,
		allow_keys:false,
};


/* create experiment timeline array */
var timeline = [];
timeline.push(intro_block);
timeline.push(consent_block)
timeline.push(if_consent)

timeline.push(instructions_block_backstory1);
timeline.push(instructions_block_backstory2);
timeline.push(instructions_block_backstory3);



//// Embed this in a loop like Poldrack ////
for (var i = 0; i < num_trials; i++) {

	opening_instructions=
  //'<p style="float:right">'+String(i)+'/10</p>'+
  '<p style="width:100%">Please consider these two candidates and choose the one you would rather work with.</p> <p>Use the "left arrow" or "right arrow" keys to respond. Press "enter" to register your choice. You have as much time as you need. </p>'

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

//timeline.push(trial_allow_response);

}

/////////////////////////////
var instructions_midway1 = {
  type: "instructions",
  pages: ["<p>Thanks! You have finished comparing the candidates.</p> Next, we'd like you to answer some questions about how you were making your choices.</p> "],
      show_clickable_nav: true,
      timing_post_trial: 200,
      data: {trial_name: 'instruction_traits'},
      on_finish: function(data){
                console.log('The trial just ended.');
                console.log(JSON.stringify(data))
              }
};
//timeline.push(instructions_midway1)


var choices_f = ['did not consider','considered alittle','considered a lot','considered exclusively']
var feedback_question2 = {
  type: "survey-likert",
  preamble: "When choosing who to work with, how much did you consider each of the following aspects of the profiles?",
  questions: ['whether group vs. independent worker',
  'whether analytic vs. intuitive thinker',
  'whether strategic vs. adaptive planner',
  "the personal description",
  "SAT scores",
  "Grades"],
  labels: [choices_f,choices_f,choices_f,choices_f,choices_f,choices_f],
};


//timeline.push(feedback_question2)

var instructions_midway = {
  type: "instructions",
  pages: [
  "<p>Next, we'd like you to answer a few questions about your personality and mood. The answers to these questions will <strong>not</strong> be shown to the other participants. " +
      "They are for us (the researchers) to look at how different traits affect peoples' choices. So, please answer as honestly as possible.</p>"],
      show_clickable_nav: true,
      timing_post_trial: 200,
      data: {trial_name: 'instruction_traits'},
      on_finish: function(data){
                console.log('The trial just ended.');
                console.log(JSON.stringify(data))
              }
};

//timeline.push(instructions_midway)


////////////
var survey_stai_state = {
    type: 'survey-likert',
    preamble: preamble_stai_state,
    labels: choices_stai_state,
    questions: questions_stai_state,
    data: {trial_name: 'survey_stai_state'},
    check_completion: false,
    on_finish: function(data){$(document).ready(function () {window.scrollTo(0,0);})}
};

var survey_stai_trait = {
    type: 'survey-likert',
    preamble: preamble_stai_trait,
    labels: choices_stai_trait,
    questions: questions_stai_trait,
    data: {trial_name: 'survey_stai_trait'},
    check_completion: false,
    on_finish: function(data){$(document).ready(function () {window.scrollTo(0,0);})}
};

var survey_cesd = {
    type: 'survey-likert',
    preamble: preamble_cesd,
    labels: choices_cesd,
    questions: questions_cesd,
    data: {trial_name: 'survey_cesd'},
    check_completion: false,
    on_finish: function(data){$(document).ready(function () {window.scrollTo(0,0);})}
};

var survey_masq = {
    type: 'survey-likert',
    preamble: preamble_masq,
    labels: choices_masq,
    questions: questions_masq,
    data: {trial_name: 'survey_masq'},
    check_completion: false,
    on_finish: function(data){$(document).ready(function () {window.scrollTo(0,0);})}
};

//timeline.push(survey_stai_state);
//timeline.push(survey_stai_trait);
//timeline.push(survey_cesd);
//timeline.push(survey_masq);

/////////////////////////////
var end_consent_html = "<div><p>Thanks! You have completed part 1 of the experiment.</p> "+

  "Here, we would like you to indicate whether you consent to having the information you provided turned into a profile to be shown to other participants in Parts 2 and 3. For this profile, we will use your answers to the questions about your working style, your answer to the free-response question about why you would make a good team member, the grades you shared and your SAT scores. (Note: your name will not be attached to the profile; the free-response answer will not be "+
  "shown in Part 3; we will not use your answers to the final sets of questions about mood and thinking style). If you agree to this information being made into a profile to be shown to other participants in Parts 2 and 3 please click the ‘I agree’ button online. You can choose not to consent to this. If so, we will not be able to include you in Parts 2 and 3, but it will in no way affect your payment/credit for Part 1 or your eligibility for other RPP or RSVP experiments. When you print out the form, please also tick the same boxes for your personal records and sign in the space provided below</p><div>"+

  '<div class="table" style="display: table;">'+
  '<div class="row" style="display: table-row">'+
  '<div class="cell" style="display: table-cell; width:70%"><i>I agree for the answers I provided to the questions about working style, my answer to the '+
  'free-response question about why I would make a good team member, the grades I shared and '+
  'my SAT scores being used to make an un-named profile to be shown to other participants in '+
  'Parts 2 and 3</i></div>'+
  '<div class="cell" style="display: table-cell; width:30%; text-align: right;">I agree <input type="radio" name="group1"><br>I do not agree <input type="radio" name="group1"><br></div>'+
  '</div>'+
  '</div>'+
  '<br>'+
  '<div><p>We would also like to indicate if you would like to participate in parts 2-3. You will either be able to sign up through RPP or we will send you an email. </p></div>'+

  '<div class="table" style="display: table;">'+
  '<div class="row" style="display: table-row">'+
  '<div class="cell" style="display: table-cell; width:70%"><i>I would like to take parts in 2-3. &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp </i></div>'+
  '<div class="cell" style="display: table-cell; width:30%; text-align: right;">I agree <input type="radio" name="group2"><br>I do not agree <input type="radio" name="group2"><br></div>'+
  '</div>'+
  '</div>'+

  "<hr></hr>"+

  '<button style="float: right" id="consent1_continue_button" class="jspsych-btn">Continue</button>'


var debriefing_consent = {
  type: "consent",
  text: end_consent_html,
  buttons_groups_to_check: ['group1','group2'],
  continue_button: 'consent1_continue_button',
  data: {trial_name : 'consent_part1_2'},
  on_finish: function(data){$(document).ready(function () {window.scrollTo(0,0);});}
};

var end_block = {
  type: "text",
  text: "<p>Thanks! You have completed part 2 of the experiment. "
};
timeline.push(end_block);

var venmo_block = {
  type: 'survey-text',
  preamble: "If you are NOT doing this experiment through RPP, please enter your Venmo username to receive payment.",
  questions: [""],
  rows:[1],
  columns: [50],
  maxlength: [50],
  placeholder: ["@Adam-Smith-1"],
  data: {trial_name: 'venmo'},
  reg_ex: '.*',
  check_completion:false,
  on_finish: function(data){
    save_data(jsPsych.data.getData())
    $(document).ready(function () {window.scrollTo(0,0);});}
};

var debriefing = {
    type: "instructions",
    pages: [
      "<p> Thanks. In this session, we've asked you questions about how you feel and think. "+
      "If you think you might be struggling with anxiety and depression, please click 'next' to check out our resource page. "+
      "If the questions have led you to have strong feelings or questions, please feel free to get in touch at affectivecogneurolab10@gmail.com, and we will respond to your email as soon as possible. </p> "+
      "<p>Otherwise, feel free to leave the website now. </p>",
    ],
    show_clickable_nav: true,
    timing_post_trial: 200,
    data: {trial_name : 'debriefing'},
};
timeline.push(debriefing)


var anxiety_info = {
  type: "text",
  cont_key: "999",
  text: "<p>Both depression and anxiety are important concerns in our society, with one in three of us suffering from clinical levels of anxiety or depression in our lifetimes. Beyond that, many of us will struggle with some symptoms of anxiety or depression at one point or another. In case you are currently struggling with feeling down or anxious, we have put together this information sheet to give you some information regarding whom you can contact.</p>"+

"<p><strong>For everyone:</strong></p><p>You are very welcome to contact the study PI Professor Sonia Bishop (sbishop@berkeley.edu) who can provide you with further information beyond that below. We would especially encourage you to do this if you have any concerns that have arisen as a result of taking part in this study. You can also call the Bishop lab on (510) 642-2746.</p>"+

"<p><strong>If you are in crisis </strong> and need immediate support or intervention, call, or go the website of the National Suicide Prevention Lifeline (1-800-273-8255). Trained crisis workers are available to talk 24 hours a day, 7 days a week.</p>"+

"<p><strong>UC Berkeley Students:</strong></p>"+
  "<p>The University Health Services has several services for people seeking help.</p>"+
  "<ul>"+
  "<li> You can visit the website to know more about clinical depression and to identify the signs of it: www.uhs.berkeley.edu/lookforthesigns</li>"+
  "<li> You can also take a confidential screening: If you are unsure whether you are suffering from clinical depression, an anxiety disorder, or other mental health issues or, if you are uncertain whether to seek professional help, consider taking a confidential on-line screening. Visit the University Health Services website (www.uhs.berkeley.edu) and go to Student Services (A to Z). Look under Self-Help: Mental Health Resources.</li>"+
  "<li> You can schedule a free, confidential appointment with a Counseling and Psychological Services (CPS) counselor by calling (510) 642-9494.</li>"+
  "</ul>"+

"<p>CPS location: Tang Center, 3rd floor, room 3300 2222 Bancroft Way, Berkeley, CA 94720</p>"+
"<p><strong>Non-Students:</strong></p><p>The best first course of action is to go to your PCP and say that you have been experiencing some symptoms of anxiety and/or depression recently. They may ask you to fill in some questionnaires similar to ones that we have used here and can also discuss both psychotherapy (e.g. counseling) and medication options with you.</p>"+
"<p> An alternative resource for those who live in the area is the UC Berkeley Psychology Clinic. The clinic contact details are given below: </p>"+

"<p>2205 Tolman Hall</p>"+
"<p>University of California</p>"+
"<p>Berkeley, CA 94720-1650</p>"+
"<p>Telephone: (510) 642-2055 || Fax: (510) 643-1922</p>"+
"<p>Open: Monday – Friday, 9:00 to 5:00</p>"+
"<p><strong>You can close your browser when you are done with this information sheet.</strong></p>"
}
timeline.push(anxiety_info)

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
      success: function(output) {
				//var el = jsPsych.getDisplayElement();
				//el.append('<div><a id="button_return_home" href="/">Return Home</a></div>')
			},
      error: function(output) {
				//var el = jsPsych.getDisplayElement();
				//el.append('<div><a id="button_return_home" href="/">Return Home (Please let your experimenter know that your data did not save properly))</a></div>')
			},
   });
}

jsPsych.pluginAPI.preloadImages(profile_chart_img_paths, function(){
	startExperiment(); });

//// START /////
function startExperiment(){
  jsPsych.init({
    timeline: timeline,
		//show_progress_bar: true,
    fullscreen: false,
    on_finish: function() {
      //save_data(jsPsych.data.getData());
			//location.reload();
    }
  })
};
