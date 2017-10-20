
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p> Next is a list of some of the ways you may have felt or behaved. " +
  "Please indicate how often you have felt this way <strong> during the past week </strong>. Press enter to start. </p>"
};

// defining response scale
var choices = ["Rarely or none of the time (less than one day)", "Some or a little of the time<br>(1-2 days)", "Occasionally or a moderate amount of time <br>(3-4 days)", "All of the time <br>(5-7 days)"];

//questionnaires
var questions = {
    type: 'survey-likert',
    //check_completion: true,
    labels: [choices, choices, choices, choices], // need one scale for every question on a page
    timeline:[
      {questions: ["I was bothered by things that usually don’t bother me", "I did not feel like eating; my appetite was poor", "I felt that I could not shake off the blues even with help from my family", "I felt that I was just as good as other people"]},
      {questions: ["I had trouble keeping my mind on what I was doing", "I felt depressed", "I felt that everything I did was an effort", "I felt hopeful about the future"]},
      {questions: ["I thought my life had been a failure", "I felt fearful", "My sleep was restless", "I was happy"]},
      {questions: ["I talked less than usual", "I felt lonely", "People were unfriendly", "I enjoyed life"]},
      {questions: ["I had crying spells", "I felt sad", "I felt that people disliked me", "I could not 'get going'"]},
    ],
    on_finish: function(data) {
      $(document).ready(function() {window.scrollTo(0,0);});
      return
    },
}

/* define exit block */
var exit_block = {
 type: "text",
 text: "<p> You have finished. Thank you! </p>"
};

//add questionnaire to data
jsPsych.data.addProperties({questionnaire: "CESD"})

/* create experiment timeline array */
var timeline = [instructions_block, questions, exit_block];

/* start the experiment */
jsPsych.init({
  timeline: timeline
});
