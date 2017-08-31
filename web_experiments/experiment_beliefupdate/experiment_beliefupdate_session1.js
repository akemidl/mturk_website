

/////////////////////////////
var welcome_block = {
  type: "text",
  text: "Welcome! Press Enter to get started.",
  timing_post_trial: 200
};

var instructions_block_backstory = {
  type: "instructions",
  pages: ["<p>For this experiment, we want you to imagine that you and your classmates are starting an internship for company ABC. "+
        "You will be forming a teams with your classmates in order to complete a project.</p>"+"<img src="+images[0]+"></img>",
        "<p>The project will be multi-faceted and require a number of different of skills. Your team will need to: </p>"+
        "<ul>"+
        "<li>design a new app (requiring creative skills)</li>"+
        "<li>code the app  (requiring engineering and technical skills) </li>" +
        "<li>analyze the viability of markets for your app (requiring strong research and analytic skills)</li>" +
        "<li>present the app in a formal proposal to a team of executives at ABC (requiring strong communication skills)</li>" +
        "</ul>"+
        "<p>ABC is allowing <strong>you</strong> to form your own teams.</p>",
        "<p>In this first session of the experiment, we are asking you to provide information about yourself.</p>"+
        "<p>In the second session, you will choose who you would want on your team based on your classmate's information (this will shown anonomously). "+
        "You classmates will do the same for you. </p>"+
        "<p>In the third session, you will see how many people chose you to work with. </p>"
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
    preamble: "<p>First, we'd like you to fill out a few questions about how you think and approach problems. Your answers will be presented to your classmates in a table.</p>",
    questions: page_1_questions,
    labels: [scale_1, scale_1], // need one scale for every question on a page
};

//////////////////////////

var self_describe_page = {
  type: 'survey-text',
  preamble: "Next, in 200 words or less, write what would make you a good candidate for your classmates' teams. "+
  "For example, you might include information about extra curriculars or past awards or previous jobs.",
  questions: [""],
  rows:[20],
  columns: [100],
  maxlength: [2000],
  placeholder: ["Example: I majored in Psychology and recently completed a senior thesis. For the past 2 summers, I worked at AIG analyzing the shipping industy."]
};

/////////////////////////////


//////////////////////////


var grade_page = {
  preamble: "<p>Finally, please enter in your 5 grades that you think would be most impressive. Keep in mind that a 'B' in a harder classes might demonstrate more ability than an 'A' in a easy class. In the box provided, enter 'Class Name: Grade' (these will be kept anonymous)</p>",
  type: 'survey-text',
  questions: ["", "","","",""],
  rows: [1,1,1,1,1],
  columns: [70,70,70,70,70],
  maxlength: [100,100,100,100,100],
  placeholder: ['Geophysics: A', "Psych 101: B","","",""]
};

/////////////////////////////


/////////////////////////////
var instructions_block_disposition = {
  type: "instructions",
  pages: ["<p>Thanks!</p><p> The information you've entered will be anonymously shown to your classmates when they are picking their team.</p> " +
      "<p>Before you finish this session, we'd like you to answer a few questions about your personality. The answers to these questions will <strong>not</strong> be shown to your classmates. " +
      "They are for us (the researchers) to look at how different traits affect people's choice for team members. So, please answer as honestly as possible.</p>"],
      show_clickable_nav: true,
    timing_post_trial: 200
};

/////////////////////////////


var page_1_questions = ["I feel pleasant","I felt nervous and restless"];
var scale_1 = ["Almost Never", "Sometimes", "Often", "Almost Always"];


var survey_STAI_Trait = {
    type: 'survey-likert',
    preamble: "<p><strong>Instructions:</strong> A number of statements which people have used to describe themselves are given below."+
          "Read each statement and then mark the appropriate number to the right of the statement to indicate how you <strong> generally feel</strong>. "+
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
    preamble: "<p><strong>Instructions:</strong> On this questionnaire are groups of statements. Please read each group of statements carefully, then pick out the one statement in each group which best describes the way you have been feeling in the past week including today. Click the number beside the statement you have picked. Be sure to read all the statements in each group before making your choice.</p>",
    questions: BDI_questions,
    labels: [BDI_choices1, BDI_choices2], // use repeat function
};

/////////////////////////////


/////////////////////////////
var end_block = {
  type: "text",
  text: "Thanks! Press 'Enter' on your keyboard to be redirected to the home screen."
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
    //fullscreen: true,
    on_finish: function() {
      save_data(jsPsych.data.getData());
      window.location.href = '/';
      //location.reload();
    }
  })

//};
