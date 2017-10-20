
 /* define instructions block */
var instructions_block = {
  type: "text",
  text: "<p> Please answer each question by ticking the YES or the NO button following the question." +
  " There are no right or wrong answers and no trick questions. Work quickly and do not think too long about the exact meaning of the questions."+
  " Press enter to start. </p>"
};

// defining response scale
var choices = ["Yes", "No"];

//questionnaires
var questions = {
    type: 'survey-multi-choice',
    options: [choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices, choices], // need one scale for every question on a page
    timeline:[
      {questions: ["Do you have many different hobbies?", "Do you stop to think things over before doing anything?", "Does your mood often go up and down?", "Have you ever taken the praise for something you knew someone else had really done?", "Are you a talkative person?", "Would you being in debt worry you?", "Do you ever feel 'just miserable' for no reason?",
      "Were you ever greedy by helping yourself to more than your share of anything?", "Do you lock up your house carefully at night?", "Are you rather lively?"],
      required: [true, true, true, true, true, true, true, true, true, true]},
      {questions: ["Would it upset you a lot to see a child or an animal suffer?", "Do you often worry about things you should not have done or said?", "If you say you will do something, do you always keep your promise no matter how inconvenient it might be?", "Can you usually let yourself go and enjoy yourself at a lively party?", "Are you an irritable person?", "Have you ever blamed someone for doing something you knew was really your fault?", "Do you enjoy meeting new people?",
      "Do you believe insurance schemes are a good idea?", "Are your feelings easily hurt?", "Are all your habits good and desirable ones?"],
      required: [true, true, true, true, true, true, true, true, true, true]},
      {questions: ["Do you tend to keep in the background on social occasions?", "Would you take drugs which may have strange or dangerous effects?", "Do you often feel “fed-up”?", "Have you ever taken anything (even a pin or button) that belonged to someone else?", "Do you like going out a lot?", "Do you enjoy hurting people you love?", "Are you often troubled about feelings of guilt?", "Do you sometimes talk about things you know nothing about?", "Do you prefer reading to meeting people?", "Do you have enemies who want to harm you?"],
        required: [true, true, true, true, true, true, true, true, true, true]},
      {questions: ["Would you call yourself a nervous person?",
      "Do you have many friends?",
      "Do you enjoy practical jokes that can sometimes really hurt people?",
      "Are you a worrier?",
      "As a child did you do as you were told immediately and without grumbling?",
      "Would you call yourself happy-go-lucky?",
      "Do good manners and cleanliness matter much to you?",
      "Do you worry about awful things that might happen?",
      "Have you ever broken or lost something belonging to someone else?",
      "Do you usually take the initiative in making new friends?"],
        required: [true, true, true, true, true, true, true, true, true, true]},
      {questions: ["Would you call yourself tense or “highly-strung”?",
      "Are you mostly quiet when you are with other people?",
      "Do you think marriage is old-fashioned and should be done away with?",
      "Do you sometimes boast a little?",
      "Can you easily get some life into a rather dull party?",
      "Do people who drive carefully annoy you?",
      "Do you worry about your health?",
      "Have you ever said anything bad or nasty about anyone?",
      "Do you like telling jokes and funny stories to your friends?",
      "Do most things taste the same to you?"],
      required: [true, true, true, true, true, true, true, true, true, true]},
      {questions: ["As a child were you ever cheeky to your parents?",
      "Do you like mixing with people?",
      "Does it worry you if you know there are mistakes in your work?",
      "Do you suffer from sleeplessness?",
      "Do you always wash before a meal?",
      "Do you nearly always have a “ready answer” when people talk to you?",
      "Do you like to arrive at appointments in plenty of time?",
      "Have you often felt listless and tired for no reason?",
      "Have you ever cheated at a game?",
      "Do you like doing things in which you have to act quickly?"],
      required: [true, true, true, true, true, true, true, true, true, true]},
      {questions: ["Is (or was) your mother a good woman?",
      "Do you often feel life is very dull?",
      "Have you ever taken advantage of someone?",
      "Do you often take on more activities than you have time for?",
      "Are there several people who keep trying to avoid you?",
      "Do you worry a lot about your looks?",
      "Do you think people spend too much time safeguarding their future with savings and insurances?",
      "Have you ever wished that you were dead?",
      "Would you dodge paying taxes if you were sure you could never be found out?",
      "Can you get a party going?"],
      required: [true, true, true, true, true, true, true, true, true, true]},
      {questions: ["Do you try not to be rude to people?",
      "Do you worry too long after an embarrassing experience?",
      "Have you ever insisted on having your own way?",
      "When you catch a train do you often arrive at the last minute?",
      "Do you suffer from “nerves”?",
      "Do your friendships break up easily without it being your fault?",
      "Do you often feel lonely?",
      "Do you always practice what you preach?",
      "Do you sometimes like teasing animals?",
      "Are you easily hurt when people find fault with you or the work you do?"],
      required: [true, true, true, true, true, true, true, true, true, true]},
      {questions: ["Have you ever been late for an appointment or work?",
      "Do you like plenty of bustle and excitement around you?",
      "Would you like other people to be afraid of you?",
      "Are you sometimes bubbling over with energy and sometimes very sluggish?",
      "Do you sometimes put off until tomorrow what you ought to do today?",
      "Do other people think of you as being very lively?",
      "Do people tell you a lot of lies?",
      "Are you touchy about some things?",
      "Are you always willing to admit it when you have made a mistake?",
      "Would you feel very sorry for an animal caught in a trap?"],
      required: [true, true, true, true, true, true, true, true, true, true]},
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
jsPsych.data.addProperties({questionnaire: "EPQ"})

/* start the experiment */
jsPsych.init({
  timeline: [instructions_block, questions, exit_block]
});
