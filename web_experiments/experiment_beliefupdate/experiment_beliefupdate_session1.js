

/////////////////////////////
var welcome_block = {
  type: "text",
  text: "Welcome to the experiment! Press any key to get started.",
  timing_post_trial: 200,
  data: {trial_name: 'text_welcome'},
  on_finish: function(data){
            console.log('The trial just ended.');
            console.log(JSON.stringify(data))
          }
};

var instructions_block_backstory = {
  type: "instructions",
  pages: ["<p>For this experiment, we want you to imagine that you and your classmates are starting internships for company ABC. "+
        "You will be forming a teams with your classmates in order to complete a project.</p>"+"<img src="+images[0]+"></img>",
        "<p>The project will have several components and require a number of different of skills. Your team will need to: </p>"+
        "<ul>"+
        "<li>design a new social media app (requiring social and creative skills)</li>"+
        "<li>code a working prototype of the app (requiring technical skills) </li>" +
        "<li>write a financial plan with projected cash flow, operating expense, income etc. (requiring analytic skills)</li>" +
        "<li>present the app to a group of potential investors (requiring strong communication skills)</li>" +
        "</ul>"+
        "<p>For this project, you will be selecting who you would like to work with as a partner.</p>",
        "<p>In this first session of the experiment, we are asking you to provide information about yourself.</p>"+
        "<p>In the second session, you will choose who you would prefer as a partner based on your classmates' information (this will be shown anonomously). "+
        "Your classmates will do the same for you. </p>"+
        "<p>In the third session, you will see how many people chose you to work with. </p>"
      ],
  show_clickable_nav: true,
    timing_post_trial: 200,
    data: {trial_name : 'instructions_backstory'},
    on_finish: function(data){
      console.log('The trial just ended.');
      console.log(JSON.stringify(data))
      $(document).ready(function () {window.scrollTo(0,0);});
    }
};

/// "<li>In the third session, you will receive the some of the selections others have provided in their session 2 and you will be asked to estimate how often you think your classmates have chosen you.</li>" +

/////////////////////////////



// "I prefer to set my own deadlines (1) or I prefer that my superviser or teacher sets clear deadlines (4)",


var page_1_questions = [
"<p>Being part of a team, I prefer to work:</p>"+
"<p style='text-align:left;'>on my own"+
"<span style='float:right;'>in a group</span></p>",

"<p>When approaching a problem, I tend to focus on:</p>"+
"<p style='text-align:left;'>the details"+
"<span style='float:right;'>the big picture</span></p>",

"<p>When working through a problem, I tend to think:</p>"+
"<p style='text-align:left;'>think intuitively"+
"<span style='float:right;'>think sequentially</span></p>",

"<p>When stuck on a problem, I prefer to:</p>"+
"<p style='text-align:left;'>seek advice immediately"+
"<span style='float:right;'>try to work it out by myself</span></p>",

"<p>When presenting my work, I prefer to present:</p>"+
"<p style='text-align:left;'>in a logical order"+
"<span style='float:right;'>as a story</span></p>",

"<p>When starting a new project, I prefer to:</p>"+
"<p style='text-align:left;'>plan it out"+
"<span style='float:right;'>start working</span></p>",
];

// more or less independent
tags = ['independent worker; group worker',
'advice seeker; problem solver',
'detailed thinker; big picture thinker',
'intuitive thinker; analytic thinker',
'logical presenter; entertaining presenter',
'strategic; adaptive']

var scale_1 = ["1", "2", "3", "4"];

var aptitude_questions_page = {
    type: 'survey-likert',
    preamble: "<p>First, we'd like you to fill out a few questions about your 'work style'. "+
    "Your answers will be presented to your classmates when they are choosing who to work with. "+
    "Please answer honestly to ensure you will receive useful feedback. "+
    "Your profile will only ever be shown anonomously.</p>",
    questions: page_1_questions,
    labels: [scale_1, scale_1,scale_1,scale_1,scale_1,
            scale_1, scale_1, scale_1], // need one scale for every question on a page
    data: {trial_name: 'work_style_questions',questions:page_1_questions,tags:tags},
    on_finish: function(data){
              console.log('The trial just ended.');
              console.log(JSON.stringify(data))
              $(document).ready(function () {window.scrollTo(0,0);});
            },
    check_completion: false,
};

//////////////////////////

var self_describe_page = {
  type: 'survey-text',
  preamble: "Using a minumum of 100, but a maximum of 500 characters, write what would make you a good candidate for your classmates' teams. "+
  "For example, you might include information about extra curriculars or past awards or previous jobs." +
  " Please avoid using information in your response that other people could use to identify you. When other participants view your response, we'd like it to be anonymous.",
  questions: [""],
  rows:[10],
  columns: [50],
  maxlength: [500],
  placeholder: ["Example: I'm a 4th year economics major. "+
  "I'm currently working on my senior thesis, which looks at ways to encourage people to reduce their carbon footprint. "+
  "For the past summer, I worked as a market research analyst."],
  data: {trial_name: 'self_describe_page'},
  on_finish: function(data){
            console.log('The trial just ended.');
            console.log(JSON.stringify(data))
            $(document).ready(function () {window.scrollTo(0,0);});
          }
};

/////////////////////////////


//////////////////////////


var grade_page = {
  preamble: "<p>Please enter in your SAT scores below. Please also enter 3 genuine grades from your transcript that you think will contribute to making the case that you are a good candidate. In the box provided, enter 'Class Name: Grade'</p>",
  type: 'survey-text',
  questions: ["Reading Section (SAT)","Math Section (SAT)","Writing Section (SAT)","Class 1","Class 2","Class 3"],
  rows: [1,1,1,1,1,1],
  columns: [70,70,70,70,70,70],
  maxlength: [100,100,100,100,100,100],
  placeholder: ['999', "999","999","Econ Theory Micro: G","Econ Theory Macro: G", "Financial Economics: G"],
  data: {trial_name: 'sat_grades_entry'},
  on_finish: function(data){
            console.log('The trial just ended.');
            console.log(JSON.stringify(data))
            $(document).ready(function () {window.scrollTo(0,0);});
          }
};

/////////////////////////////
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


var survey_DAS_A = {
    type: 'survey-likert',
    preamble: preamble_DAS_A,
    questions: questions_DAS_A,
    labels: choices_DAS_A,
    data: {trial_name: 'survey_DAS_A'},
};

var survey_self_worth = {
    type: 'survey-likert',
    preamble: preamble_self_worth,
    questions: questions_self_worth,
    labels: choices_self_worth,
    data: {trial_name: 'survey_self_worth'},
};

var survey_world_assumptions = {
    type: 'survey-likert',
    preamble: preamble_world_assumptions,
    questions: questions_world_assumptions,
    labels: choices_world_assumptions,
    data: {trial_name: 'survey_world_assumptions'},
};


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




/////////////////////////////
var end_block = {
    type: "text",
    text: "<p>Thanks! You have completed this part of the experiment. "+
    "Press 'Enter' on your keyboard and wait for a link to appear below. "+
    "This should take a 5-30 seconds. "+
    "Do not close your browser until this process is complete. </p>"+
    ""
    +"<p>(If you are doing this as a demo. Please just close the window <strong>without</strong> pressing Enter)</p>",
  data: {trial_name: 'text_end_screen'},
  on_finish: function(data){
                console.log('The trial just ended.');
                console.log(JSON.stringify(data))
                $(document).ready(function () {window.scrollTo(0,0);});
    }
};



/* create experiment timeline array */
var timeline = [];
timeline.push(welcome_block);
//timeline.push(instructions_block_backstory);
//timeline.push(aptitude_questions_page);
//timeline.push(self_describe_page);
//timeline.push(grade_page);
//timeline.push(instructions_block_disposition);
timeline.push(survey_DAS_A)
timeline.push(survey_self_worth);
timeline.push(survey_world_assumptions);
timeline.push(end_block)



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
        var el = jsPsych.getDisplayElement();
				el.append('<div><a id="button_return_home" href="/">Return Home</a></div>')

      } // write the result to javascript console
   });
}


/*jsPsych.preloadImages(images, function(){ startExperiment(); });

//// START /////
function startExperiment(){*/
  jsPsych.init({
    timeline: timeline,
    //fullscreen: true,
    on_finish: function() {
      save_data(jsPsych.data.getData());
    }
  })

//};
