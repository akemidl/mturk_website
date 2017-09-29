
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p>On this questionnaire are groups of statements. Please read each group " +
  "of statements carefully, then pick out the one statement in each group which best " +
  "describes the way you have been feeling <strong>in the past week including today</strong>." +
  "Click the number beside the statement you have picked. Be sure to read all the " +
  " statements in each group before making your choice. </p>"
};

// defining response scale
var choices1 = ["I do not feel sad", "I feel sad", "I am sad all the time and cant snap out of it", "I am so sad or unhappy that I cant stand it"];
var choices2 = ["I am not particularly discouraged about the future", "I feel discouraged about the future", "I feel I have nothing to look forward to", "I feel that the future is hopeless and that things cannot improve"];
var choices3 = ["I do not feel like a failure", "I feel I have failed more than the average person", "As I look back on my life, all I can see is a lot of failures", "I feel I am a complete failure as a person"];
var choices4 = ["I get as much satisfaction out of things as I used to", "I dont enjoy things the way I used to", "I dont get real satisfaction out of anything anymore", "I am dissatisfied or bored with everything"];
var choices5 = ["I dont feel particularly guilty", "I feel guilty a good part of the time", "I feel quite guilty most of the time", "I feel guilty all of the time"];
var choices6 = ["I dont feel I am being punished", "I feel I may be punished", "I expect to be punished", "I feel I am being punished"];
var choices7 = ["I dont feel disappointed in myself", "I am disappointed in myself", "I am disgusted with myself", "I hate myself"];
var choices8 = ["I dont feel I am worse than anybody else", "I am critical of myself for my weaknesses or mistakes", "I blame myself all the time for my faults", "I blame myself for everything bad that happens"];
var choices9 = ["I dont have any thoughts of killing myself", "I have thoughts of killing myself, but I would not carry them out", "I would like to kill myself", "I would kill myself if I had the chance"];
var choices10 = ["I dont cry any more than usual", "I cry more now than I used to", "I cry all the time now", "I used to be able to cry, but now I cant cry even though I want to"];
var choices11 = ["I am no more irritated now than I ever am", "I get annoyed or irritated more easily than I used to", "I feel irritated all the time now", "I dont get irritated at all by the things that used to irritate me"];
var choices12 = ["I have not lost interest in other people", "I am less interested in other people than I used to be", "I have lost most of my interest in other people", "I have lost all of my interest in other people"];
var choices13 = ["I make decisions about as well as I ever could", "I put off making decisions more than I used to", "I have greater difficulty in making decisions than before", "I cant make decisions at all anymore"];
var choices14 = ["I dont feel I look any worse than I used to" , "I am worried that I am looking old and unattractive", "I feel that there are permanent changes in my appearance that make me look unattractive", "I believe that I look ugly"];
var choices15 = ["I can work about as well as before", "It takes an extra effort to get started at doing something", "I have to push myself very hard to do anything", "I cant do any work at all"];
var choices16 = ["I can sleep as well as usual", "I dont sleep as well as I used to", "I wake up 1-2 hours earlier than usual and find it hard to get back to sleep", "I wake up several hours earlier than I used to and cannot get back to sleep"];
var choices17 = ["I dont get more tired than usual", "I get tired more easily than I used to", "I get tired from doing almost anything", "I am tired too tired to do anything"];
var choices18 = ["My appetite is no worse than usual", "My appetite is not as good as it used to be", "My appetite is much worse now", "I have no appetite at all anymore"];
var choices19 = ["I havent lost much weight, if any, or I am purposely trying to lose weight by eating less", "I have lost more than 5 pounds", "I have lost more than 10 pounds", "I have lost more than 15 pounds"];
var choices20 = ["I am no more worried about my health than usual", "I am worried about physical problems such as aches and pains or upset stomach or constipation", "I am very worried about physical problems and it is hard to think about much else", "I am so worried about my physical problems that I cannot think about anything else"];
var choices21 = ["I have not noticed any recent changes in my interest in sex", "I am less interested in sex than I used to be", "I am much less interested in sex now", "I have lost interest in sex completely"];

//questionnaires
var questions = {
    type: 'survey-likert',
    labels: [choices, choices, choices, choices, choices, choices, choices], // need one scale for every question on a page
    timeline:[
      {questions: ["", "", ""]},
    ]
}

//push this back
/* create experiment timeline array */
var timeline = [instructions_block, questions];

/* start the experiment */
jsPsych.init({
  timeline: timeline
});





/* define debrief block
function getSubjectData() {

  var trials = jsPsych.data.getTrialsOfType('single-stim');

  var sum_rt = 0;
  var correct_trial_count = 0;
  var correct_rt_count = 0;
  for (var i = 0; i < trials.length; i++) {
    if (trials[i].correct == true) {
      correct_trial_count++;
      if(trials[i].rt > -1){
        sum_rt += trials[i].rt;
        correct_rt_count++;
      }
    }
  }
  return {
    rt: Math.floor(sum_rt / correct_rt_count),
    accuracy: Math.floor(correct_trial_count / trials.length * 100)
  }
}

var debrief_block = {
  type: "text",
  text: function() {
    var subject_data = getSubjectData();
    return "<p>You responded correctly on "+subject_data.accuracy+"% of "+
    "the trials.</p><p>Your average response time was <strong>" +
    subject_data.rt + "ms</strong>. Press any key to complete the "+
    "experiment. Thank you!</p>";
  }
};

/* create experiment timeline array */
var timeline = [];
timeline.push(welcome_block);
timeline.push(instructions_block);
timeline.push(debrief_block);

function save_data(data){
   var data_table = "my_experiment_table"; // change this for different experiments
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

/* start the experiment */
jsPsych.init({
  timeline: timeline,
  on_finish: function() {
    save_data(jsPsych.data.getData());
    console.log('This task is over! Return to main page');

  }
});
/*
  jsPsych.init({
    timeline: timeline,
    on_finish: function() {
      jsPsych.data.displayData();
    }
  });  */