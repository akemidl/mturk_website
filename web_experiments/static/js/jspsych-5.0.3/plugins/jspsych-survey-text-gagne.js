/**
 * jspsych-survey-text
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['survey-text'] = (function() {

  var plugin = {};

  plugin.trial = function(display_element, trial) {

    trial.preamble = typeof trial.preamble == 'undefined' ? "" : trial.preamble;
    trial.check_completion = trial.check_completion || false;
    trial.reg_ex = trial.reg_ex || [];

    if (typeof trial.rows == 'undefined') {
      trial.rows = [];
      for (var i = 0; i < trial.questions.length; i++) {
        trial.rows.push(1);
      }
    }
    if (typeof trial.columns == 'undefined') {
      trial.columns = [];
      for (var i = 0; i < trial.questions.length; i++) {
        trial.columns.push(40);
      }
    }
    var completed =0
    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

    // show preamble text
    display_element.append($('<div>', {
      "id": 'jspsych-survey-text-preamble',
      "class": 'jspsych-survey-text-preamble'
    }));

    $('#jspsych-survey-text-preamble').html(trial.preamble);

    // add questions
    for (var i = 0; i < trial.questions.length; i++) {
      // create div
      display_element.append($('<div>', {
        "id": 'jspsych-survey-text-' + i,
        "class": 'jspsych-survey-text-question'
      }));

      // add question text
      $("#jspsych-survey-text-" + i).append('<p class="jspsych-survey-text">' + trial.questions[i] + '</p>');

      // add text box
      $("#jspsych-survey-text-" + i).append('<textarea name="#jspsych-survey-text-response-' + i + '" cols="' +
       trial.columns[i] + '" rows="' + trial.rows[i] +
        '" maxlength="'+trial.maxlength[i]+'" placeholder="'+trial.placeholder[i]+ '" oninput="removePlaceHolder(this)"'+'></textarea>');
    }

    removePlaceHolder = function(thiss){
      console.log(thiss)
      thiss.placeholder=''
      console.log(thiss)
    }

    // add submit button
    display_element.append($('<button>', {
      'id': 'jspsych-survey-text-next',
      'class': 'jspsych-btn jspsych-survey-text'
    }));
    $("#jspsych-survey-text-next").html('Submit Answers');

    // add did not complete text bux
    display_element.append($('<div>', {
      'id': 'did-not-complete',
    }));
    $("#did-not-complete").html('')


    $("#jspsych-survey-text-next").click(function() {
      // measure response time
      var endTime = (new Date()).getTime();
      var response_time = endTime - startTime;

      // create object to hold responses
      var question_data = {};
      $("div.jspsych-survey-text-question").each(function(index) {
        var id = "Q" + index;
        var val = $(this).children('textarea').val();
        var obje = {};
        obje[id] = val;
        $.extend(question_data, obje);
      });


      // check for completion
      console.log('here')
      console.log(question_data)

      num_questions = Object.keys(question_data).length
      ncompleted=0
      i = 0
      regexs_match = 0
      for (var q in question_data){
        // make sure there is something entered
        if (JSON.stringify(question_data[q])==JSON.stringify("")){
          ncompleted+=0
        }else{
          ncompleted+=1
        }
        // match regex
        console.log(RegExp(trial.reg_ex[i]))
        console.log(question_data[q])
        console.log(RegExp(trial.reg_ex[i]).test(question_data[q]))
        if (RegExp(trial.reg_ex[i]).test(question_data[q])){
          regexs_match+=1
        }
        i+=1
      }
      console.log(ncompleted)

      if (ncompleted==num_questions){
        completed=1
      }else{
        completed=0
      }

      if (regexs_match==num_questions){
        completed=1
      }else{
        completed=0
      }


      if (completed ==0 && trial.check_completion){
        // d
        $("#did-not-complete").html("<p>You have either left answer blank or entered an answer in the wrong format.<p>")

      }else{

        // save data
        var trialdata = {
          "rt": response_time,
          "responses": JSON.stringify(question_data)
        };

        display_element.html('');

        // next trial
        jsPsych.finishTrial(trialdata);
      }
    });

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
