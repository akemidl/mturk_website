
var stage1_trials = 5;

function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


/////////////////////////////
var welcome_block = {
  type: "text",
  text: "Welcome back! Press any key to begin."
};

var instructions_block_backstory = {
  type: "instructions",
  pages: ["<p>Recall that you and your classmates are starting an internship program for company ABC.</p> "+
        "<p>In the last session, you saw the information provided by pairs of your classmates (anonymized)"+
        " and you chose people that you wanted to be on your team.</p>",
        "In this session, you will be receiving feedback on how many times your were chosen to be partnered with."+
        " After each piece of feedback, we want you to estimate the probability you are in the top 1/2"+
        "of their classmates in terms of “value added to a team”</p>",
        "To enter your belief, you will use the following slider:"+
        "<img src="+slider_image+" style='max-height: 300px; max-width: 300px;'>"+
        " (0%= means you think there is no chance you were in the top 1/2; 100%=means you are sure)",
        "<strong>Bonus Payments</strong> In addition to your hourly rate, you will receive a bonus payment based on how accurate your estimates are."+
        "The procedure is a bit complicate but is as follows:"+
        "<ul>"+
        "<li>The computer generates a uniform random number, y, from 0-1 </li>"+
        "<li>If y < p: (They’d receive $3 if their score was among the top half of scores)  </li>"+
        "<li>If y > p: (Receive $3 with probability p). </li>"+
        "<li>At the end of the experiment, one of these trials will be chosen randomly and you will either receive a reward or not.</li>"+
        "</ul>"+
        "With this design, choosing the what you believe is most accurate estimate (of the probability you are in the top 1/2) will maximize your chances of earning an extra $3."
        ]

  ,
  show_clickable_nav: true,
    timing_post_trial: 200
};

/*$("#slider").slider({
  value: 50,
  min: 1,
  max: 100,
  step: 1,});
*/

/* create experiment timeline array */
var timeline = [];
//timeline.push(welcome_block);
//timeline.push(instructions_block_backstory);


for (var i = 0; i < stage1_trials; i++) {

  /// Get person's actual feedback (random for now)
  var feedback = getRandomInt(1,2)
  console.log(feedback)
  if (feedback==1){
    feedback_str = 'you'
  }else{
    feedback_str = 'her'
  }

  /// String for telling them about their feedback
  if (i>0){
    var stim1 ='<div><p></p></div>'
    var stim2 ='<div><p>Alex was choosing betweeen you and your classmate, '+
    'Sarah, and chose <strong>'+feedback_str+'</strong>.'+
    'What do you think is the probability that you are in the top 1/2?</p></div>'
  }else{
    var stim1 ='<div><p></p></div>'
    var stim2 ='<div><p>Without knowing how many of your classmates chose you to work with,'+
    'What do you think is the probability that you are in the top 1/2?</p></div>'

  }

  var trial_belief_elicitation = {
    type: 'similarity',
    prompt: "",
    stimuli: [stim1,stim2],
    is_html: true,
    timing_first_stim: 0,
    timing_second_stim: -1,
    timing_image_gap:0,
    labels: [0.0,100.0],
    show_ticks:false,
  };

  timeline.push(trial_belief_elicitation);

}

var instructions_midway = {
  type: "instructions",
  pages: ["<p>Thanks!</p> "+
        "<p>Now we will be having you do the same thing for you classmate Sue</p>",
        "<p>Blah, Blah, Blah. In this session, you will be receiving feedback on how many times your were chosen to be partnered with.",
        ]
  ,
  show_clickable_nav: true,
    timing_post_trial: 200
};

timeline.push(instructions_midway)

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
    }
  })
