/* jspsych-text.js
 * Josh de Leeuw
 *
 * This plugin displays text (including HTML formatted strings) during the experiment.
 * Use it to show instructions, provide performance feedback, etc...
 *
 * documentation: docs.jspsych.org
 *
 *
 */

jsPsych.plugins.consent = (function() {

  var plugin = {};

  plugin.trial = function(display_element, trial) {

    trial.continue_button = trial.continue_button
    trial.buttons_groups_to_check = trial.buttons_groups_to_check
    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

    var responses = []

    // set the HTML of the display target to replaced_text.
    display_element.html(trial.text);

    var after_response = function(info) {

      display_element.html(''); // clear the display
      var endTime = (new Date()).getTime();
      var response_time = endTime - startTime;

      var trialdata = {
        "responses": responses.join(","),
      }

      jsPsych.finishTrial(trialdata);

    };

    /// Create continue button functoin
    var continue_button_clicked = function(e){

      console.log('continue button clicked')
      // check that the other buttons have been clicked
      console.log(trial.buttons_groups_to_check)
      var number_to_click = trial.buttons_groups_to_check.length
      var number_clicked = 0
      responses = [] // make this empty again
      for(key in trial.buttons_groups_to_check){
        group =trial.buttons_groups_to_check[key]
        console.log(group)
        var radios = document.getElementsByName(group);
        for( i = 0; i < radios.length; i++ ) {
            if(radios[i].checked==true){
              number_clicked+=1
            }
            console.log(i)
            if(i==0 && radios[i].checked ){
              responses.push('I agree')
            }
            if(i==1 && radios[i].checked ){
              responses.push('I disagree')
            }
        }
      }
      if (number_to_click==number_clicked){
        after_response()
      }else{
        $("#did-not-complete").html('<p style="float: right">You need to select a response for each statement.<p>')
      }
      //after_response()
    }
    /// add it to the continue button specified by input
    $("#"+trial.continue_button).click(continue_button_clicked)

    // add did not complete text bux
    display_element.append($('<div>', {
      'id': 'did-not-complete',
    }));
    $("#did-not-complete").html('')

/*
    var mouse_listener = function(e) {

      var rt = (new Date()).getTime() - start_time;

      display_element.unbind('click', mouse_listener);

      after_response();

    };
*/

/*
    // check if key is 'mouse'
    if (trial.cont_key == 'mouse') {
      display_element.click(mouse_listener);
      var start_time = (new Date()).getTime();
    } else {
      jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.cont_key,
        rt_method: 'date',
        persist: false,
        allow_held_key: false
      });
    }
*/
  var startTime = (new Date()).getTime();
  };


  return plugin;
})();
