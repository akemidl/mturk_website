

/////////////////////////////
var welcome_block = {
  type: "text",
  text: "Welcome! Press Enter to get started.",
  timing_post_trial: 200
};

var instructions_block_backstory = {
  type: "instructions",
  pages: ["<p>Imagine that you and your classmates are starting an internship program for company ABC. "+
        "You will be forming a teams with your classmates in order to complete a project.</p>"+"<img src="+images[0]+"></img>",
        "<p>The project will be multifaceted and require a broad range of skills. You will need to: </p>"+
        "<ul>"+
        "<li>analyze market viability (requiring strong research and analytic skills)</li>" +
        "<li>design and code an app to interact with users  (requiring creative and engineering and technical skills) </li>" +
        "<li>present the proposal to a team of executives at ABC (requiring strong communication skills)</li>" +
        "</ul>",
        "<p>Instead of the internship coordinators choosing the teams - they first want to each of you to choose who you'd like to work with."+
        "They will then use an algorithm based on your selections to create the teams. </p>",
        "<p>In this session, you will provide information about what you are good at and how strongly you would be able to contribute (think of this as your digital interview)</p>" +
        "<p>In a second session, you will see the information provided by pairs of your classmates (anonymized) and you will choose people that you'd like to be on your team. Others will do the same for you. </p>"
        ]

  ,
  show_clickable_nav: true,
    timing_post_trial: 200
};

/// "<li>In the third session, you will receive the some of the selections others have provided in their session 2 and you will be asked to estimate how often you think your classmates have chosen you.</li>" +

/////////////////////////////

var page_1_questions = ["I tend to think about the big picture (1) v.s. I tend to pay attention to detail (5)",
"I like to work autonously v.s. I like to work in a group (5)"];

var scale_1 = ["1", "2", "3", "4", "5"];

var aptitude_questions_page = {
    type: 'survey-likert',
    preamble: "<p>First, we'd like you to fill out a few questions about yourself about how you think and approach problems. </p>",
    questions: page_1_questions,
    labels: [scale_1, scale_1], // need one scale for every question on a page
};

//////////////////////////

var self_describe_page = {
  type: 'survey-text',
  preamble: "Now, we'd like you to write about why you would contribute to a team. In 200 words or less, convince your classmate that you should be on their team",
  questions: [""],
  rows:[20],
  columns: [60]
};

/////////////////////////////


//////////////////////////


var grade_page = {
  preamble: "<p>Finally, please enter in your grades on the next screen. (these will be kept anonymous)</p>",
  type: 'survey-text',
  questions: ["Class 1", "Class 2"],
  rows: [2,2],
  columns: [10,10]
};

/////////////////////////////


/////////////////////////////
var instructions_block_disposition = {
  type: "instructions",
  pages: ["<p>Thanks!</p><p> The information previously entered will be given to your classmates in session 2 and they will decide whether to include you on a team.</p> " +
      "<p>Before you leave, we'd like you to answer a few questions about your mood and temperament. The answers to these questions will <strong>not</strong> be shown to your classmates for the purposes of choosing you to work with</p>" +
      "<p>They are for us (the researchers) to look at the influence of trait characteristics on how people change their beliefs. So please answer as honestly as possible here.</p>"],
      show_clickable_nav: true,
    timing_post_trial: 200
};

/////////////////////////////


var page_1_questions = ["I feel pleasant","I felt nervous and restless"];
var scale_1 = ["Almost Never", "Sometimes", "Often", "Almost Always"];


var survey_STAI_Trait = {
    type: 'survey-likert',
    preamble: "<p>A number of statements which people have used to describe themselves are given below."+
          "Read each statement and then mark the appropriate number to the right of the statement to indicate how you <strong> generally feel</strong>"+
          "There are no right or wrong answers. Do not spend too much time on any one statement but give the answer which seems to describe how you generally feel.",
    questions: page_1_questions,
    labels: [scale_1, scale_1], // use repeat function
};

/////////////////////////////
/////////////////////////////

var BDI_questions = ["",""];
var BDI_choices1 = ["0 I do not feel sad", "1 I feel sad", "2 I am sad all the time and cant snap out of it", "3 I am so sad or unhappy that I cant stand it"];
var BDI_choices2 = [" 0 I am not particularly discouraged about the future", "1 I feel discouraged about the future", "2 I feel I have nothing to look forward to", "I feel that the future is hopeless and that things cannot improve"];

var survey_BDI = {
    type: 'survey-likert',
    preamble: "<p>On this questionnaire are groups of statements. Please read each group of statements carefully, then pick out the one statement in each group which best describes the way you have been feeling in the past week including today. Click the number beside the statement you have picked. Be sure to read all the statements in each group before making your choice.</p>",
    questions: BDI_questions,
    labels: [BDI_choices1, BDI_choices2], // use repeat function
};

/////////////////////////////


/////////////////////////////
var end_block = {
  type: "text",
  text: "Thanks! Press Enter to be redirected to the home screen."
};




/* create experiment timeline array */
var timeline = [];
timeline.push(welcome_block);
timeline.push(instructions_block_backstory);
timeline.push(aptitude_questions_page);
timeline.push(self_describe_page);
timeline.push(grade_page);
timeline.push(instructions_block_disposition);
timeline.push(survey_STAI_Trait);
timeline.push(survey_BDI);
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
    fullscreen: true,
    on_finish: function() {
      save_data(jsPsych.data.getData());
    }
  })

//};
