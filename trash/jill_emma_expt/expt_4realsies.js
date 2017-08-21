/*Emma's excellent experiment*/

/*parameters need for expt*/
var outcome_done=false;
var canRespond=true //can set this so only true when in loop for slider...
// Counters
var currentevent = 0
var currenttrial_t = 0
var checktime=setInterval(function(){},100);
/*create event array*/
var total_instruction_screens=6;
var num_trials=10;
var reaction_times=[];
var event_array=[];
  for (i = 0; i <total_instruction_screens; i++) {
  	var event_array = event_array.concat('instruct-'+i.toString())
  }
  for (i=0;i<num_trials;i++){
      var event_array=event_array.concat('trial-'+i.toString())
      /*can have different event functions and then call the different functions related to those event types when get to this...*/
  }

  //changed here
  var minlife=10;
  var maxlife=60;
  var liferange=maxlife-minlife;

  var eventt = event_array[0] //setting this, will use and increment later...
  console.log(event_array)

var ii=0; //the variable to remove random flakes at the same speed as adding them...
var mean_speed=30; //how fast reanimate...
var context='blah';

/*arrays of variables*/
//define rb_array, context_array and speed_array in linked .js files...

//want to position the outcome bar so that it is the distance along that is the %of the range of speed or colour...
//var speed_range=math.max(speed_multiplied)-math.min(speed_multiplied) //need to fix this to proper value when actually make the proper speed and colour ranges...

var colour_difficulty=0.2; //difficulty measure...
var colour_spread=20; //std dev of Gaussian from which colour for individual dots is drawn...
var sspread=0.1; //std dev of Gaussian from which speed for individual dots is drawn...
var position_outcomebar_array=[];
var colour_eachdot=[];
var speed_eachdot=[];
for (i = 0; i <num_trials; i++) {
  var colour_tmp=(0.5+rb_array[i]*0.5*colour_difficulty/1000); //transforming the input from rb_array
  var speed_tmp=1.5+speed_array[i]/2000; //transforming the input from speed_array
  /*console.log(speed_array[i])
  console.log(rb_array[i])
  console.log(speed_tmp)
  console.log(colour_tmp)*/
  //console.log(speed_eachdot)
  colour_eachdot.push(colour_tmp); //actually probably want to set these and then work back to what the colour and speed values will be...
  speed_eachdot.push(speed_tmp);
};

//need to work out what proportion of the way along colour spectrum we are with colour tmp...
var colour_range=math.max(colour_eachdot)-math.min(colour_eachdot);
var speed_range=math.max(speed_eachdot)-math.min(speed_eachdot);

console.log(colour_range);
console.log(speed_range);
console.log(speed_eachdot);
console.log(colour_eachdot);
console.log(math.min(colour_eachdot));
console.log(math.min(speed_eachdot));
for (i=0;i<num_trials;i++){
  var outcome_position_speed_tmp=(speed_eachdot[i]-math.min(speed_eachdot))*100/speed_range; //
  var outcome_position_colour_tmp=(colour_eachdot[i]-math.min(colour_eachdot))*100/colour_range;//
  console.log(outcome_position_speed_tmp);
  console.log(outcome_position_colour_tmp);
  if (context_array[i]=='SPEED'){position_outcomebar_array.push(outcome_position_speed_tmp)} //saving where we are in colour spectrum to show outcome later...
  else if (context_array[i]=='COLOUR'){position_outcomebar_array.push(outcome_position_colour_tmp)} //saving where we are in speed spectrum to show outcome later...
};

//Timings- might not need all of these??
var decisionlim = 8000 // no response
var ITI = 3000
var startTrialTime = 0;
var contextscreen_start=1000; //how long after trial starts the context screen is started...
var moving_dots_start=3000;
var moving_dots_timeout=7000;
var time_toenterslider=5000; //how long they have to enter their choice on the slider on each trial before timeout...
var outcomebarshow_duration=2000; //how long to show the outcome bar for...
var howlong=0;

var slider=function(){
  console.log('in_slider')
  $("#outcomebar").css("left","0%"); //reset so we can reposition later...just trying, not sure if needed...
  $("#outcomebar").hide(); //hide this till we want to show the outcome...
  $("#slider").css("left","0%");  //reset position for slidebar...
      /*if (context=='COLOUR'){
        document.getElementById('leftofslider_text').innerHTML="red"; //might be other way around and therefore may need to change later...
        document.getElementById('rightofslider_text').innerHTML="blue";
        $('#leftofslider_text').show();
        $('#rightofslider_text').show();
      };
      if (context=='SPEED'){
        console.log('speed trial')
        document.getElementById('leftofslider_text').innerHTML="slow"; //might be other way around and therefore may need to change later...
        document.getElementById('rightofslider_text').innerHTML="fast";
        $('#leftofslider_text').show();
        $('#rightofslider_text').show();
      };*/
  $('#container').show();
  $("#slider").draggable({containment: "#slidebar",axis: "x", scroll: false, disabled: false, //might not need scroll:false...the axis:"x" just contrains movement in x axis?
     drag: function() {
         var position = $(this).position();
         var xPos = position.left;
         $('#participantOffer > span').text(xPos);
    }
  });
};

function Enter_slider(e){
  console.log('pressed_enter')
  if ((e.keyCode==13 || e.which==13) && canRespond==true)
      //reaction time
        var currentTime = new Date().getTime();
        var RT = currentTime - startTrialTime;
        reaction_times.push(RT);
      $("#slider").draggable("option",{disabled:true});
      save_slideposition();
      outcome('responded');
      timeout_needed=false;
  };

var moving_dots=function(mean_speed){
    console.log('here')
      /*want to initialise the canvas and create variables related to it to use dimensions below...*/
      function initCanvas(){
        var ctx=document.getElementById('mycanvas').getContext('2d');
        var cW=ctx.canvas.width, cH=ctx.canvas.height;
        /*cut canvas to be a circle*/
        var radius_canvas=Math.min(cW/4,cH/4);
          function clipCanvas(){
            ctx.beginPath();
            ctx.arc(ctx.canvas.width/2,ctx.canvas.height/2,radius_canvas,0,Math.PI*2, false);
            ctx.clip();
          };

        var flakes=[];
      /*pushing a new snowflake to the flakes array*/
        function addFlake(){
            //console.log(currenttrial_t)
            //console.log(colour_eachdot[currenttrial_t])
              //console.log(speed_eachdot[currenttrial_t])
            var x=Math.floor(Math.random() * cW) + 1;
            var y=cH/4;
            var s=(speed_eachdot[currenttrial_t]+sspread*speed_eachdot[currenttrial_t]*Math.sqrt(-2*Math.log(Math.random()))*Math.cos(2*Math.PI*Math.random()));
            var rc=Math.round(255*colour_eachdot[currenttrial_t]+colour_spread*Math.sqrt(-2*Math.log(Math.random()))*Math.cos(2*Math.PI*Math.random()));
              if (rc>255){rc=255}; //colour must be between 0-255
              if (rc<0){rc=0};
            //console.log(s); console.log(rc);

            var rb=255-rc; /*blue color-want it to be between 1 and 255 at the moment...*/
            var rot=Math.random(); //not making them go in different direction at the moment but could do later if we wanted to...
            var ang=Math.floor(Math.random()*2+1); /*how much moving in x direction as well? Can change overall angle?*/
            var ext=Math.round(Math.random()*liferange)+minlife; //setting lifetime for flake between minlife and maxlife...

          flakes.push({"x":x,"y":y,"s":s,"rc":rc, "rb":rb, "rot":rot, "ang":ang, "ext":ext}); //
          console.log(flakes[1].ext);
        }; /*for addFlake*/

        /* we want to now loop over the flakes array to make the snowflakes move down screen by changing y value */
        function snow (){
          //if (flakes.length<80)
          //{ --note that I was trying to only add if below certain number so density wouldn't increase too much. But, seems to then make them come in ripples...
          addFlake(); /*change the density of flakes by how many of these you do*/
          addFlake();
          addFlake();
          addFlake();
          //};
            for(var i=0; i<flakes.length; i++){
              ctx.fillStyle="rgba(" +flakes[i].rc + ",0," +flakes[i].rb + ",0.75)" /*makes it white and opaque*/
              /*ctx.rotate(flakes[i].rot);*/ /*this makes them move wildly*/
              ctx.beginPath(); /*start a new arc shape for each snowflake*/

              /*arc is for drawing a circle here for a snowflake...*/
              /*arc(x,y,radius,startAngle,endAngle (these are for how you draw them),anticlockwise)*/

              /*note that changing the number you multiply y by also changes the speed, so could make this a variable to change for different ones...*/

              /*does this update the variables stored in flakes and how??*/
              /*flakes[i].x+=flakes[i].ang*/
              ctx.arc(flakes[i].x,flakes[i].y+=flakes[i].s, 2,0,Math.PI*2, false); /*adding to the y position to get downwards movement*/
              ctx.closePath();
              ctx.fill(); /*or could use .fillRect() but it needs 4 inputs...*/

              flakes[i].ext-=1; //could change how fast they die based on speed??
              console.log(flakes[1].ext);

              /*remove snowflakes after move off canvas*/
              /*can change to remove after a certain random time period...*/
              /*or remove if they go outside certain area...*/
              if ( flakes[i].y>3*cH/4) {
                flakes.splice(i,1); /*removes one item (element i) from array*/
                //what we actually want is to add another flake for every flake we take off the screen as it's gone of the edge...
                //then should have same number of flakes on screen for all speeds??
                addFlake();
              } /*for if loop*/

             if (flakes[i].ext<=0) //deal with flakes that have died from old age...
                {flakes.splice(i,1);
                  console.log('spliced');
                 } //for if loop

            } /*for for loop*/

            //try removing 4 flakes at the same time as adding 4 flakes at the top, so it's not getting more densely populated by flakes as time goes on...
            /*ii=Math.round(Math.random()*flakes.length);
            console.log(ii)
            flakes.splice(ii,1);
            ii=Math.round(Math.random()*flakes.length);
            console.log(ii)
            flakes.splice(ii,1);
            ii=Math.round(Math.random()*flakes.length);
            console.log(ii)
            flakes.splice(ii,1);
            ii=Math.round(Math.random()*flakes.length);
            console.log(ii)
            flakes.splice(ii,1);*/

          } /*for snow*/

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
      setTimeout(function(){clearInterval(animateInterval);}, moving_dots_timeout); //need this here???
    }; /*for initCanvas*/
          initCanvas();
}; /* for moving_dots*/

var slideposition_array=[];
var save_slideposition=function(){
  var sliderposition_tmp=$("#slider").position();
  slideposition_array.push(sliderposition_tmp);
};

//when press enter for slide position- calls this to show where the outcome is...
var outcome=function(response){
    outcome_done=true;
    console.log(outcome_done)
    console.log(position_outcomebar_array[currenttrial_t])
    var left_pos=position_outcomebar_array[currenttrial_t]+"%"
    $("#outcomebar").css("margin-left",left_pos) //position_outcomebar_array[currenttrial_t] need to turn this into a value...
    $("#outcomebar").show();

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

Context_screen=function(context){
    if (context=='COLOUR')
      /*{function fColour()*/ {
      console.log('getting_inCOLOUR')
      document.getElementById('test_para').innerHTML="COLOUR";
      document.getElementById('leftofslider_text').innerHTML="red"; //might be other way around and therefore may need to change later...
      document.getElementById('rightofslider_text').innerHTML="blue";
      $('#test_para').show();}
    else if (context=='SPEED')
      /*{function fSpeed()*/ {
      console.log('getting_inSPEED')
      document.getElementById('test_para').innerHTML="SPEED";
      document.getElementById('leftofslider_text').innerHTML="slow"; //might be other way around and therefore may need to change later...
      document.getElementById('rightofslider_text').innerHTML="fast";
      $('#test_para').show();}
    };

/*Run the context screen and the motion dots inputting the parameters we need for that trial from array*/
RunTrial=function(currenttrial_t){
    // trial start time for recording RT
    outcome_done=false;
    var currentTime1=0;
    var howlong=0;
    startTrialTime = new Date().getTime();
    timeout_needed=true; //setting so that will timeout the sliderbar unless they enter something...
    //add functions that get called by key presses or button presses
    /*$(document).bind('keyup',Pressedleft);
    $(document).bind('keyup',Pressedright);*/
    $("#button_continue" ).click(function() {
    Proceed('next'); //will go to the next instruction page...
    });
    $("#button_previous" ).click(function() {
    Proceed('previous'); //will go to the previous instruction page...
    });

    //$('#test_para').hide(); //maybe don't need this?

    //Timeout for showing context screen on each trial...
    var T0=setTimeout(function(){console.log(context_array[currenttrial_t])
      $('#second_div').show(); Context_screen(context_array[currenttrial_t]);},contextscreen_start);

    //Timeout for showing moving dots on each trial...
    var T1=setTimeout(function(){
      console.log('moving_dots')
      $('#second_div').hide();
      var canv = document.createElement('canvas');
      canv.id = 'mycanvas';
      var objTo = document.getElementById('third_div');
      objTo.appendChild(canv);
      $('#mycanvas').css("width", "80%", "height","40%"); //"background","#036", "border","blue 5px solid","background-color", "red","border-radius", "300px"
      moving_dots(mean_speed);}
      ,moving_dots_start);

    //Timeout for removing the canvas when moving dots finishes on each trial and starting slider...
    var T2=setTimeout(function(){var oldcanv = document.getElementById('mycanvas'); oldcanv.remove();
        document.getElementById('participantOffer').innerHTML="Drag slider using mouse and press enter to save choice";
        slider();
        }
        ,moving_dots_timeout);

    //check the time every 100ms and if taking too long, then want to move on to next trial...
    checktime=setInterval(function(){
      //timeout for taking too long to enter on slider...
      var currentTime1 = new Date().getTime();
      var howlong = currentTime1 - startTrialTime;
      console.log('inloop')
        if (howlong-moving_dots_timeout>time_toenterslider && timeout_needed==true && outcome_done==false)
            {save_slideposition();
             document.getElementById('participantOffer').innerHTML="TOO SLOW!!"
             $('#participantOffer').show();
             outcome('noresp');
           };
         }, 100);
  };

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
    		} else if (eventt.indexOf('trial')==0){
    			$('#instruct').hide()
    			$('#button_continue').hide()
    			$('#button_previous').hide()
          $('#second_div').hide()
          $('#container').hide()

    			RunTrial(currenttrial_t); //note that RunTrial needs to call Proceed next when someone responds to slider
    			}
    		}
        //this is so we can add summary screens, break screens and end screens later if we want...
        /*else if(eventt.indexOf('summary')==0){
    			RunSummaryScreen();
    		}else if(eventt.indexOf('break')==0){
    			RunBreak();
    		}else if (eventt.indexOf('endscreen')==0){
    			RunEndScreen();
    		}*/


/////////////////// INTRUCTIONS //////////////////////////////
function RunInstruct(event){
	var currentnumber = parseInt(event.split('-')[1])// get number
	console.log(currentnumber)


    //// Welcome Screen
    	if(currentnumber==1){

    		document.getElementById('instruct').innerHTML='<p>Welcome to the experiment!</p><p>In this study you will...</p>'
    		$('#button_previous').hide();
    		$('#button_continue').show();
    		$('#fixation').hide();


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
    }


$(document).ready(function(){
    //add functions that get called by key presses or button presses
        $("#button_continue" ).click(function() {Proceed('next');});
        $("#button_previous" ).click(function() {Proceed('previous');});
        $(document).bind('keyup',Enter_slider);

        Proceed('next');
});
