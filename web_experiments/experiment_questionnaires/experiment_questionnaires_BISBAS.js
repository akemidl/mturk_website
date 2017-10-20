
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p> Each item of this questionnaire is a statement that a person may either agree or disagree with." +
  " For each item, indicate how much you agree or disagree with what the item says."+
  " Please respond to all the items and"+
  " be as accurate and honest as you can be. Respond to each item as if it were the only item,"+
  " that is, don't worry about being 'consistent' in your responses. Press enter to start. </p>"
};

// defining response scale
var choices = ["Very true for me", "Somewhat true for me", "Somewhat false for me", "Very false for me"];

//questionnaires
var questions = {
    type: 'survey-likert',
    check_completion: true,
    labels: [choices, choices, choices, choices, choices, choices], // need one scale for every question on a page
    timeline:[
      {questions: ["A person's family is the most important thing in life", "Even if something bad is about to happen to me, I rarely experience fear or nervousness", "I go out of my way to get things I want", "When I'm doing well at something, I love to keep at it", "I'm always willing to try something new if I think it will be fun", "How I dress is important to me"]},
      {questions: ["When I get something I want, I feel excited and energized", "Criticism or scolding hurts me quite a bit", "When I want something I usually go all out to get it", "I will often do things for no other reason than that they might be fun", "It's hard for me to find the time to do things, such as getting a haircut", "If I see a chance to get something I want, I move in on it right away"]},
      {questions: ["I feel pretty worried or upset when I think or know somebody is angry at me", "When I see an opportunity for something I like, I get excited right away", "I often act on the spur of the movement", "If I think something unpleasant is going to happen, I usually get pretty 'worked up'", "I often wonder why people act the way they do", "When good things happen to me, it affects me strongly"]},
      {questions: ["I feel worried when I think I have done poorly at something important", "I crave excitement and new sensations", "When I go after something, I use a 'no holds barred' approach", "I have very few fears compared to my friends", "It would excite me to win a contest", "I worry about making mistakes"]},
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
jsPsych.data.addProperties({questionnaire: "BISBAS"})

/* create experiment timeline array */
var timeline = [instructions_block, questions, exit_block];

/* start the experiment */
jsPsych.init({
  timeline: timeline
});
