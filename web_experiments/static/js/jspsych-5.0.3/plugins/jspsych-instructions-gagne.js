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

jsPsych.plugins.instructions = (function() {

  var plugin = {};

  plugin.trial = function(display_element, trial) {
    console.log(trial)
    console.log(typeof(trial))

    trial.key_forward = trial.key_forward || 'rightarrow';
    trial.key_backward = trial.key_backward || 'leftarrow';
    trial.key_extra1 = trial.key_extra1 || null;
    trial.key_extra2 = trial.key_extra2 || null;
    trial.key_extra1_func = trial.key_extra1_func || function(){};
    trial.key_extra2_func = trial.key_extra2_func || function(){};
    trial.allow_backward = (typeof trial.allow_backward === 'undefined') ? true : trial.allow_backward;
    trial.allow_keys = (typeof trial.allow_keys === 'undefined') ? true : trial.allow_keys;
    trial.show_clickable_nav = (typeof trial.show_clickable_nav === 'undefined') ? false : trial.show_clickable_nav;
    trial.after_button_html = trial.after_button_html || [''];
    trial.functions_for_each_screen = trial.functions_for_each_screen || [];
    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function

    // Chris: here I pass in functions that I don't want to be run until a key is pressed!!
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial,['key_extra1_func','key_extra2_func','functions_for_each_screen']);


    var current_page = 0;

    var view_history = [];

    var start_time = (new Date()).getTime();

    var last_page_update_time = start_time;

    var extra_buttons_press = [];
    var extra_buttons_pressed_times = [];

    function show_current_page() {
      display_element.html(trial.pages[current_page]);


      if (trial.show_clickable_nav) {

        var nav_html = "<div class='jspsych-instructions-nav'>";
        if (current_page != 0 && trial.allow_backward) {
          nav_html += "<button id='jspsych-instructions-back' class='jspsych-btn'>&lt; Previous</button>";
        }
        nav_html += "<button id='jspsych-instructions-next' class='jspsych-btn'>Next &gt;</button></div>"

        display_element.append(nav_html);

        if (current_page != 0 && trial.allow_backward) {
          $('#jspsych-instructions-back').on('click', function() {
            clear_button_handlers();
            back();
          });
        }

        $('#jspsych-instructions-next').on('click', function() {
          clear_button_handlers();
          next();
        });

      }

      // Adding below instruction stuff
      display_element.append(trial.after_button_html[current_page])

      // Call any functions for this screen
      console.log(trial.functions_for_each_screen[current_page])
      eval(trial.functions_for_each_screen[current_page])

    }

    function clear_button_handlers() {
      $('#jspsych-instructions-next').off('click');
      $('#jspsych-instructions-back').off('click');
    }

    function next() {

      add_current_page_to_view_history()

      current_page++;

      // if done, finish up...
      if (current_page >= trial.pages.length) {
        endTrial();
      } else {
        show_current_page();
      }

    }

    function back() {

      add_current_page_to_view_history()

      current_page--;

      show_current_page();
    }

    function add_current_page_to_view_history() {

      var current_time = (new Date()).getTime();

      var page_view_time = current_time - last_page_update_time;

      view_history.push({
        page_index: current_page,
        viewing_time: page_view_time
      });

      last_page_update_time = current_time;
    }

    function endTrial() {

      if (trial.allow_keys) {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboard_listener);
      }

      display_element.html('');

      var trial_data = {
        "view_history": JSON.stringify(view_history),
        "rt": (new Date()).getTime() - start_time,
        "extra_buttons_press":extra_buttons_press,
        "extra_buttons_pressed_times":extra_buttons_pressed_times,
      };

      jsPsych.finishTrial(trial_data);
    }

    var after_response = function(info) {

      // have to reinitialize this instead of letting it persist to prevent accidental skips of pages by holding down keys too long
      keyboard_listener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: [trial.key_forward, trial.key_backward,trial.key_extra1,trial.key_extra2],
        rt_method: 'date',
        persist: false,
        allow_held_key: false
      });
      // check if key is forwards or backwards and update page
      if (info.key === trial.key_backward || info.key === jsPsych.pluginAPI.convertKeyCharacterToKeyCode(trial.key_backward)) {
        if (current_page !== 0 && trial.allow_backward) {
          back();
        }
      }

      if (info.key === trial.key_forward || info.key === jsPsych.pluginAPI.convertKeyCharacterToKeyCode(trial.key_forward)) {
        next();
      }

      // extra key functionality
      if (info.key === trial.key_extra1 || info.key === jsPsych.pluginAPI.convertKeyCharacterToKeyCode(trial.key_extra1)) {
        trial.key_extra1_func()
        extra_buttons_press.push('extra_key_1_pressed')
        extra_buttons_pressed_times.push((new Date()).getTime()- start_time)
      }
      if (info.key === trial.key_extra2 || info.key === jsPsych.pluginAPI.convertKeyCharacterToKeyCode(trial.key_extra2)) {
        trial.key_extra2_func()
        extra_buttons_press.push('extra_key_2_pressed')
        extra_buttons_pressed_times.push((new Date()).getTime()- start_time)
      }

    };

    show_current_page();

    if (trial.allow_keys) {
      var keyboard_listener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: [trial.key_forward, trial.key_backward,trial.key_extra1,trial.key_extra2],
        rt_method: 'date',
        persist: false
      });
    }
  };

  return plugin;
})();
