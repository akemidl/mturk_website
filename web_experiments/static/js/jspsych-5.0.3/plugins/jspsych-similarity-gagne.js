/**
 * jspsych-similarity.js
 * Josh de Leeuw
 *
 * This plugin create a trial where two images are shown sequentially, and the subject rates their similarity using a slider controlled with the mouse.
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins.similarity = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('similarity', 'stimuli', 'image');

  plugin.trial = function(display_element, trial) {

    // default parameters
    trial.labels = (typeof trial.labels === 'undefined') ? ["Not at all similar", "Identical"] : trial.labels;
    trial.intervals = trial.intervals || 100;
    trial.show_ticks = (typeof trial.show_ticks === 'undefined') ? false : trial.show_ticks;

    trial.show_response = trial.show_response || "SECOND_STIMULUS";

    trial.timing_first_stim = trial.timing_first_stim || 1000; // default 1000ms
    trial.timing_second_stim = trial.timing_second_stim || -1; // -1 = inf time; positive numbers = msec to display second image.
    trial.timing_image_gap = trial.timing_image_gap || 1000; // default 1000ms

    trial.is_html = (typeof trial.is_html === 'undefined') ? false : trial.is_html;
    trial.prompt = (typeof trial.prompt === 'undefined') ? '' : trial.prompt;

    trial.start_value = (typeof trial.start_value === 'undefined') ? 50 : trial.start_value;
    trial.selected_side = trial.selected_side || '#stim_right';

    trial.choices = trial.choices || [];
    trial.time_before_choice = trial.time_before_choice || 0;

    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

    // this array holds handlers from setTimeout calls
    // that need to be cleared if the trial ends early
    var setTimeoutHandlers = [];

    // show the images
    if (!trial.is_html) {
      display_element.append($('<img>', {
        "src": trial.stimuli[0],
        "id": 'jspsych-sim-stim'
      }));
    } else {
      display_element.append($('<div>', {
        "html": trial.stimuli[0],
        "id": 'jspsych-sim-stim'
      }));
    }

    if (trial.show_response == "FIRST_STIMULUS") {
      show_response_slider(display_element, trial);
    }


    if (trial.timing_first_stim != -1){
      setTimeoutHandlers.push(setTimeout(function() {
        showBlankScreen();
      }, trial.timing_first_stim));
    }



    function showBlankScreen() {
      console.log('showing blank screen')
      $('#jspsych-sim-stim').css('visibility', 'hidden');

      setTimeoutHandlers.push(setTimeout(function() {
        showSecondStim();
      }, trial.timing_image_gap));
    }

    if (trial.timing_first_stim == -1){
    // start the response listener only if the first stimuli stays on forever
    // there were issues with both the timer on and the keyboard on.
      if (JSON.stringify(trial.choices) != JSON.stringify(["none"])) {
        var t1123_ = setTimeout(function() {
          var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
            callback_function: showBlankScreen,
            valid_responses: trial.choices,
            rt_method: 'date',
            persist: false,
            allow_held_key: false
        })},trial.time_before_choice)
      }
    }


    function showSecondStim() {

          if (!trial.is_html) {
            $('#jspsych-sim-stim').attr('src', trial.stimuli[1]);
          } else {
            $('#jspsych-sim-stim').html(trial.stimuli[1]);
          }

          $('#jspsych-sim-stim').css('visibility', 'visible');

          if (trial.show_response == "SECOND_STIMULUS") {
            show_response_slider(display_element, trial);
          }


          if (trial.timing_second_stim > 0) {
            setTimeoutHandlers.push(setTimeout(function() {
              $("#jspsych-sim-stim").css('visibility', 'hidden');
              if (trial.show_response == "POST_STIMULUS") {
                show_response_slider(display_element, trial);
              }
            }, trial.timing_second_stim));
          }
      }


    function show_response_slider(display_element, trial) {

      var startTime = (new Date()).getTime();

      // create slider
      display_element.append($('<div>', {
        "id": 'slider',
        "class": 'sim'
      }));


      $("#slider").slider({
        value: trial.start_value,
        min: 0,
        max: trial.intervals,
        step: 1,
        //// Chris ADDED ////
        change: function( event, ui ) {
            $('.ui-slider-handle.ui-state-default.ui-corner-all').show()
            var score = $("#slider").slider("value");
            console.log('recognizing slider value')
            $("#slider_value").html(String(score)+'% Probability')
        }
        //orientation: "vertical", //this works
      });

      $('.ui-slider-handle.ui-state-default.ui-corner-all').hide()

      // show tick marks
      if (trial.show_ticks) {
        for (var j = 1; j < trial.intervals - 1; j++) {
          $('#slider').append('<div class="slidertickmark"></div>');
        }

        $('#slider .slidertickmark').each(function(index) {
          var left = (index + 1) * (100 / (trial.intervals - 1));
          $(this).css({
            'position': 'absolute',
            'left': left + '%',
            'width': '1px',
            'height': '100%',
            'background-color': '#222222'
          });
        });
      }

      // create labels for slider
      display_element.append($('<ul>', {
        "id": "sliderlabels",
        "class": 'sliderlabels',
        "css": {
          "width": "100%",
          "height": "3em",
          "margin": "10px 0px 0px 0px",
          "padding": "0px",
          "display": "block",
          "position": "relative"
        }
      }));

      for (var j = 0; j < trial.labels.length; j++) {
        $("#sliderlabels").append('<li>' + trial.labels[j] + '</li>');
      }

      // position labels to match slider intervals
      var slider_width = $("#slider").width();
      var num_items = trial.labels.length;
      var item_width = slider_width / num_items;
      var spacing_interval = slider_width / (num_items - 1);

      $("#sliderlabels li").each(function(index) {
        $(this).css({
          'display': 'inline-block',
          'width': item_width + 'px',
          'margin': '0px',
          'padding': '0px',
          'text-align': 'center',
          'position': 'absolute',
          'left': (spacing_interval * index) - (item_width / 2)
        });
      });

      // if prompt is set, show prompt
      if (trial.prompt !== "") {
        display_element.append(trial.prompt);
      }

      var score = $("#slider").slider("value");
      /// Show slider value ////
      display_element.append($('<div>', {
        //"html": String(score)+'% Probability',
        "html": '% Probability',
        "id": 'slider_value',
      }));

      //  create button
      display_element.append($('<div>', {
        'id': 'extra white space',
        'class': 'sim',
        'html': '<p></p>'
      }));


      //  create button
      display_element.append($('<button>', {
        'id': 'next',
        'class': 'sim',
        'html': 'Submit Answer'
      }));



      $("#next").click(function() {
        var endTime = (new Date()).getTime();
        var response_time = endTime - startTime;

        // kill any remaining setTimeout handlers
        for (var i = 0; i < setTimeoutHandlers.length; i++) {
          clearTimeout(setTimeoutHandlers[i]);
        }

        var score = $("#slider").slider("value");
        var trial_data = {
          "sim_score": score,
          "rt": response_time,
          "stimulus": JSON.stringify([trial.stimuli[0], trial.stimuli[1]])
        };
        // goto next trial in block
        display_element.html('');
        jsPsych.finishTrial(trial_data);
      });
    }
  };
  return plugin;
})();
