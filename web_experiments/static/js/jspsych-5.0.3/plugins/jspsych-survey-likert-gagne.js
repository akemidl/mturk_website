/**
 * jspsych-survey-likert
 * a jspsych plugin for measuring items on a likert scale
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */

jsPsych.plugins['survey-likert'] = (function() {

  var plugin = {};
  test_fun = function(){
    console.log('Test Function')
    // get the ID of the button
    //$('#Q1').get
    //console.log($(this))
    // get the clock time.
    // add those to a list..

  }




  plugin.trial = function(display_element, trial) {

    // default parameters for the trial
    trial.preamble = typeof trial.preamble === 'undefined' ? "" : trial.preamble;
    trial.check_completion = trial.check_completion || false;
    trial.check_completion_but_allow_to_pass = trial.check_completion_but_allow_to_pass || false;
    trial.radio_size = trial.radio_size || 1.5;
    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);


    // show preamble text
    display_element.append($('<div>', {
      "id": 'jspsych-survey-likert-preamble',
      "class": 'jspsych-survey-likert-preamble'
    }));

    $('#jspsych-survey-likert-preamble').html(trial.preamble);

    display_element.append('<form id="jspsych-survey-likert-form">');


    // add likert scale questions
    for (var i = 0; i < trial.questions.length; i++) {
      form_element = $('#jspsych-survey-likert-form');
      // add question
      form_element.append('<label class="jspsych-survey-likert-statement">' + trial.questions[i] + '</label>');
      // add options
      var width = 100 / trial.labels[i].length;
      options_string = '<ul class="jspsych-survey-likert-opts" data-radio-group="Q' + i + '">';


      for (var j = 0; j < trial.labels[i].length; j++) {
        options_string += '<li style="width:' + width + '%"><input type="radio" style="transform:scale('+String(trial.radio_size)+')" onclick="test_fun" id="Q' + i + '" name="Q' + i + '" value="' + j + '"><label class="jspsych-survey-likert-opt-label">' + trial.labels[i][j] + '</label></li>';
      }
      options_string += '</ul>';
      form_element.append(options_string);
    }

    // add submit button
    display_element.append($('<button>', {
      'id': 'jspsych-survey-likert-next',
      'class': 'jspsych-survey-likert jspsych-btn'
    }));

    // add did not complete text bux
    display_element.append($('<div>', {
      'id': 'did-not-complete',
    }));
    $("#did-not-complete").html('')


    get_question_data = function(){
      var question_data = {};
      $("#jspsych-survey-likert-form .jspsych-survey-likert-opts").each(function(index) {
        var id = $(this).data('radio-group');
        var response = $('input[name="' + id + '"]:checked').val();
        if (typeof response == 'undefined') {
          response = -1;
        }
        var obje = {};
        obje[id] = response;
        $.extend(question_data, obje);

    });
    return(question_data)
  }



    ///// First button
    $("#jspsych-survey-likert-next").html('Submit Answers');
    $("#jspsych-survey-likert-next").click(function() {
      // measure response time
      var endTime = (new Date()).getTime();
      var response_time = endTime - startTime;

      // create object to hold responses
      var question_data = get_question_data()

      // Check for completion
      console.log(question_data)
      completed = 1
      for (prop in question_data){
        if (question_data[prop]==-1){
          completed = 0
        }
        //console.log(question_data[prop])
      }

      if (completed ==0 && trial.check_completion){
        if (trial.check_completion_but_allow_to_pass==true){
          text = '<p>You have left some answers blank. Please complete them and then press the "Submit Answers" button again. If you do not want to answer the questions you have left blank, click the button below.<p>'
        }else if(trial.check_completion_but_allow_to_pass==false){
          text = '<p>You have left some answers blank. Please complete them and then press the "Submit Answers" button again.<p>'
        }

        $("#did-not-complete").html(text)
        $("#jspsych-survey-likert-next-2").show() // show other button
      }else{
        // save data
        var trial_data = {
          "rt": response_time,
          "responses": JSON.stringify(question_data),
          "submitted_all": true,
        };

        display_element.html('');

        // next trial
        jsPsych.finishTrial(trial_data);
    }

    });



        if (trial.check_completion_but_allow_to_pass){
          // add a second submit button
          display_element.append($('<button>', {
            'id': 'jspsych-survey-likert-next-2',
            'class': 'jspsych-survey-likert jspsych-btn',
          }));
          //// Second Button
          $("#jspsych-survey-likert-next-2").hide();
          $("#jspsych-survey-likert-next-2").html('Submit Answered Questions Only');
          $("#jspsych-survey-likert-next-2").click(function() {
            // measure response time
            var endTime = (new Date()).getTime();
            var response_time = endTime - startTime;

            // create object to hold responses
            var question_data = get_question_data()

              // save data
              var trial_data = {
                "rt": response_time,
                "responses": JSON.stringify(question_data),
                "submitted_all": false,
              };

              display_element.html('');

              // next trial
              jsPsych.finishTrial(trial_data);
            });


        }


    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
