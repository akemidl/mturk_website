/**
 * jspsych-single-stim
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["alt-choice-gagne"] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('single-stim', 'stimulus', 'image');

  plugin.trial = function(display_element, trial) {

    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial.key_extra1 = trial.key_extra1 || null;
    trial.key_extra2 = trial.key_extra2 || null;
    trial.key_end_trial = trial.key_end_trial|| null;
    trial.key_extra1_func = trial.key_extra1_func || function(){};
    trial.key_extra2_func = trial.key_extra2_func || function(){};

    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial,['key_extra1_func','key_extra2_func']);

    // set default values for the parameters
    trial.choices = trial.choices || [];
    trial.response_ends_trial = (typeof trial.response_ends_trial == 'undefined') ? true : trial.response_ends_trial;
    trial.timing_stim = trial.timing_stim || -1;
    trial.timing_response = trial.timing_response || -1;
    trial.is_html = (typeof trial.is_html == 'undefined') ? false : trial.is_html;
    trial.prompt = trial.prompt || "";

    //console.log(trial.key_extra1_func)

    // this array holds handlers from setTimeout calls
    // that need to be cleared if the trial ends early
    var setTimeoutHandlers = [];

    var extra_buttons_press = [];
    var extra_buttons_pressed_times = [];
    var start_time = (new Date()).getTime();
    var allowed_to_end = false;

    // display stimulus
    if (!trial.is_html) {
      display_element.append($('<img>', {
        src: trial.stimulus,
        id: 'jspsych-alt-choice-gagne-stimulus'
      }));
    } else {
      display_element.append($('<div>', {
        html: trial.stimulus,
        id: 'jspsych-alt-choice-gagne-stimulus'
      }));
    }

    //show prompt if there is one
    if (trial.prompt !== "") {
      display_element.append(trial.prompt);
    }

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
      //if(trial.is_html==true){
      //  var stimulus_data = 'NaN'
      //}else{
      //  var stimulus_data = trial.stim
      //}
      stimulus_data = 'NaN'

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "stimulus": stimulus_data,
        "key_press": response.key,
        "start_time":start_time,
        "extra_buttons_press":extra_buttons_press,
        "extra_buttons_pressed_times":extra_buttons_pressed_times,
      };

      //jsPsych.data.write(trial_data);

      // clear the display
      display_element.html('');

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      $("#jspsych-alt-choice-gagne-stimulus").addClass('responded');

      var test = $("#jspsych-alt-choice-gagne-stimulus")
      //console.log(test)


      response = info;
      // only record the first response
      //if (response.key == -1) {
      //  response = info;
      //}
      if (trial.response_ends_trial) {
        end_trial();
      }


      // extra key functionality
      if (response.key === trial.key_extra1 || response.key === jsPsych.pluginAPI.convertKeyCharacterToKeyCode(trial.key_extra1)) {
        trial.key_extra1_func()
        allowed_to_end=true
        extra_buttons_press.push('extra_key_1_pressed')
        extra_buttons_pressed_times.push((new Date()).getTime()- start_time)
      }
      if (response.key === trial.key_extra2 || response.key === jsPsych.pluginAPI.convertKeyCharacterToKeyCode(trial.key_extra2)) {
        trial.key_extra2_func()
        allowed_to_end=true
        extra_buttons_press.push('extra_key_2_pressed')
        extra_buttons_pressed_times.push((new Date()).getTime()- start_time)
      }
      if (response.key === trial.key_end_trial || response.key === jsPsych.pluginAPI.convertKeyCharacterToKeyCode(trial.key_end_trial)) {
        if (allowed_to_end){
              end_trial();
        }
        extra_buttons_press.push('key_end_trial_pressed')
        extra_buttons_pressed_times.push((new Date()).getTime()- start_time)
      }


    };

    // start the response listener
    if (JSON.stringify(trial.choices) != JSON.stringify(["none"])) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'date',
        persist: true,
        allow_held_key: false
      });
    }

    // hide image if timing is set
    if (trial.timing_stim > 0) {
      var t1 = setTimeout(function() {
        $('#jspsych-alt-choice-gagne-stimulus').css('visibility', 'hidden');
      }, trial.timing_stim);
      setTimeoutHandlers.push(t1);
    }

    // end trial if time limit is set
    if (trial.timing_response > 0) {
      var t2 = setTimeout(function() {
        end_trial();
      }, trial.timing_response);
      setTimeoutHandlers.push(t2);
    }

  };

  return plugin;
})();
