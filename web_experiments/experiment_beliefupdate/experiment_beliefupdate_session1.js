

/////////////////////////////


var instructions_block_backstory = {
  type: "instructions",
  pages: [
        "<p>Welcome to the experiment! We want you to imagine that you and other UCB students are starting internships for company ABC. "+
        "You will be forming two-person teams in order to complete a project.</p>"+"<img src="+images[0]+"></img>",
        "<p>The project will have several components and require a number of different of skills. You and your partner will need to: </p>"+
        "<ul>"+
        "<li>design a new social media app (requiring social and creative skills)</li>"+
        "<li>code a working prototype of the app (requiring technical skills) </li>" +
        "<li>write a financial plan with projected cash flow, operating expense, income etc. (requiring analytic skills)</li>" +
        "<li>present the app to a group of potential investors (requiring strong communication skills)</li>" +
        "</ul>",
        "<p>In this experiment, you will be selecting who you would like to partner with for this project.</p>"+
        "<p>In this first session of the experiment, we are asking you to provide information about yourself. "+
        "We will use this information to construct a profile for you that will be used in sessions 2 and 3 of the experiment. "+
        "Doing the best job you can at this will increase the likelihood that the feedback we provide you in session 3 will be of value.</p>"+
        "<p>In the second session, we will show you anonymized profiles of other UCB students. These will be presented in pairs. "+
        "For each pair, we will ask you who you would prefer to work with. "+
        "The other participants will do the same for you. "+
        "Please again do the best job of this you can. "+
        "This will increase the value of the feedback we can give to other participants.</p>"+
        "<p>In the third session, you will see some of the profile pairs, as shown to other participants in session 2, in which your profile was included. "+
        "For each one, we will tell you whether or not your profile was the one selected. "+
        "</p>"
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
"<p>I prefer to work:</p>"+
"<p style='text-align:left;'>on my own"+
"<span style='float:right;'>in a group</span></p>",

"<p>When approaching a problem, I tend to focus on:</p>"+
"<p style='text-align:left;'>the details"+
"<span style='float:right;'>the big picture</span></p>",

"<p>When working through a problem, I tend to think:</p>"+
"<p style='text-align:left;'>intuitively"+
"<span style='float:right;'>analytically</span></p>",

"<p>When stuck on a problem, I prefer to seek advice:</p>"+
"<p style='text-align:left;'>immediately"+
"<span style='float:right;'>after I've worked on it for awhile</span></p>",

"<p>When presenting my work, I prefer to present in an order that is:</p>"+
"<p style='text-align:left;'>sequential"+
"<span style='float:right;'>thematic</span></p>",

"<p>When starting a new project, I prefer to plan:</p>"+
"<p style='text-align:left;'>the entire project in one go"+
"<span style='float:right;'>one step at a time</span></p>",
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
    "Your answers will be presented to the other participants when they are choosing who to work with. "+
    "Please answer honestly to ensure you will receive useful feedback. "+
    "Your profile will only ever be shown anonymously.</p>",
    questions: page_1_questions,
    labels: [scale_1, scale_1,scale_1,scale_1,scale_1,
            scale_1, scale_1, scale_1], // need one scale for every question on a page
    data: {trial_name: 'work_style_questions',questions:page_1_questions,tags:tags},
    on_finish: function(data){
              console.log('The trial just ended.');
              console.log(JSON.stringify(data))
              $(document).ready(function () {window.scrollTo(0,0);});
            },
    check_completion: true,
};

//////////////////////////

var self_describe_page = {
  type: 'survey-text',
  preamble: "Using maximum of 500 characters, write what you think would make you a good candidate to work with. "+
  "For example, you might include information about extracurriculars, past awards, or previous jobs." +
  " Please avoid using information in your response that other people could use to identify you so that your profile remains anonymous. ",
  questions: [""],
  rows:[10],
  columns: [50],
  maxlength: [500],
  placeholder: ["Example: I'm a 4th year economics major. "+
  "I'm currently working on my senior thesis, which looks at ways to encourage people to reduce their carbon footprint. "+
  "For the past summer, I worked as a market research analyst."],
  data: {trial_name: 'self_describe_page'},
  reg_ex: '.*',
  check_completion:true,
  on_finish: function(data){
            console.log('The trial just ended.');
            console.log(JSON.stringify(data))
            $(document).ready(function () {window.scrollTo(0,0);});
          }
};

/////////////////////////////


//////////////////////////
var patternSAT = '^[2-8][0-9][0-9][\\s]?$'
var patternGrade = '^[A-Za-z\\s0-9]+:\\s[A-F][+-]?[\\s]?$'

var grade_page = {
  preamble: "<p>Please enter in your SAT scores below. Please also enter 3 genuine grades from your transcript that you think will contribute to making the case that you are a good candidate.</p>",
  type: 'survey-text',
  questions: ["Reading Section (SAT) <span style='font-size:12'>(answer must be from 200-800)</span>",
  "Math Section (SAT) <span style='font-size:12'>(answer must be from 200-800)</span>",
  "Writing Section (SAT) <span style='font-size:12'>(answer must be from 200-800)</span>",
  "Class 1 <span style='font-size:12'>(format answer like: 'Class Name: Grade')</span> ",
  "Class 2 <span style='font-size:12'>(format answer like: 'Class Name: Grade')</span>",
  "Class 3 <span style='font-size:12'>(format answer like: 'Class Name: Grade')</span>"],
  rows: [1,1,1,1,1,1],
  columns: [70,70,70,70,70,70],
  maxlength: [100,100,100,100,100,100],
  placeholder: ['999', "999","999","Econ Theory Micro: G","Econ Theory Macro: G", "Financial Economics: G"],
  reg_ex: [patternSAT,patternSAT,patternSAT,patternGrade,patternGrade,patternGrade],
  data: {trial_name: 'sat_grades_entry'},
  check_completion:true,
  on_finish: function(data){
            console.log('The trial just ended.');
            console.log(JSON.stringify(data))
            $(document).ready(function () {window.scrollTo(0,0);});
          }
};

/////////////////////////////


var instructions_block_disposition = {
  type: "instructions",
  pages: ["<p>Thanks!</p> "+
      "<p>Before you finish this session, we'd like you to answer a few questions about your personality and how you view yourself. The answers to these questions will <strong>not</strong> be shown to the other participants. " +
      "They are for us (the researchers) to look at how different traits affect peoples' choices. So, please answer as honestly as possible.</p>"],
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
    check_completion: false,
    on_finish: function(data){$(document).ready(function () {window.scrollTo(0,0);})}
};

var survey_self_worth = {
    type: 'survey-likert',
    preamble: preamble_self_worth,
    questions: questions_self_worth,
    labels: choices_self_worth,
    data: {trial_name: 'survey_self_worth'},
    check_completion: false,
    on_finish: function(data){$(document).ready(function () {window.scrollTo(0,0);})}
};

var survey_pswq = {
    type: 'survey-likert',
    preamble: preamble_pswq,
    labels: choices_pswq,
    questions: questions_pswq,
    data: {trial_name: 'survey_pswq'},
    check_completion: false,
    on_finish: function(data){$(document).ready(function () {window.scrollTo(0,0);})}
};



/////////////////////////////
var end_block = {
    type: "text",
    text: "<p>Thanks! You have completed this part of the experiment. "+
    "Press 'enter' on your keyboard and wait for a link to appear below. "+
    "This should take a 5-30 seconds. "+
    "Do not close your browser until this process is complete. </p>"+
    ""
    +"<p>(If you are doing this as a demo. Please just close the window <strong>without</strong> pressing 'enter')</p>",
  data: {trial_name: 'text_end_screen'},
  on_finish: function(data){
                console.log('The trial just ended.');
                console.log(JSON.stringify(data))
                $(document).ready(function () {window.scrollTo(0,0);});
    }
};



/* create experiment timeline array */
var timeline = [];
timeline.push(instructions_block_backstory);
timeline.push(aptitude_questions_page);
timeline.push(self_describe_page);
timeline.push(grade_page);
timeline.push(instructions_block_disposition);
timeline.push(survey_DAS_A)
timeline.push(survey_self_worth);
timeline.push(survey_pswq);
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
    fullscreen: false,
    on_finish: function() {
      save_data(jsPsych.data.getData());
    }
  })

//};
