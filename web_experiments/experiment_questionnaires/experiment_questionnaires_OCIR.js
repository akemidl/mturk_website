
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p> The following statements refer to experiences that many people have in their everyday lives."+
  " Tick the answer that best describes <strong> HOW MUCH </strong> that experience has <strong>DISTRESSED or BOTHERED you during the PAST MONTH.</strong> Press enter to start.</p>"
};

// defining response scale
var choices = ["Not at all", "A little", "Moderately", "A lot", "Extremely"];

//questionnaires
var questions = {
    type: 'survey-likert',
    check_completion: true,
    labels: [choices, choices, choices, choices, choices, choices], // need one scale for every question on a page
    timeline:[
      {questions: ["I have saved up so many things that they get in the way", "I check things more often than necessary", "I get upset if objects are not arranged properly", "I feel compelled to count while Iam doing things", "I find it difficult to touch an object when I know it has been touched by strangers or certain people", "I find it difficult to control my own thoughts"]},
      {questions: ["I collect things I don't need", "I repeatedly check doors, windows, drawers, etc.", "I get upset when others change the way I have arranged things", "I feel I have to repeat certain numbers", "I sometimes have to wash or clean myself simply because I feel contaminated", "I am upset by unpleasant thoughts that come into my mind against my will"]},
      {questions: ["I avoid throwing things away because I am afraid I might need them later", "I repeatedly check gas and water taps and light switches after turning them off", "I need things to be arranged in a particular order", "I feel that there are good and bad numbers", "I wash my hands more often and longer than necessary", "I frequently get nasty thoughts and have difficulty in getting rid of them"]},
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
jsPsych.data.addProperties({questionnaire: "OCIR"})

//push this back
/* create experiment timeline array */
var timeline = [instructions_block, questions, exit_block];

/* start the experiment */
jsPsych.init({
  timeline: timeline
});
