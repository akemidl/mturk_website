
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
  pages: [
        "<p>Recall that in the last session, you were shown pairs of your classmates and you had to choose one person from each pair to include on your team.</p>"+
        "<p>Your classmates were asked to do the same thing. </p>",
        "<p>In this session, you will be receiving feedback on how many times your were chosen to join a team. "+
        "We will give you feedback one person at a time. For example, you might receive:"+
        " <blockquote> 'Anna compared you and Jeff. She chose to work with Jeff'.</blockquote>"+
        "After each piece of feedback, we want you to estimate the probability that you were chosen more often than 1/2 of your classmates.</p>"+
        "<p>To enter your belief, you will use a slider that looks like this:</p>"+
        "<img src="+slider_image+" style='max-height: 300px; max-width: 500px;'>"+
        "<p>10%= means you believe there is a very low chance you were chosen more often than 1/2 of your classmates. </p>"+
        "<p>90%=means you are almost sure that are chosen more often than 1/2 of your classmates)</p>",
        "<strong>Bonus Payments</strong> In addition to your hourly rate, you will receive a bonus payment based on how accurate your estimates are."+
        "The procedure for determining your bonus is a bit complicated: "+
        "<ul>"+
        "<li>The computer generates a uniform random number, y, from 0-1 </li>"+
        "<li>If y < p: (You receive $3 if you were chosen more often than 1/2 of your classmates)  </li>"+
        "<li>If y > p: (You receive $3 with probability p). </li>"+
        "<li>At the end of the experiment, one of these trials will be chosen randomly and you will either receive a reward or not.</li>"+
        "</ul>"+
        "With this design, choosing the what you believe is most accurate estimate (of the probability you are in the top 1/2) will maximize your chances of earning an extra $3.",
         "Click 'Next' to get started."
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
timeline.push(welcome_block);
timeline.push(instructions_block_backstory);


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

    var stim1 ='<div><p>Alex was choosing betweeen you and your classmate, '+
    'Sarah, and chose <strong>'+feedback_str+'</strong>.'
    var stim2 ='<div><p>What do you think is the probability that you are in the top 1/2?</p></div>'
    var timing_first_stim=2000;
  }else{
    var stim1 ='<div><p></p></div>'
    var stim2 ='<div><p>Without knowing how many of your classmates chose you to work with,'+
    ' what do you think is the probability that you are in the top 1/2?</p></div>'
    var timing_first_stim = 200;
  }

  var trial_belief_elicitation = {
    type: 'similarity',
    prompt: "",
    stimuli: [stim1,stim2],
    is_html: true,
    timing_first_stim: timing_first_stim,
    timing_second_stim: -1,
    timing_image_gap:0,
    labels: [0.0,100.0],
    show_ticks:false,
    on_trial_start: function() {
        var lastTrialData = jsPsych.data.getLastTrialData()
        var currentTrial = jsPsych.currentTrial()
        currentTrial.start_value=lastTrialData['sim_score']

      //console.log('A trial just started.');
      console.log(lastTrialData)
      //console.log('previous score')
      //var el = jsPsych.getDisplayElement();
      //console.log(el)

    }
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
  text: "<div><p>Thanks. Press 'Enter' on your keyboard to be redirected to the home screen.</p></div>"
};

// this works but it then doesn't save the data
// <a id='button_return_home' href='/' class='btn btn-primary'>Home</a> //

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
			window.location.href = '/';

    }
  })
