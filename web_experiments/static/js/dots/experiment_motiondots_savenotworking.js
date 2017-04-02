//cleaned up final version of expt
/*parameters need for expt*/
var flakes=[]; //array will fill with dots later...
var num_dots=200; //number of dots on screen at any time...
var outcome_done=false; //this gets changed to true when they press enter for their response and we show the outcome...
var canRespondslider=false; //can set this so only true when in loop for slider...
var canRespondbuttons=false;
var Isprobetrial=false;
var last_pressed='none';
var slider_startposition=0;
var slider_startposition_array=[];
var RT=0;
// Counters
var currentevent = 0
var currenttrial_t = 0 //this is the counter for the training block trials...
var block1trials_t=0 //this is the counter for the block 1 category boundary trials...
var checktime=setInterval(function(){},100); //how often we loop over and check how long the trial is taking. If too long then it times out and we move to the next trial...

/*create event array*/
var total_instruction_screens=3;
var num_slidertrainingtrials=5;
var num_block1trials=5; //category boundary block trials...
var num_probetrials=5; //probe trials- slider but without feedback...
var num_trials=num_slidertrainingtrials+num_block1trials+num_probetrials;
var reaction_times=[];
var event_array=[];
  for (i = 0; i <total_instruction_screens; i++) {
  	var event_array = event_array.concat('instruct-'+i.toString())
  }
  for (i=0;i<num_slidertrainingtrials;i++){
      var event_array=event_array.concat('trainingtrial-'+i.toString())
      /*can have different event functions and then call the different functions related to those event types when get to this...*/
  }
  for (i=0;i<num_block1trials;i++){
      var event_array=event_array.concat('block1trial-'+i.toString())
      /*can have different event functions and then call the different functions related to those event types when get to this...*/
  }
  for (i=0;i<num_probetrials;i++){
      var event_array=event_array.concat('probetrial-'+i.toString())
      /*can have different event functions and then call the different functions related to those event types when get to this...*/
  }

  //variables to give a lifetime to the dots so they die a natural death after a random interval...
  var minlife=10;
  var maxlife=60;
  var liferange=maxlife-minlife;

  var eventt = event_array[0] //setting this, will use and increment later...
  console.log(event_array)

  //difficulty variables
  var colour_difficulty=0.2; //difficulty measure...
  var colour_spread=20; //std dev of Gaussian from which colour for individual dots is drawn...
  var sspread=0.1; //std dev of Gaussian from which speed for individual dots is drawn...
  var mean_speed=30; //how fast reanimate...

  var choicebutton_side_array=[]; //0 for red on left, 1 for blue on right, from choicebutton_side.js...
    for (i=0;i<num_trials;i++){
      choicebutton_side_array.push(choicebutton_side[i])
    };
    console.log(choicebutton_side_array)
    var position_outcomebar_array=[]; //where the outcome bar should be positioned on the outcome slider...
    var colour_eachdot=[];
    var speed_eachdot=[];
      for (i = 0; i <num_trials; i++) {
        var colour_tmp=(0.5+rb_array[i]*0.5*colour_difficulty/1000); //transforming the input from rb_array
        var speed_tmp=1.5+speed_array[i]/2000; //transforming the input from speed_array
        colour_eachdot.push(colour_tmp); //actually probably want to set these and then work back to what the colour and speed values will be...
        speed_eachdot.push(speed_tmp);
      };

    var colour_range=math.max(colour_eachdot)-math.min(colour_eachdot);
    var speed_range=math.max(speed_eachdot)-math.min(speed_eachdot);

    var category_boundary_block1=math.min(colour_eachdot)+colour_range/2; //putting the category boundary at 50% for now...

    //working out what the outcome position of the bar should be on slider based on the colour and speed variables and the range...
    for (i=0;i<num_trials;i++){
      var outcome_position_speed_tmp=(speed_eachdot[i]-math.min(speed_eachdot))*100/speed_range; //
      var outcome_position_colour_tmp=(colour_eachdot[i]-math.min(colour_eachdot))*100/colour_range;//
      console.log(outcome_position_speed_tmp);
      console.log(outcome_position_colour_tmp);
      if (context_array[i]=='SPEED'){position_outcomebar_array.push(outcome_position_speed_tmp)} //saving where we are in colour spectrum to show outcome later...
      else if (context_array[i]=='COLOUR'){position_outcomebar_array.push(outcome_position_colour_tmp)} //saving where we are in speed spectrum to show outcome later...
    };

    //Timings- might not need all of these??
    var decisionlim = 8000 // not currently using...
    var ITI = 3000 //not sure if using...
    var startTrialTime = 0; //using
    var contextscreen_start=0; //1000 how long after trial starts the context screen is started...using
    var moving_dots_start=1000; //3000 using
    var moving_dots_timeout=5000; //5000 using
    var time_toenterslider=5000; //using-how long they have to enter their choice on the slider on each trial before timeout...
    var outcomebarshow_duration=2000; //using-how long to show the outcome bar for...
    var outcomebuttonshow_duration=2000;
    var howlong=0; //how long the trial has been running-updating using checktime...
    var intertrial_interval_probes=1000; //intertrial interval after they entered their response on the probe trials...
    var showsubjectchoicetime=2000;
    var squareflashtime=500;
    /////////////////// INTRUCTIONS //////////////////////////////
    function RunInstruct(event){
    	var currentnumber = parseInt(event.split('-')[1])// get number
    	console.log(currentnumber)

        //// Welcome Screen
        	if(currentnumber==1){
        		document.getElementById('instruct').innerHTML='<p>Welcome to the experiment!</p><p>In this study you will...</p>'

        //// Display first trial screen
        	}else if(currentnumber==2){
        		document.getElementById('instruct').innerHTML='<p>On each trial you will...</p>'

        	}else if(currentnumber==3){
        		document.getElementById('instruct').innerHTML='<p>One is .</p>'

        	}else if(currentnumber==4){
        		document.getElementById('instruct').innerHTML='<p>The second thing you should consider though, is...</p>'

        	}else if(currentnumber==5){
        		document.getElementById('instruct').innerHTML='<p>You have a few seconds to make your decision. If you have made your choice, you can then enter your response using the button box. </p>'

        	}else if(currentnumber==6){
        		document.getElementById('instruct').innerHTML = 'Once you have entered your response the computer highlights your choice (show box around choice). '
        		document.getElementById('mag_right').style.border = '.2em solid black';
          }
        };

///////////////////////////////////////////////////////////////////////////////
//Functions defined that we are then stepping through and using when we run the trial...
        //Functions for the moving dots...
          //Function to push a new snowflake to the flakes array
  function addFlake(cW,cH){
            for (i=0;i<num_dots;i++){
                  var x=Math.floor(Math.random() * cW) + 1;
                  //var y=cH/4;
                  var y=Math.floor(Math.random() * cH) + 1;
                  var s=(speed_eachdot[currenttrial_t]+sspread*speed_eachdot[currenttrial_t]*Math.sqrt(-2*Math.log(Math.random()))*Math.cos(2*Math.PI*Math.random()));
                  var rc=Math.round(255*colour_eachdot[currenttrial_t]+colour_spread*Math.sqrt(-2*Math.log(Math.random()))*Math.cos(2*Math.PI*Math.random()));
                    if (rc>255){rc=255}; //colour must be between 0-255
                    if (rc<0){rc=0};
                  //console.log(s); console.log(rc);

                  var rb=255-rc; /*blue color-want it to be between 1 and 255 at the moment...*/
                  var rot=Math.random(); //not making them go in different direction at the moment but could do later if we wanted to...
                  var ang=Math.floor(Math.random()*2+1); /*how much moving in x direction as well? Can change overall angle?*/
                  //var ext=Math.round(Math.random()*liferange)+minlife; //setting lifetime for flake between minlife and maxlife...
                  //console.log(x,y,s,rc,rb,rot,ang) //,ext
                flakes.push({"x":x,"y":y,"s":s,"rc":rc, "rb":rb, "rot":rot, "ang":ang}); //, "ext":ext

                      if (i==num_dots){
                      console.log(flakes[1]);
                        };
                //console.log(flakes[1].ext);
              }; //for if loop
        }; /*for addFlake*/

//Functions for the canvas

//cut canvas into a circle
function clipCanvas(){
      ctx.beginPath();
      ctx.arc(ctx.canvas.width/2,ctx.canvas.height/2,radius_canvas,0,Math.PI*2, false);
      ctx.clip();
    };

function canvas_circle(){
          var ctx=document.getElementById('mycanvas').getContext('2d');
          var cW=ctx.canvas.width, cH=ctx.canvas.height;
          var radius_canvas=Math.min(cW/4,cH/4);
          //ctx.save();
          ctx.clearRect(0,0,cW,cH);
          /*cut canvas to be a circle*/
          ctx.beginPath();
          ctx.arc(ctx.canvas.width/2,ctx.canvas.height/2,radius_canvas,0,Math.PI*2, false);
          ctx.fillStyle = "grey";
          ctx.fill();
          ctx.restore();
        };

var ctx=document.getElementById('mycanvas').getContext('2d');
var cW=ctx.canvas.width, cH=ctx.canvas.height;
var radius_canvas=Math.min(cW/4,cH/4);

function moving_dots(mean_speed, flakes){
          console.log('here')

        /* we want to now loop over the flakes array to make the snowflakes move down screen by changing y value */
        function snow (){
            for(var i=0; i<flakes.length; i++){
                ctx.fillStyle="rgba(" +flakes[i].rc + ",0," +flakes[i].rb + ",0.75)" /*makes it white and opaque*/
                /*ctx.rotate(flakes[i].rot);*/ /*this makes them move wildly*/
                ctx.beginPath(); /*start a new arc shape for each snowflake*/

                /*arc is for drawing a circle here for a snowflake...*/
                /*arc(x,y,radius,startAngle,endAngle (these are for how you draw them),anticlockwise)*/
                /*note that changing the number you multiply y by also changes the speed, so could make this a variable to change for different ones...*/
                /*does this update the variables stored in flakes and how??*/
                ctx.arc(flakes[i].x,flakes[i].y+=flakes[i].s, 2,0,Math.PI*2, false); /*adding to the y position to get downwards movement*/
                ctx.closePath();
                ctx.fill(); /*or could use .fillRect() but it needs 4 inputs...*/

                /*remove snowflakes after move off canvas*/
                /*can change to remove after a certain random time period...*/
                /*or remove if they go outside certain area...*/
                if (flakes[i].y>3*cH/4) {
                      flakes[i].y=cH/4;
                      flakes[i].x=Math.floor(Math.random() * cW) + 1;
                    } /*for if loop*/
                    }; /*for for loop*/
              }; /*for snow*/

            function animate(){
                  ctx.save(); /*saving the last image in the animation stack*/
                  ctx.clearRect(0,0,cW,cH); /*Without this the snow just fills up the window.note that if have this in, seem to be able to change the size of the window flexibly...*/
                    /*ctx.drawImage(bg,0,0);*/
                    clipCanvas(); /*everything draw after this will now be clipped into the circle*/
                    /*ctx.fillStyle="red";ctx.fillRect(0,0,cW,cH);*/ /*If have this and don't have the clear rectangle then still works???*/
                    /*ctx.rotate(0.3); *//*can rotate where the snow about to put in is falling. BUT, also need to change where it comes in and leaves...*/
                    snow(); /*can do this for each particle to get moving in lots of different directions?*/
                    ctx.restore(); /*restoring the last image of the animation stack...*/
                  }; /*for animate function*/

                  var animateInterval=setInterval(animate,mean_speed); /*can change this interval to get them falling faster or slower overall...*/
                      //stop the dots
                    setTimeout(function(){
                        clearInterval(animateInterval);
                      //make the circle grey
                        canvas_circle();

                      //Need to then do diff things depending on trial type...
                        if (eventt.indexOf('trainingtrial')==0){
                            canRespondslider=true;
                            //start slider functionality
                            document.getElementById('participantOffer').innerHTML="Move slider using left and right arrow keys and press enter to save choice";
                            $('#participantOffer').show();
                            //Move the sliderbar to a random start position on each trial:
                            slider_startposition=Math.round(Math.random()*100);
                            console.log(slider_startposition)
                            slider_startposition_array.push(slider_startposition); //to save the random start position we will use for the slider bar...

                            $("#slidebar").slider('value',slider_startposition); //
                            $('#slidebar').slider("enable");

                          } else if (eventt.indexOf('block1trial')==0){
                            canRespondbuttons=true;
                            document.getElementById('button_text_para').innerHTML="Press left arrow key for left, right arrow key for right";

                          } else if (eventt.indexOf('probetrial')==0){
                            canRespondslider=true;
                            //start slider functionality
                            document.getElementById('participantOffer').innerHTML="Move slider using left and right arrow keys and press enter to save choice";
                            $('#participantOffer').show();
                            //Move the sliderbar to a random start position on each trial:
                            slider_startposition=Math.round(Math.random()*100);
                            console.log(slider_startposition)
                            slider_startposition_array.push(slider_startposition); //to save the random start position we will use for the slider bar...

                            $("#slidebar").slider("value",slider_startposition);
                            $('#slidebar').slider("enable");
                            $('#slidebar').focus();
                        }; //for else if loop

                    }, moving_dots_timeout); //for setTimeout

            }; /* for moving_dots*/


//Functions for slide bar:
  //To start slidebar
  $('#slidebar').slider();
  $('#slidebar').slider( "disable" ); //we will only enable when they can respond...
  //EMMA HERE- need to put this in a loop to enable and disable when moving dots has finished or they press enter...

//Function to save the slidebar position when the subject pressed enter
    //Called in Enter_slider function above...
  var slideposition_array=[];
  var save_slideposition=function(){
    var sliderposition_tmp=$("#slidebar").slider("value"); //were using position before, now using value as this is what slider in jQuery uses...
    slideposition_array.push(sliderposition_tmp);
  };

  //Function to show outcome for slider bar based on their response
  //...ALSO proceeds to the next trial...(proceed next after outcomebarshow_duration...)
  var outcomeslider=function(response){
      outcome_done=true;
      console.log(outcome_done)
      console.log(position_outcomebar_array[currenttrial_t])
      var left_pos=position_outcomebar_array[currenttrial_t]+"%"
      $("#outcomebar").css("margin-left",left_pos) //position_outcomebar_array[currenttrial_t] need to turn this into a value...
      $("#outcomebar").show();
      $('#slidebar').slider( "disable" );

      //saving the variables from this trial...
      choicebutton_side_array[currenttrial_t]="not applicable";
      //category_boundary_block1="not applicable"; //can't set this here as then not changed on the trials we need it to be...
      last_pressed="not_applicable"
	
	get_toprint=("?response="+response+"&rt="+RT+"&trial_type="+ eventt+ "&currenttrial="+currenttrial_t+"&slider_position_subjectresponse=" +slideposition_array[currenttrial_t] +"&slider_position_subjectresponse_array="+slideposition_array + "&speed_eachdot=" +speed_eachdot + "&colour_eachdot=" +colour_eachdot+ "&true_outcome_colour=" +outcome_position_colour_tmp+ "&true_outcome_speed=" +outcome_position_speed_tmp +  "&trialstart="+startTrialTime + "&choicebutton_side="+choicebutton_side_array[currenttrial_t] + "&correct=" + correct[currenttrial_t] + "&category_boundary_block1=" + category_boundary_block1 +"&last_pressed=" +last_pressed);
	console.log(get_toprint);

      $.get("?response="+response+"&rt="+RT+"&trial_type="+ eventt+ "&currenttrial="+currenttrial_t+"&slider_position_subjectresponse=" +slideposition_array[currenttrial_t] +"&slider_position_subjectresponse_array="+slideposition_array + "&speed_eachdot=" +speed_eachdot + "&colour_eachdot=" +colour_eachdot+ "&true_outcome_colour=" +outcome_position_colour_tmp+ "&true_outcome_speed=" +outcome_position_speed_tmp +  "&trialstart="+startTrialTime + "&choicebutton_side="+choicebutton_side_array[currenttrial_t] + "&correct=" + correct[currenttrial_t] + "&category_boundary_block1=" + category_boundary_block1 +"&last_pressed=" +last_pressed, function(response){});

      // deal with no response
      if(response=='noresp'){
        console.log('NO RESPONSE')
        clearInterval(checktime);
      }
      //log that they responded
      if (response=='responded'){
        console.log('RESPONDED')
      }

      T4 =setTimeout(function() {
        {currenttrial_t+=1}
          Proceed('next');
      },outcomebarshow_duration); //time to show outcome bar for...
  };

  //Calls this function on probe trials, when we want to proceed to the next one but not show an outcome...
  var respondedslider_probetrial=function(response){
          outcome_done=true;
          console.log(outcome_done)
          console.log(position_outcomebar_array[currenttrial_t])
          $('#slidebar').slider( "disable" );
          // deal with no response
          if(response=='noresp'){
            console.log('NO RESPONSE')
            clearInterval(checktime);
          }
          //log that they responded
          if (response=='responded'){
            console.log('RESPONDED')
          }

          T4 =setTimeout(function() {
            {currenttrial_t+=1}
              Proceed('next');
          },intertrial_interval_probes); //time to show outcome bar for...
      };

      ///////////////////////////////////////////////////////////////////////////////
      //Functions for the outcome buttons (category boundary trials...)
        //Function to show the choice buttons and allow subjects to choose...
        function choice_buttons(){
              //used to have canRespondbuttons==true here, but now put this in when finish Motion_dots...
                  //as we will have the choice buttons there for the whole trial now...
              //need to add the other things want to hide/show on the screen here...
              //things to show

              //change the side of the screen the red and blue choice appears on...
                  //0 for red on left, 1 for blue on right, from choicebutton_side.js...
                  console.log(choicebutton_side_array[currenttrial_t]);
                if (choicebutton_side_array[currenttrial_t]==0){
                    console.log('left=red');
                    document.getElementById("left_choice").style.background="red";
                    document.getElementById("left_choice").style.backgroundClip="content-box";
                    document.getElementById("right_choice").style.background="blue";
                    document.getElementById("right_choice").style.backgroundClip="content-box";
                }else if(choicebutton_side_array[currenttrial_t]==1){
                    console.log('left=blue');
                    document.getElementById("left_choice").style.background="blue";
                    document.getElementById("left_choice").style.backgroundClip="content-box";
                    document.getElementById("right_choice").style.background="red";
                    document.getElementById("right_choice").style.backgroundClip="content-box";
                };

              //At this stage we don't want to show the outcome border...only add this in later...
              //remove border colour here...
              document.getElementById("left_choice").style.border="5px solid transparent";
              document.getElementById("right_choice").style.border="5px solid transparent";

              //add text for the buttons
              document.getElementById('button_text_para').innerHTML=" ";

              $('#outcome_circle').hide()
              $('#left_choice').show()
              $('#right_choice').show()
              $('#fourth_div').show()

            };

        //Function to save the subject's choice in an array...
          var choicemade_array=[];
          function save_choicebutton(){
              choicemade_array.push(last_pressed);
              console.log(choicemade_array)
              console.log(currenttrial_t)
              console.log(choicemade_array[currenttrial_t])
          };

        //Function to show the outcome based on their response and what is correct for that trial...
          //Now changing so just showing the border around the correct one rather than the outcome circle...
            //Just depends on what is correct and which side that colour is on, not what they chose anymore...
          var correct=[];
      var outcomebuttons=function(response){
                outcome_done=true;

          //this is the function to get all of the variables we want to save on each trial...
            //set values for the variables for the slider that we don't need to save on this trial...
            sliderposition_tmp="not applicable";

            // choicebutton_side_array[currenttrial_t] //which side red button on
            // correct[currenttrial_t] //whether they were correct or not...
            // category_boundary_block1 //where the category boundary is...
            // last_pressed //which side they pressed...
            // eventt //string for what type of trial it is...
          $.get("?response="+response+"&rt="+RT+"&trial_type="+ eventt+ "&currenttrial="+currenttrial_t+"&slider_position_subjectresponse=" +sliderposition_tmp +"&slider_position_subjectresponse_array="+slideposition_array + "&speed_eachdot=" +speed_eachdot + "&colour_eachdot=" +colour_eachdot+ "&true_outcome_colour=" +outcome_position_colour_tmp+ "&true_outcome_speed=" +outcome_position_speed_tmp +  "&trialstart="+startTrialTime + "&choicebutton_side="+choicebutton_side_array[currenttrial_t] + "&correct=" + correct[currenttrial_t] + "&category_boundary_block1=" + category_boundary_block1 +"&last_pressed=" +last_pressed, function(response){});


          //log that they responded
            if (response=='responded'){
                  console.log('RESPONDED')
                  console.log(outcome_done)
                  console.log(colour_eachdot[currenttrial_t])
                  console.log(category_boundary_block1)
                  console.log(choicebutton_side_array[currenttrial_t])
                  console.log(last_pressed)
                //correct.push()
                //need to first change the colour of the outcome circle here based on their choice and the correct answer

                //Changing here now so just putting the outcome border around, but not showing the outcome circle anymore.
                //This doesn't depend on their answer, but we still want to log whether they were correct or not, which does depend on these other things...
                    //Could also work out whether they were correct or not later, but ok to leave here as already set up...
               if (last_pressed=='left'){
                 console.log('getting in last pressed left')
                      if (colour_eachdot[currenttrial_t]>=category_boundary_block1 & choicebutton_side_array[currenttrial_t]==0){
                      //red is on left, they pressed left, correct is red
                        console.log('first_if')
                        correct.push('correct');
                        //highlight correct one, which is red, which is on left
                        document.getElementById("left_choice").style.border="5px solid black"; //need to turn off for next trial...
                        //document.getElementById("outcome_circle").style.background = "green"; //change css of outcome circle here to green

                      } else if (colour_eachdot[currenttrial_t]<category_boundary_block1 & choicebutton_side_array[currenttrial_t]==0){
                    //red is on left, they pressed left, correct is blue (which is on right)
                      console.log('second_if')
                      correct.push('incorrect');
                      document.getElementById("right_choice").style.border="5px solid black";

                    } else if (colour_eachdot[currenttrial_t]<category_boundary_block1 & choicebutton_side_array[currenttrial_t]==1){
                    //red is on right, they pressed left, correct is blue (on left)
                      console.log('third_if')
                      correct.push('correct');
                      document.getElementById("left_choice").style.border="5px solid black";

                    } else if (colour_eachdot[currenttrial_t]>=category_boundary_block1 & choicebutton_side_array[currenttrial_t]==1){
                    //red is on right, they pressed left, correct is red (on right)
                    console.log('fourth_if')
                    correct.push('incorrect');
                    document.getElementById("right_choice").style.border="5px solid black";
                    }

              } else if (last_pressed=='right'){
                console.log('getting in last pressed right')
                console.log(colour_eachdot[currenttrial_t])
                console.log(category_boundary_block1)
                console.log(choicebutton_side_array[currenttrial_t])

                  if (colour_eachdot[currenttrial_t]>=category_boundary_block1 & choicebutton_side_array[currenttrial_t]==0){
                    //red is on left, they pressed right, correct is red (left)
                    console.log('fifth_if')
                    correct.push('incorrect');
                    document.getElementById("left_choice").style.border="5px solid black";

                  } else if (colour_eachdot[currenttrial_t]<category_boundary_block1 & choicebutton_side_array[currenttrial_t]==0){
                  //red is on left, they pressed right, correct is blue (right)
                  console.log('sixth_if')
                  correct.push('correct');
                  document.getElementById("right_choice").style.border="5px solid black";

                } else if (colour_eachdot[currenttrial_t]<category_boundary_block1 & choicebutton_side_array[currenttrial_t]==1){
                  //red is on right, they pressed right, correct is blue (on left)
                  console.log('seventh_if')
                  correct.push('incorrect');
                  document.getElementById("left_choice").style.border="5px solid black";

                } else if (colour_eachdot[currenttrial_t]>=category_boundary_block1 & choicebutton_side_array[currenttrial_t]==1){
                  //red is on right, they pressed right, correct is red (right)
                    console.log('eigth_if')
                    correct.push('correct');
                    document.getElementById("right_choice").style.border="5px solid black";
                  }

                };

                $('#right_choice').show();
                $('#left_choice').show();
                //$('#fourth_div').show()
              };
                // deal with no response
                if(response=='noresp'){
                  console.log('NO RESPONSE')
                  clearInterval(checktime);
                  choicemade_array.push('noresp');
                  console.log(choicemade_array)
                }

                T4 =setTimeout(function() {
                  {currenttrial_t+=1}
                    Proceed('next');
                },outcomebuttonshow_duration); //time to show outcome bar for...
            };

////////////////////////////////////////////////////////////////////////////
//Functions to actually run the trials...

RunTrainingTrial=function(currenttrial_t){
    Isprobetrial=false;
    // trial start time for recording RT
    outcome_done=false; //set so they haven't entered a response yet...
    howlong=0;
    startTrialTime = new Date().getTime();   // trial start time for recording RT
    timeout_needed=true; //setting so that will timeout the sliderbar unless they enter something...
    canRespondslider=false;
    canRespondbuttons=false;
    //show the slider, but it can't be responded to yet...
    $("#outcomebar").hide(); //remove the outcome bar until outcome time
    document.getElementById('participantOffer').innerHTML="placeholder";
    $('#participantOffer').css('color','transparent');
    $('#participantOffer').show(); //remove the text from the top of the slider until they can respond...
    $('#container').show();

    //Timeout for showing moving dots on each trial...
    var T1=setTimeout(function(){
        console.log('moving_dots')
        $('#second_div').hide(); //hiding the instructions...
        console.log('moving_dots_again')
        var ctx=document.getElementById('mycanvas');
        var cW=ctx.width, cH=ctx.height;
        console.log(cW);
        flakes=[];
        addFlake(cW,cH);
        console.log(flakes[1])
        moving_dots(mean_speed, flakes);}
      ,moving_dots_start);

    //Note that used to have other stuff happen here when moving_dots finished,
      //but now have all of this within the same loop within the moving_dots, or
      //else it seems we can get funny problems with the timings...

    //check the time every 100ms and if taking too long, then want to move on to next trial...
        checktime=setInterval(function(){
        //timeout for taking too long to enter on slider...
        var currentTime1 = new Date().getTime();
        howlong = currentTime1 - startTrialTime;
        //console.log('inloop')
          if (howlong-moving_dots_timeout>time_toenterslider && timeout_needed==true && outcome_done==false)
              {save_slideposition();
               document.getElementById('participantOffer').innerHTML="TOO SLOW!!"
               $('#participantOffer').show();
               outcomeslider('noresp');
             };
           }, 100);
    };

//EMMA here- need to disable the slider when they press enter...use canRespondslider==true
//in if statement to turn on and off the slider??

//Function to run what we want for the category boundary trials...
RunBlock1Trial=function(block1trials_t){
  Isprobetrial=false;
  outcome_done=false; //set so they haven't entered a response yet...
  howlong=0; //how long the trial has run for...updating lower down...
  startTrialTime = new Date().getTime();   // trial start time for recording RT
  timeout_needed=true; //setting so that will timeout the sliderbar unless they enter something...
  canRespondslider=false;
  canRespondbuttons=false;
  choice_buttons(); //want the choice buttons to be on screen now for the whole trial...

  //add functions that get called by key presses or button presses
      //add here for the new set up-- look at what Chris had in his...
  //$(document).bind('keyup',Pressedleft); //don't need now that have buttons...
  //$(document).bind('keyup',Pressedright); //don't need now that have buttons...

  //Timeout for showing moving dots on each trial...
      //on the context trials still want to show the moving dots, will just have to make sure we have the correct spread of variables
      //so they can learn the category boundary and we can test the category boundary...
  var T1=setTimeout(function(){
    console.log('moving_dots')
    $('#second_div').hide(); //hiding the instructions
    console.log('moving_dots_again')
    var ctx=document.getElementById('mycanvas');
    var cW=ctx.width, cH=ctx.height;
    console.log(cW);
    flakes=[];
    addFlake(cW,cH);
    console.log(flakes[1])
    moving_dots(mean_speed,flakes);}
    ,moving_dots_start);

  //used to have timeout here for removing canvas on each trial and starting buttons, but all in moving dots or earlier now...

  //check the time every 100ms and if taking too long, then want to move on to next trial...
  checktime=setInterval(function(){
    //timeout for taking too long to enter on slider...
    var currentTime1 = new Date().getTime();
    howlong = currentTime1 - startTrialTime;
    //console.log('inloop')
      if (howlong-moving_dots_timeout>time_toenterslider && timeout_needed==true && outcome_done==false)
          {save_choicebutton();
           document.getElementById('participantOffer').innerHTML="TOO SLOW!!"
           $('#participantOffer').show();
           outcomebuttons('noresp');
         };
       }, 100);
};


//Function to run what we want for the probe trials...
RunProbeTrial=function(currenttrial_t){

  Isprobetrial=true;
  outcome_done=false; //set so they haven't entered a response yet...
  howlong=0;
  startTrialTime = new Date().getTime();   // trial start time for recording RT
  timeout_needed=true; //setting so that will timeout the sliderbar unless they enter something...
  canRespondslider=false;
  canRespondbuttons=false;

  $("#outcomebar").hide(); //remove the outcome bar until outcome time
  document.getElementById('participantOffer').innerHTML="placeholder";
  $('#participantOffer').css('color','transparent');
  $('#participantOffer').show(); //remove the text from the top of the slider until they can respond...
  $('#container').show();
  //Timeout for showing moving dots on each trial...
    var T1=setTimeout(function(){
    console.log('moving_dots_again')
    var ctx=document.getElementById('mycanvas');
    var cW=ctx.width, cH=ctx.height;
    console.log(cW);
    flakes=[];
    addFlake(cW,cH);
    console.log(flakes[1])
    moving_dots(mean_speed, flakes);}
    ,moving_dots_start);

    //Note that used to have other stuff happen here when moving_dots finished,
      //but now have all of this within the same loop within the moving_dots, or
      //else it seems we can get funny problems with the timings...

  //check the time every 100ms and if taking too long, then want to move on to next trial...
    checktime=setInterval(function(){
    //timeout for taking too long to enter on slider...
    var currentTime1 = new Date().getTime();
    howlong = currentTime1 - startTrialTime;
    //console.log('inloop')
      if (howlong-moving_dots_timeout>time_toenterslider && timeout_needed==true && outcome_done==false)
          {save_slideposition();
           document.getElementById('participantOffer').innerHTML="TOO SLOW!!"
           $('#participantOffer').show();
           respondedslider_probetrial('noresp'); ///EMMA CHANGE
         };
       }, 100);
};

//Works out which type of trial we want, and then runs the appropriate function to do that...whether instructions or a trial of a particular type...
  function Proceed(e){
      		// increment the event counter
      		if(e=='next'){currentevent+=1}
      		if(e=='previous'){currentevent-=1}
      		if(currentevent<0){currentevent=0} /*can't go to negative events*/

      		// get the name of the current event
      		eventt=String(event_array[currentevent])
      		console.log('event: ') /*just for us to keep track of where we are...*/
      		console.log(eventt)

      		//// Do current event
      		if (eventt.indexOf('instruct')==0){
      			RunInstruct(eventt);
            $('#button_continue').show()
            $('#button_previous').show()
            $('#instruct').show()
            $('#test_para').hide()
            $('#container').hide()
            $('#fourth_div').hide()
      		} else if (eventt.indexOf('trainingtrial')==0){
      			$('#instruct').hide()
      			$('#button_continue').hide()
      			$('#button_previous').hide()
            $('#second_div').hide()
            $('#container').show() //now we actually want to show the container
            $('#fourth_div').hide()
            console.log('elseif run training')
      			RunTrainingTrial(currenttrial_t); //note that RunTrial needs to call Proceed next when someone responds to slider

          } else if (eventt.indexOf('block1trial')==0){
            $('#instruct').hide()
      			$('#button_continue').hide()
      			$('#button_previous').hide()
            $('#second_div').hide()
            $('#container').hide()
            //$('#fourth_div').show() //now we actually want to show the buttons...but maybe do after we have called the other functions to change the colour and position of the buttons on each trial?
            console.log('elseif run block1')
            RunBlock1Trial(currenttrial_t);

          } else if (eventt.indexOf('probetrial')==0){
            $('#instruct').hide()
            $('#button_continue').hide()
            $('#button_previous').hide()
            $('#second_div').hide()
            $('#container').show() //now we actually want to show the slider here...
            $('#fourth_div').hide()
            console.log('elseif run probe')
            RunProbeTrial(currenttrial_t);
          };
        };
          //this is so we can add summary screens, break screens and end screens later if we want...
          /*else if(eventt.indexOf('summary')==0){
      			RunSummaryScreen();
      		}else if(eventt.indexOf('break')==0){
      			RunBreak();
      		}else if (eventt.indexOf('endscreen')==0){
      			RunEndScreen();
      		}*/

/////////////////////////////////////////////////////////////////////////////////////////////
          //Button pressed functions...
          //Function called whenever there is a 'keyup' event...
            //Need to adjust KeyUp to have something when they are leaving the slider...
          function KeyUp(e){
          console.log('KeyUp entered')
          console.log(canRespondslider)
          console.log(Isprobetrial)
          console.log(e.keyCode)

          //for the responses for the buttons...
          if (canRespondbuttons==true && e.keyCode==39) { //39 is the keycode for right arrow press, need to put in instructions...
              console.log('pressed right')
              last_pressed='right'
              //reaction time
                var currentTime = new Date().getTime();
                var RT = currentTime - startTrialTime;
                reaction_times.push(RT);
              //make choice square flash;
              //making it bigger and adjusting the size of the circle container similtaneously so all fits.
                  ///STILL NEED TO MOVE IT UP AT THE SAME TIME SO DOESN'T JUST GROW AT THE BOTTOM...
              document.getElementById("right_choice").style.height="120px";document.getElementById("right_choice").style.width="20%";
              document.getElementById("circle_container").style.width="59%";
              save_choicebutton();

              //Put the one they chose back to normal size
              var T3=setTimeout(function(){
                document.getElementById("right_choice").style.height="100px";document.getElementById("right_choice").style.width="15%";
                document.getElementById("circle_container").style.width="64%";
                },squareflashtime);

              //As we want to flash what they chose first, we don't want the outcome to happen straight away...
              var T4=setTimeout(function(){
                    outcomebuttons('responded');
                },showsubjectchoicetime);

              timeout_needed=false;

          } else if (canRespondbuttons==true && e.keyCode==37 ) { //37 is the code for left arrow, need to put in instructions...
            console.log('pressed left')
            last_pressed='left'
            //reaction time
              var currentTime = new Date().getTime();
              var RT = currentTime - startTrialTime;
              reaction_times.push(RT);
            save_choicebutton();

            //make choice square flash;
            //making it bigger and adjusting the size of the circle container similtaneously so all fits.
                ///STILL NEED TO MOVE IT UP AT THE SAME TIME SO DOESN'T JUST GROW AT THE BOTTOM...
            document.getElementById("left_choice").style.height="120px";document.getElementById("left_choice").style.width="20%";
            document.getElementById("circle_container").style.width="59%px";

            //Put the one they chose back to normal size
            var T3=setTimeout(function(){
              document.getElementById("left_choice").style.height="100px";document.getElementById("left_choice").style.width="15%";
              document.getElementById("circle_container").style.width="64%";
              },squareflashtime);

            //As we want to flash what they chose first, we don't want the outcome to happen straight away...
            var T4=setTimeout(function(){
                  outcomebuttons('responded');
              },showsubjectchoicetime);

            timeout_needed=false;

          } else if ((e.keyCode==13 || e.which==13) && canRespondslider==true && Isprobetrial==false){
                    console.log('pressed enter: training trial')
                      //reaction time
                        var currentTime = new Date().getTime();
                        var RT = currentTime - startTrialTime;
                        reaction_times.push(RT);
                      save_slideposition();
                      outcomeslider('responded');
                      timeout_needed=false;

          } else if ((e.keyCode==13 || e.which==13) && canRespondslider==true && Isprobetrial==true){
                        console.log('pressed enter: probe trial')
                          //reaction time
                            var currentTime = new Date().getTime();
                            var RT = currentTime - startTrialTime;
                            reaction_times.push(RT);
                          save_slideposition();
                          respondedslider_probetrial('responded');
                          timeout_needed=false;

                        };
          };

          ////////////////////////////////////////////////////////////////////////////////////////////
          //When the website loads, this is the first thing that is called...
            $(document).ready(function(){
                //add functions that get called by key presses or button presses
                    $("#button_continue" ).click(function() {Proceed('next');});
                    $("#button_previous" ).click(function() {Proceed('previous');});
                    //$("#button_left" ).click(function() {ButtonClick('left');});
                    //$("#button_right" ).click(function() {ButtonClick('right');});
                    $(document).bind('keyup',KeyUp); //someone pressed enter??
                  //  $(document).bind('keydown',KeyDown);

                    Proceed('next'); //We want to go to Proceed next as the first thing that happens when we load page...
            });


    // var myclass=function(mycanvas){
    //
    //   myprivatefunction(){
    //
    //   };
    //   return(foo:myprivatefunction);
    // };
    //
    // var obj1=myclass(canvas1);
