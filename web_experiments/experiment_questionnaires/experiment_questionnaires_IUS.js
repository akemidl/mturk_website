
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p> You will find a series of statements which describe how people may react to the uncertainties of life."+
  " Please use the scale below each statement to describe <strong>to what extent each item is characteristic of you</strong>. Press enter to start.</p>"
};

// defining response scale
var choices = ["Not at all <br> characteristic <br> of me", "A little <br>characteristic <br>of me", "Somewhat <br>characteristic <br>of me", "Mostly <br>characteristic <br>of me", "Entirely <br>characteristic<br> of me"];

//questionnaires
var questions = {
    type: 'survey-likert',
    check_completion: true,
    labels: [choices, choices, choices, choices, choices, choices, choices], // need one scale for every question on a page
    timeline:[
      {questions: ["Uncertainty stops me from having a firm opinion",
      "Being uncertain means that a person is disorganized",
      "Uncertainty makes life intolerable",
      "It's unfair not having any guarantees in life",
      "My mind can't be relaxed if I don't know what will happen tomorrow",
      "Uncertainty makes me uneasy, anxious, or stressed",
      "Unforeseen events upset me greatly"]},
      {questions: ["It frustrates me not having all the information I need",
      "Uncertainty keeps me from living a full life",
      "One should always look ahead so as to avoid surprises",
      "A small unforeseen event can spoil everything, even with the best of planning",
      "When it's time to act, uncertainty paralyses me",
      "Being uncertain means that I am not first rate",
      "When I am uncertain, I can't go forward"]},
      {questions: ["When I am uncertain, I can't function very well",
      "Unlike me, others always seem to know where they are going with their lives",
      "Uncertainty makes me vulnerable, unhappy, or sad",
      "I always want to know what the future has in store for me",
      "I can't stand being taken by surprise",
      "The smallest doubt can stop me from acting",
      "I should be able to organize everything in advance"]},
      {questions: ["Being uncertain means that I lack confidence",
      "I think it's unfair that other people seem sure about their future",
      "Uncertainty keeps me from sleeping soundly",
      "I must get away from all uncertain situations",
      "The ambiguities in life stress me",
      "I can't stand being undecided about my future"]},
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
jsPsych.data.addProperties({questionnaire: "IUS"})

//push this back
/* create experiment timeline array */
var timeline = [instructions_block, questions, exit_block];

/* start the experiment */
jsPsych.init({
  timeline: timeline
});
