/**
 * jspsych-single-stim
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["repeated-press-gagne"] = (function() {

  var plugin = {};

  plugin.trial = function(display_element, trial) {

      // if any trial variables are functions
      // this evaluates the function and replaces
      // it with the output of the function
      trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

      // set default values for the parameters
      trial.choices = trial.choices || [];
      trial.prompt = trial.prompt || "";
      trial.duration = trial.duration;

      trial.width = 10
      // this array holds handlers from setTimeout calls
      // that need to be cleared if the trial ends early
      var setTimeoutHandlers = [];

      // display counter
      display_element.append("<div id=countdown><p>"+String(trial.duration)+"</p><div>")

      // displace bar
      display_element.append('<div id=suroundingbar '+
       'style="width:100px;height:50px;border:1px solid #000;background-color:transparent;">'+
       '<div id=bar style="width:'+String(trial.width)+'px;height:50px;border:1px solid #000;background-color:#000"></div></div>')

      //show prompt if there is one
      if (trial.prompt !== "") {
        display_element.append(trial.prompt);
      }
      // Store number of responses instead
      var number_responses = 0

      // store response
      var response = {
        rt: -1,
        key: -1
      };

      // function to end trial when it is time
      var end_trial = function() {

        // kill any remaining setTimeout handlers
        for (var i = 0; i < setTimeoutHandlers.length; i++) {
          clearTimeout(setTimeoutHandlers[i]);
        }

        // kill keyboard listeners
        if (typeof keyboardListener !== 'undefined') {
          jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
        }

        // gather the data to store for the trial ## CHANGE THIS
        var trial_data = {
          "rt": response.rt,
          "key_press": response.key
        };

        //jsPsych.data.write(trial_data);

        // clear the display
        display_element.html('');

        // move on to the next trial
        jsPsych.finishTrial(trial_data);
      };

    // function to handle responses by the subject
    var response_call = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      //$("#jspsych-single-stim-stimulus").addClass('responded');
      console.log("Pressed Button")
      trial.width=trial.width+2
      $("#bar").css({'width': String(trial.width)+'px'})
      // only record the first response
      if (response.key == -1) {
        response = info;
      }

    };

    // start the response listener
    if (JSON.stringify(trial.choices) != JSON.stringify(["none"])) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: response_call,
        valid_responses: trial.choices,
        rt_method: 'date',
        persist: true,
        allow_held_key: false
      });
    }


    function startTimer(duration) {
      var time_left = duration
      var timer = setInterval(function () {
          time_left = time_left-1;
          console.log(time_left)
          $("#countdown").html(time_left)

          if (time_left ==0) {
              console.log('finished?')
              clearInterval(timer)
              end_trial()
          }
      }, 1000);
    }

    startTimer(trial.duration)

  };

  return plugin;
})();
