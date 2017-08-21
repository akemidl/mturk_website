/*Emma's excellent experiment*/

/*parameters need for expt*/
var canRespond=true
// Counters
var currentevent = 0
var currenttrial_t = 0

/*create event array*/
var total_instruction_screens=6;
var num_trials=5;
var event_array=[];
  for (i = 0; i <total_instruction_screens; i++) {
  	var event_array = event_array.concat('instruct-'+i.toString())
  }
  for (i=0;i<num_trials;i++){
      var event_array=event_array.concat('trial-'+i.toString())
      /*can have different event functions and then call the different functions related to those event types when get to this...*/
  }

  var eventt = event_array[0] //setting this, will use and increment later...
  console.log(event_array)


var mean_speed=50;
var speed_layers=3;
var red_min=1;
var red_max=255;
var blue_min=1;
var blue_max=255;
var context='blah';

/*arrays of variables*/
//50,3,1,255,1,255,'speed'
//here these are practice ones- later will load in text files with a lot more carefully created values...
var mean_speed_array=[30,30,30,30,30]
var speed_array=[517,1598,-850,-562,-1073]
//var red_min_array=[1,50,100,1,150]
var rb_array=[-897,1260,-262,772,-1154] //got these value from Jill's c.txt...
//var blue_min_array=[150,1,100,50,1]
//var blue_max_array=[255,50,150,200,255]
var context_array=['SPEED','COLOUR','SPEED','COLOUR','COLOUR']

var speed_multiplied =[];
 for (i = 0; i <speed_array.length; i++) {
   console.log(mean_speed_array[i])
   console.log(speed_array[i])
   var sm_tmp=(mean_speed_array[i]*speed_array[i]);
   console.log(sm_tmp)
   speed_multiplied.push(sm_tmp)
 };
//want to position the outcome bar so that it is the distance along that is the %of the range of speed or colour...
//var speed_range=math.max(speed_multiplied)-math.min(speed_multiplied) //need to fix this to proper value when actually make the proper speed and colour ranges...

//need to think about how to measure blueness and redness....
var colour_range=0.2; //difficulty measure...
var colour_spread=20; //std dev of Gaussian from which colour for individual dots is drawn...
var sspread=0.1; //std dev of Gaussian from which speed for individual dots is drawn...
var position_outcomebar_array=[]
var colour_position=[];
var speed_position=[];
for (i = 0; i <num_trials; i++) {
  var colour_tmp=(0.5+rb_array[i]*0.5*colour_range/1000); //need to make into actual proper values now...
  //console.log(speed_range)
  //console.log(speed_multiplied[i])
  console.log(colour_tmp)
  console.log(speed_array[i])
  //var speed_tmp=(speed_multiplied[i]-math.min(speed_multiplied))*100/speed_range; //want as percentage...
  var speed_tmp=1.5+speed_array[i]/2000;
  console.log(speed_tmp)
  colour_position.push(colour_tmp); //actually probably want to set these and then work back to what the colour and speed values will be...
  speed_position.push(speed_tmp);
  console.log(speed_position)
  if (context_array[i]=='SPEED'){position_outcomebar_array.push(colour_tmp)}
  else if (context_array[i]=='COLOUR'){position_outcomebar_array.push(speed_tmp)}
};

//Timings
var min_decisionlim = 250  // question mark comes up (don't actually need this here...)
var decisionlim = 6000 // no response
var ITI = 3000
var startTrialTime = 0;



var slider=function(){
  console.log('in_slider')
  $("#outcomebar").hide(); //hide this till we want to show the outcome...
  $("#slider").css("left","100%");  //reset position for slidebar...
  $('#second_div').hide();
  $('#container').show();
  //$("#slider").draggable('enable');
  $("#slider").draggable({containment: "#slidebar",axis: "x", scroll: false, disabled: false,
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

    $("#slider").draggable("option",{disabled:true});
      save_slideposition();
    outcome();

  };



  var moving_dots=function(mean_speed,speed_layers,red_min,red_max,blue_min,blue_max){
    $('#first_div').hide();
    $('#second_div').hide();
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
            /*making a square of the falling dots*/
            /*var x=Math.floor((cW/2-cH/4)+Math.random()*cH/2);*/
            /*var x=Math.floor(Math.random()*2*cW/4+cW/4); */ /*want to randomise this between 1 and canvas width*/
            //console.log(currenttrial_t)
            //console.log(colour_position[currenttrial_t])
            var x=Math.floor(Math.random() * cW) + 1;
            var y=cH/4;
            //var s=Math.floor(Math.random()*speed_layers+1); /*speed- random between 1 and 3- 3 layers of depth for these particles- 3 different speed we can set. Need to change if want a whole range...*/
            console.log(speed_position[currenttrial_t])
            var s=(speed_position[currenttrial_t]+sspread*speed_position[currenttrial_t]*Math.sqrt(-2*Math.log(Math.random()))*Math.cos(2*Math.PI*Math.random()));
            var rc=Math.round(255*colour_position[currenttrial_t]+colour_spread*Math.sqrt(-2*Math.log(Math.random()))*Math.cos(2*Math.PI*Math.random()));
            console.log(s)
            if (rc>255){rc=255};
            if (rc<0){rc=0};
            //console.log(rc)
            //var rc=Math.floor(Math.random()*red_max+red_min); /*red color-want it to be between 1 and 255 at the moment...*/
            var rb=255-rc; /*blue color-want it to be between 1 and 255 at the moment...*/
            //console.log(rb)
            var rot=Math.random();
            var ang=Math.floor(Math.random()*2+1); /*how much moving in x direction as well? Can change overall angle?*/
          flakes.push({"x":x,"y":y,"s":s,"rc":rc, "rb":rb, "rot":rot, "ang":ang});
        }; /*for addFlake*/

        /* we want to now loop over the flakes array to make the snowflakes move down screen by changing y value */
        function snow (){
          addFlake(); /*change the density of flakes by how many of these you do*/
          addFlake();
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

              /*remove snowflakes after move off canvas*/
              /*can change to remove after a certain random time period...*/
              /*or remove if they go outside certain area...*/
              if ( flakes[i].y>3*cH/4) {
                flakes.splice(i,1); /*removes one item (element i) from array*/
              } /*for if loop*/

            } /*for for loop*/
          } /*for snow*/

      function animate(){
        ctx.save(); /*saving the last image in the animation stack*/
        ctx.clearRect(0,0,cW,cH); /*Without this the snow just fills up the window.note that if have this in, seem to be able to change the size of the window flexibly...*/
        /*ctx.drawImage(bg,0,0);*/

        clipCanvas(); /*everything draw after this will now be clipped into the circle*/
        /*ctx.fillStyle="red";ctx.fillRect(0,0,cW,cH);*/ /*If have this and don't have the clear rectangle then still works???*/
        /*ctx.rotate(0.3); *//*can rotate where the snow about to put in is falling. BUT, also need to change where it comes in and leaves...*/
        snow(); /*can do this for each particle to get moving in lots of different directions?*/
        /*addCircularBackground();*/
        ctx.restore(); /*restoring the last image of the animation stack...*/

      }; /*for animate function*/

      var animateInterval=setInterval(animate,mean_speed); /*can change this interval to get them falling faster or slower overall...*/

      setTimeout(function(){clearInterval(animateInterval);}, 7000);

      }; /*for initCanvas*/

      /*window.addEventListener('load',function(event)
        {*/
          initCanvas();
        /*});*/


      };

var slideposition_array=[];
var save_slideposition=function(){
  var sliderposition_tmp=$("#slider").position();
  slideposition_array.push(sliderposition_tmp);
};



var outcome=function(){
    console.log(speed_multiplied)
    console.log(colour_position)
    console.log(speed_position)
    console.log(position_outcomebar_array[currenttrial_t])
    var left_pos=position_outcomebar_array[currenttrial_t]+"%"
    $("#outcomebar").css("left",left_pos) //position_outcomebar_array[currenttrial_t] need to turn this into a value...
    $("#outcomebar").show();
    //$("#slider").draggable('disable');
};


Context_screen=function(context){
    if (context=='COLOUR')
      /*{function fColour()*/ {
      console.log('getting_inCOLOUR')
      document.getElementById('test_para').innerHTML="COLOUR";

      $('#test_para').show();}

    else if (context=='SPEED')

      /*{function fSpeed()*/ {
      console.log('getting_inSPEED')
      document.getElementById('test_para').innerHTML="SPEED";
      $('#test_para').show();}
    };


/*key press function*/

/*Run the context screen and the motion dots inputting the parameters we need for that trial from array*/
RunTrial=function(currenttrial_t){
    mean_speed=mean_speed_array[currenttrial_t]
    speed_layers=speed_array[currenttrial_t]
    //red_min=red_min_array[currenttrial_t]
    //red_max=red_max_array[currenttrial_t]
    //blue_min=blue_min_array[currenttrial_t]
    //blue_max=blue_max_array[currenttrial_t]
    context=context_array[currenttrial_t]

  // trial start time for recording RT
  startTrialTime = new Date().getTime();

    //add functions that get called by key presses or button presses
    /*$(document).bind('keyup',Pressedleft);
    $(document).bind('keyup',Pressedright);*/
    $("#button_continue" ).click(function() {
    Proceed('next'); //will go to the next instruction page...
    });
    $("#button_previous" ).click(function() {
    Proceed('previous'); //will go to the previous instruction page...
    });

    $('#test_button').hide();
    $('#test_para').hide();
    var T0=setTimeout(function(){console.log(context)
      Context_screen(context);},1000);

    var T1=setTimeout(function(){
      console.log('moving_dots')
      $('#test_para').hide();
      var canv = document.createElement('canvas');
      canv.id = 'mycanvas';
      //document.body.appendChild(canv);
      var objTo = document.getElementById('third_div');
      objTo.appendChild(canv);
      $('#mycanvas').css("width", "80%", "height","40%"); //"background","#036", "border","blue 5px solid","background-color", "red","border-radius", "300px"
      moving_dots(mean_speed,speed_layers,red_min,red_max,blue_min,blue_max);}
      ,2500);

    var T2=setTimeout(function(){var oldcanv = document.getElementById('mycanvas'); oldcanv.remove(); $('#first_div').show();
        $('#second_div').show();},5000);
    var T3=setTimeout(function(){slider();},5500); //Need to save value of left or xposition for slider here...


    //need to remove this when have enter thing working...
    var T4=setTimeout(function(){
                          save_slideposition();
                          outcome();}, 10000) //save the slider position and show outcome- maybe make it to do on keypress of enter?




    /*var T4=setTimeout(function(){
      console.log('proceed_next_runtrial')
      Proceed('next');},13000); *///will change this to have happen when input result from slider...
    /*on participant response, hide slider
    Call function that matches key press- if enter, then record response, hide container...*/


    /* that then calls a function to Proceed- go to next event- in array*/

    // Set trial time out for no response
    	var timeout1 = setTimeout(function() {
    		//$('#noresp').show();
    		Outcome('noresp');
    	},20000);
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
          $('#test_para').hide()
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




/*Don't need these now??
    function Pressedleft(e) {
    	if (canRespond==true && e.keyCode==90 ) {
    		Outcome('left')
    	}
    }

    function Pressedright(e) {
    	if (canRespond==true && e.keyCode==77) {
    		Outcome('right')
    	}
    }

*/


function Outcome(response){
	// cancel previous timeout for no response
	/*clearTimeout(timeout1)*/ //need this or not??

	// deal with no response
	if(response=='noresp'){
		console.log('NO RESPONSE')
  }

	// get RT
		var currentTime = new Date().getTime();
		var RT = currentTime - startTrialTime;

	//// Wait some more before going to next trial
	timeout4 = setTimeout(function() {
    {currenttrial_t+=1}
			Proceed('next');
	},2000);

}


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
        /*$(document).bind('keyup',Pressedleft);
        $(document).bind('keyup',Pressedright);*/
        $("#button_continue" ).click(function() {Proceed('next');});
        $("#button_previous" ).click(function() {Proceed('previous');});
        $(document).bind('keyup',Enter_slider);


        Proceed('next');



      /*RunTrial(50,3,1,255,1,255,'speed');*/

});
