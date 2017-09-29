

/////////////////////////////
var welcome_block = {
  type: "text",
  text: "Welcome back! Press any key to begin."
};

example_stim = html_for_pairwise(pairs[0],profile_chart_img_paths[0],self_describes[0],sat_grades[0],opening_instructions='')


var instructions_block_backstory1 = {
  type: "instructions",
  pages: ["<p>Recall that you and your classmates are starting an internship for company ABC.</p>"+
 				 "<p>In the last session, you wrote a short description of yourself, provided grades and SAT scores, and answered questions about your 'work style'. </p>"+
         "<p>In this session, you and your classmates will use this information to decide on your teams.",
				 "<p>You will be shown 10 pairs of your classmates, and each time you will choose one to include on your team.</p> "+
				 "<p>Only 3 of the classmates you chose will be randomly selected for your team. "+
				 "So, it is important that for each choice, you pick the person that you think will be best regardless of who the other team members might be.</p>",

				 "<p>Here is an example of the type of choice you will make. "+
			 	 "You will be presented with information about two possible team members, as shown below. Each person has been given a randomly generated 8-digit ID number.</p> ",
			 	 "<p>At the top, we have taken the answers to the questions in part I and used them to generate these summary bar plots, which show where each individual is relative to all others on these three traits. "+
			 	 "In the middle, there is the free description that each individual including yourself has provided. "+
			 	 "At the bottom, there are the SAT scores and the 3 grades that the individual has chosen to share.</p>",
			 ]
  ,
	after_button_html:['','',example_stim,example_stim],
  show_clickable_nav: true,
    timing_post_trial: 50,
		allow_keys: false,
};


var instructions_block_backstory2 = {
  type: "instructions",
  pages: ["<p> You may use any or all of this to influence your choice. Do not think about any other choice when making the one at hand."+
				 "You have as long as you need to decide.</p>"+
				 "<p>So here, if you wanted to choose a person on the left you would press the left arrow key. You can switch your choice by press the right arrow key. "+
				 "Press enter to register your choice</p>"
	],
	after_button_html:[example_stim],
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
  pages: ["Click 'Next' to see the first pair of candidates!",
	]
  ,
  show_clickable_nav: true,
    timing_post_trial: 500,
		allow_keys:false,
};


/* create experiment timeline array */
var timeline = [];
timeline.push(welcome_block);
timeline.push(instructions_block_backstory1);
timeline.push(instructions_block_backstory2);
timeline.push(instructions_block_backstory3);
/////////////////////////////

//// Embed this in a loop like Poldrack ////
for (var i = 0; i < num_trials; i++) {

	opening_instructions='<p style="width:100%">Please consider these two candidates and choose one to join your team.		1/10</p> <p>Use the "left arrow" or "right arrow" keys to respond. You have as much time as you need. </p>'
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
var instructions_block_disposition = {
  type: "instructions",
  pages: ["<p>Thanks!</p><p> The information you've entered will be anonymously shown to your classmates when they are picking their team.</p> ",
      "<p>Before you finish this session, we'd like you to answer a few questions about your personality. The answers to these questions will <strong>not</strong> be shown to your classmates. " +
      "They are for us (the researchers) to look at how different traits affect people's choice for team members. So, please answer as honestly as possible.</p>"],
      show_clickable_nav: true,
      timing_post_trial: 200,
      data: {trial_name: 'instruction_traits'},
      on_finish: function(data){
                console.log('The trial just ended.');
                console.log(JSON.stringify(data))
              }
};



////////////

var page_1_questions = [
"I feel pleasant",
"I felt nervous and restless",
"I feel satisfied with myself",
"I wish I could be as happy as others seem to be",
"I feel like a failure",
"I feel rested",
"I am calm, cool, and collected",
"I feel that difficulties are piling up so that I cannot overcome them",
"I worry too much over something that really doesn’t matter",
"I am happy",
"I have disturbing thoughts",
"I lack self-confidence",
"I feel secure",
"I make decisions easily",
"I feel inadequate",
"I am content",
"Some unimportant thought runs through my mind and bothers me",
"I take disappointments so keenly that I can’t put them out of my mind",
"I am a steady person",
"I get in a state of tension or turmoil as I think over my recent concerns and interest"];
var scale_1 = ["Almost Never", "Sometimes", "Often", "Almost Always"];


var survey_STAI_Trait = {
    type: 'survey-likert',
    preamble: "<p><strong>Instructions:</strong> A number of statements which people have used to describe themselves are given below."+
          "Read each statement and then mark the appropriate number to the right of the statement to indicate how you <strong> generally feel</strong>. "+
          "There are no right or wrong answers. Do not spend too much time on any one statement but give the answer which seems to describe how you generally feel.",
    questions: page_1_questions,
    labels: [scale_1, scale_1,scale_1,scale_1,scale_1,
      scale_1, scale_1,scale_1,scale_1,scale_1,
      scale_1, scale_1,scale_1,scale_1,scale_1,
      scale_1, scale_1,scale_1,scale_1,scale_1], // use repeat function
    data: {trial_name: 'survey_STAI_Trait'},//,questions:page_1_questions},
    on_finish: function(data){
              console.log('The trial just ended.');
              console.log(JSON.stringify(data))
							$(document).ready(function () {window.scrollTo(0,0);});
            }
};

///////////////////////////


var BDI_questions = ["","","","","","","","","","",
"","","","","","","","","","",
""];
var BDI_choices1 = ["0 I do not feel sad", "1 I feel sad", "2 I am sad all the time and cant snap out of it", "3 I am so sad or unhappy that I cant stand it"];
var BDI_choices2 = ["0 I am not particularly discouraged about the future", "1 I feel discouraged about the future", "2 I feel I have nothing to look forward to", "I feel that the future is hopeless and that things cannot improve"];
var BDI_choices3 = ["0 I do not feel like a failure","1 I feel I have failed more than the average person","2 As I look back on my life, all I can see is a lot of failures","3 I feel I am a complete failure as a person"];
var BDI_choices4 = [ "0 I get as much satisfaction out of things as I used to","1 I dont enjoy things the way I used to","2 I dont get real satisfaction out of anything anymore","3 I am dissatisfied or bored with everything"];
var BDI_choices5 = ["0 I dont feel particularly guilty","1 I feel guilty a good part of the time","2 I feel quite guilty most of the time","3 I feel guilty all of the time"]
var BDI_choices6 = ["0 I dont feel I am being punished","1 I feel I may be punished", "2 I expect to be punished", "3 I feel I am being punished"]
var BDI_choices7 = ["0 I dont feel disappointed in myself","1 I am disappointed in myself","2 I am disgusted with myself","3 I hate myself"]
var BDI_choices8 = ["0 I dont feel I am worse than anybody else","1 I am critical of myself for my weaknesses or mistakes","2 I blame myself all the time for my faults","3 I blame myself for everything bad that happens"]
var BDI_choices9 = ["0 I dont have any thoughts of killing myself","1 I have thoughts of killing myself, but I would not carry them out","2 I would like to kill myself","3 I would kill myself if I had the chance"]
var BDI_choices10= ["0 I dont cry any more than usual", "1 I cry more now than I used to","2 I cry all the time now", "3 I used to be able to cry, but now I cant cry even though I want to"]
var BDI_choices11= ["0 I am no more irritated now than I ever am","1 I get annoyed or irritated more easily than I used to","2 I feel irritated all the time now","3 I dont get irritated at all by the things that used to irritate me"]
var BDI_choices12= ["0 I have not lost interest in other people","1 I am less interested in other people than I used to be","2 I have lost most of my interest in other people","3 I have lost all of my interest in other people"]
var BDI_choices13= ["0 I make decisions about as well as I ever could","1 I put off making decisions more than I used to","2 I have greater difficulty in making decisions than before","3 I cant make decisions at all anymore"]
var BDI_choices14= ["0 I dont feel I look any worse than I used to","1 I am worried that I am looking old and unattractive","2 I feel that there are permanent changes in my appearance that make me look unattractive","3 I believe that I look ugly"]
var BDI_choices15= ["0 I can work about as well as before","1 It takes an extra effort to get started at doing something","2 I have to push myself very hard to do anything","3 I cant do any work at all"]
var BDI_choices16= ["0 I can sleep as well as usual", "1 I dont sleep as well as I used to","2 I wake up 1-2 hours earlier than usual and find it hard to get back to sleep","3 I wake up several hours earlier than I used to and cannot get back to sleep"]
var BDI_choices17= [" 0 I dont get more tired than usual","1 I get tired more easily than I used to","2 I get tired from doing almost anything","3 I am tired too tired to do anything"]
var BDI_choices18= ["0 My appetite is no worse than usual","1 My appetite is not as good as it used to be","2 My appetite is much worse now","3 I have no appetite at all anymore"]
var BDI_choices19= ["0 I havent lost much weight, if any, or I am purposely trying to lose weight by eating less.","1 I have lost more than 5 pounds","2 I have lost more than 10 pounds","3 I have lost more than 15 pounds"]
var BDI_choices20= ["0 I am no more worried about my health than usual","1 I am worried about physical problems such as aches and pains or upset stomach or constipation","2 I am very worried about physical problems and it is hard to think about much else","3 I am so worried about my physical problems that I cannot think about anything else"]
var BDI_choices21=["0 I have not noticed any recent changes in my interest in sex","1 I am less interested in sex than I used to be","2 I am much less interested in sex now","3 I have lost interest in sex completely"]

var labels = [BDI_choices1, BDI_choices2,BDI_choices3,BDI_choices4,BDI_choices5,
  BDI_choices6, BDI_choices7,BDI_choices8,BDI_choices9,BDI_choices10,
  BDI_choices11, BDI_choices12,BDI_choices13,BDI_choices14,BDI_choices15,
  BDI_choices16, BDI_choices17,BDI_choices18,BDI_choices19,BDI_choices20,BDI_choices21]

var survey_BDI = {
    type: 'survey-likert',
    preamble: "<p><strong>Instructions:</strong> On this questionnaire are groups of statements. Please read each group of statements carefully, then pick out the one statement in each group which best describes the way you have been feeling in the past week including today. Click the number beside the statement you have picked. Be sure to read all the statements in each group before making your choice.</p>",
    questions: BDI_questions,
    labels: labels, // use repeat function
    data: {trial_name: 'survey_BDI'},//,labels:labels},
    on_finish: function(data){
                console.log('The trial just ended.');
                //console.log(JSON.stringify(data))
								$(document).ready(function () {window.scrollTo(0,0);});
      }

};

timeline.push(instructions_block_disposition);
timeline.push(survey_STAI_Trait);
timeline.push(survey_BDI);


/////////////////////////////
var end_block = {
  type: "text",
  text: "<p>Thanks! You have completed this part of the experiment. "+
  "Press 'Enter' on your keyboard and wait for a link to appear below. "+
  "This should take a 5-30 seconds. "+
  "Do not close your browser until this process is complete. </p>"+
  ""
  +"<p>(If you are doing this as a demo. Please just close the window <strong>without</strong> pressing Enter)</p>"
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
    //fullscreen: true,
    on_finish: function() {
      save_data(jsPsych.data.getData());
			//location.reload();
    }
  })
};
