
/* create experiment timeline array */
var timeline = [];

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
timeline.push(welcome_block);



/////////////////////////////
////// Effort Stimulus ////////




var effort_screen = {
  type: "repeated-press-gagne",
  duration: 5,
  choices: [13],
  on_trial_start: function() {
    console.log('A trial just started.');
    //trial.startTimer(30);
  },
  on_finish: function(data){
            console.log('The trial just ended.');
            console.log(JSON.stringify(data))
          }
};

timeline.push(effort_screen)




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


timeline.push(end_block)


/*jsPsych.preloadImages(images, function(){ startExperiment(); });

//// START /////
function startExperiment(){*/
  jsPsych.init({
    timeline: timeline,
    //fullscreen: true,
    on_finish: function() {
      //save_data(jsPsych.data.getData());
    }
  })

//};
