

/////////////////////////////
var intro_block = {
  type: "instructions",
  pages: ["Thank you for your interest in taking part in our experiment! "+
  "On the next page, see will see our consent form, which provides details about the study procedures. "+
  "In order to participate, you will need to click a button at the bottom of the page indicating "+
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
  text: consent_part1_html,
  continue_button: 'consent1_continue_button',
  buttons_groups_to_check: ['group1','group2','group3'],
  data: {trial_name : 'consent_part1_1'},
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



var instructions_block_backstory = {
  type: "instructions",
  pages: [
        "<p>Now on to the experiment! We want you to imagine that you and other UCB students are starting internships for company ABC. "+
        "You will be forming two-person teams in order to complete a project.</p>"+"<img src="+images[0]+"></img>",
        "<p>The project will have several components and require a number of different of skills. You and your partner will need to: </p>"+
        "<ul>"+
        "<li>design a new social media app (requiring social and creative skills)</li>"+
        "<li>code a working prototype of the app (requiring technical skills) </li>" +
        "<li>write a financial plan with projected cash flow, operating expense, income etc. (requiring analytic skills)</li>" +
        "<li>present the app to a group of potential investors (requiring strong communication skills)</li>" +
        "</ul>"+
        "<p>In this experiment, both you and the other participants will be picking people to partner with for this project. We will ask you to provide information to help with this.</p>",
        "<p>In the first session of the experiment, we will ask you about your working style, and to provide other information (a short description of what you could bring to the internship, course grades and SAT scores) that we will make into a profile to be shown to other participants in Parts 2 and 3. "+
        "Doing the best job you can at this will increase the likelihood that the feedback we provide you in session 3 will be of value.</p>",
        "<p>In the second session, we will show you anonymized profiles of other UCB students. These will be presented in pairs. "+
        "For each pair, we will ask you who you would prefer to work with. "+
        "The other participants will do the same for you. "+
        "Please again do the best job of this you can. "+
        "This will increase the value of the feedback we can give to other participants.</p>",
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

var aptitude_questions_intrs = {
    type: "instructions",
    pages: [
      "<p>First, we'd like you to fill out a few questions about your 'work style'. "+
            "Your answers will be presented to the other participants when they are choosing who to work with. "+
            "Please answer honestly to ensure you will receive useful feedback. "+
            "Your profile will only ever be shown anonymously. Click 'next' to see the questions.</p>"
        ],
    show_clickable_nav: true,
      timing_post_trial: 200,
      data: {trial_name : 'instructions_aptitude'},
      on_finish: function(data){
        console.log('The trial just ended.');
        console.log(JSON.stringify(data))
        $(document).ready(function () {window.scrollTo(0,0);});
      }
};

var aptitude_questions_page = {
    type: 'survey-likert',
    preamble: "",
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
  preamble: "Next, using maximum of 500 characters, write what you think would make you a good candidate to work with. "+
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
var patternGrade = '^[A-Za-z\\s0-9]+:\\s?[A-Fa-f][+-]?[\\s]?$'

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


var survey_DAS_A_instr = {
    type: "instructions",
    pages: [preamble_DAS_A_nextpage],
    show_clickable_nav: true,
    timing_post_trial: 200,
    data: {trial_name : 'survey_DAS_A_instr'},
};


var survey_DAS_A = {
    type: 'survey-likert',
    preamble: '',
    questions: questions_DAS_A,
    labels: choices_DAS_A,
    data: {trial_name: 'survey_DAS_A'},
    check_completion: false,
    on_finish: function(data){$(document).ready(function () {window.scrollTo(0,0);})}
};

var survey_self_worth_instr = {
    type: "instructions",
    pages: [preamble_self_worth_custom1],
    show_clickable_nav: true,
    timing_post_trial: 200,
    data: {trial_name : 'survey_DAS_A_instr'},
};

var survey_self_worth = {
    type: 'survey-likert',
    preamble: '',
    questions: questions_self_worth,
    labels: choices_self_worth,
    data: {trial_name: 'survey_self_worth'},
    check_completion: false,
    on_finish: function(data){$(document).ready(function () {window.scrollTo(0,0);})}
};

var survey_pswq_instr = {
    type: "instructions",
    pages: [preamble_pswq_custom1],
    show_clickable_nav: true,
    timing_post_trial: 200,
    data: {trial_name : 'survey_DAS_A_instr'},
};
var survey_pswq = {
    type: 'survey-likert',
    preamble: '',
    labels: choices_pswq,
    questions: questions_pswq,
    data: {trial_name: 'survey_pswq'},
    check_completion: false,
    on_finish: function(data){$(document).ready(function () {window.scrollTo(0,0);})}
};

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



/* create experiment timeline array */
var timeline = [];
timeline.push(intro_block)
timeline.push(consent_block)
timeline.push(if_consent)
timeline.push(instructions_block_backstory);
//timeline.push(aptitude_questions_intrs);
//timeline.push(aptitude_questions_page);
//timeline.push(self_describe_page);
//timeline.push(grade_page);
//timeline.push(instructions_block_disposition);
//timeline.push(survey_DAS_A_instr);
//timeline.push(survey_DAS_A);
//timeline.push(survey_self_worth_instr);
//timeline.push(survey_self_worth);
//timeline.push(survey_pswq_instr);
//timeline.push(survey_pswq);
timeline.push(debriefing_consent)
timeline.push(venmo_block)
timeline.push(debriefing)
timeline.push(anxiety_info)


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
        console.log('success')
        //var el = jsPsych.getDisplayElement();
				//el.append('<div><a id="button_return_home" href="/">Return Home</a></div>')

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
      //save_data(jsPsych.data.getData());
    }
  })

//};
