

/////////////////////////////
var welcome_block = {
  type: "text",
  text: "Welcome! Press Enter to get started.",
  timing_post_trial: 200,
  data: {trial_name: 'text_welcome'},
  on_finish: function(data){
            console.log('The trial just ended.');
            console.log(JSON.stringify(data))
          }
};

var instructions_block_backstory = {
  type: "instructions",
  pages: ["<p>For this experiment, we want you to imagine that you and your classmates are starting an internship for company ABC. "+
        "You will be forming a teams with your classmates in order to complete a project.</p>"+"<img src="+images[0]+"></img>",
        "<p>The project will have several components and require a number of different of skills. Your team will need to: </p>"+
        "<ul>"+
        "<li>design a new social media app (requiring social and creative skills)</li>"+
        "<li>code a working prototype of the app (requiring technical skills) </li>" +
        "<li>write a financial plan with projected cash flow, operating expense, income etc. (requiring analytic skills)</li>" +
        "<li>present the app to a group of potential investors (requiring strong communication skills)</li>" +
        "</ul>"+
        "<p>For this project, you will be selecting your own own teams.</p>",
        "<p>In this first session of the experiment, we are asking you to provide information about yourself.</p>"+
        "<p>In the second session, you will choose who you would want on your team based on your classmate's information (this will shown anonomously). "+
        "You classmates will do the same for you. </p>"+
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
"I prefer to work on my own (1) or I prefer to work in a group (4)",
"I prefer to seek advice quickly to keep things moving (1) or I prefer to work through a problem even if it takes time (4)",
"I tend to focus on details to make sure there are no mistakes (1) or I tend to focus on the big picture (4)",
"I tend to think intuitively and through flashes of insight (1) or I tend to think sequentially and logically",
"I tend to present material in a logical order (1) or I tend to present material as a story (4)",
"I prefer to plan out projects thoroughly ahead of time (1) or I prefer to take things one step at a time (4)"
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
    check_completion: true,
};

//////////////////////////

var self_describe_page = {
  type: 'survey-text',
  preamble: "Next, in 500 characters or less, write what would make you a good candidate for your classmates' teams. "+
  "For example, you might include information about extra curriculars or past awards or previous jobs.",
  questions: [""],
  rows:[20],
  columns: [100],
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
  preamble: "<p>Finally, please enter in your SAT scores and 3 grades that you think would make you the best candidate. Keep in mind that a 'B' in a harder classes might demonstrate more ability than an 'A' in a easy class. In the box provided, enter 'Class Name: Grade' (these will be kept anonymous)</p>",
  type: 'survey-text',
  questions: ["Reading Section (SAT)","Math Section (SAT)","Writing Section (SAT)","Class 1","Class 2","Class 3"],
  rows: [1,1,1,1,1,1],
  columns: [70,70,70,70,70,70],
  maxlength: [100,100,100,100,100,100],
  placeholder: ['600', "600","600","Econ Theory Micro: A-","Econ Theory Macro: A-", "Financial Economics: B+"],
  data: {trial_name: 'sat_grades_entry'},
  on_finish: function(data){
            console.log('The trial just ended.');
            console.log(JSON.stringify(data))
            $(document).ready(function () {window.scrollTo(0,0);});
          }
};

/////////////////////////////



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
timeline.push(instructions_block_backstory);
timeline.push(aptitude_questions_page);
timeline.push(self_describe_page);
timeline.push(grade_page);
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
