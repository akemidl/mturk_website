
html_for_pairwise = function(pair,profile_chart_img_path,self_describe,sat_grade,opening_instructions,if_you=false){

	if (if_you){
		pair[0]='You'
	}

	var opening_div =opening_instructions+'<hr width:100%></div>'+
		'<div style="display: table;">'

	var table_div = '<div style="display: table-row">'

	var left_div =
	'<div id="stim_left" style="display: table-cell;width:45%;padding:2.5%;font-size:12;line-height:120%">'+
	'<p style="font-size:18">Candidate: '+pair[0]+'</p>'+
	'<img src='+profile_chart_img_path[0]+' style="max-height: 300px; max-width: 300px;">'+
	'<p>Description: '+self_describe[0]+'</p>'+
	'<p>Grades:</p>'+
	'<ul>'+
	'<li>Reading: '+sat_grade[0][0]+'</li>'+
	'<li>Math: '+sat_grade[0][1]+'</li>'+
	'<li>Writing: '+sat_grade[0][2]+'</li>'+
	'<li>Class 1: '+sat_grade[0][3]+'</li>'+
	'<li>Class 2: '+sat_grade[0][4]+'</li>'+
	'<li>Class 3: '+sat_grade[0][5]+'</li>'+
	'</ul>'+
	'</div>'

	var right_div =
	'<div id="stim_right" style="display: table-cell;width:45%;padding:2.5%;font-size:12;line-height:120%">'+
	'<p style="font-size:18">Candidate: '+pair[1]+'</p>'+
	'<img src='+profile_chart_img_path[1]+' style="max-height: 300px; max-width: 300px;">'+
	'<p>Description: '+self_describe[1]+'</p>'+
	'<p>Grades:</p>'+
	'<ul>'+
	'<li>Reading: '+sat_grade[1][0]+'</li>'+
	'<li>Math: '+sat_grade[1][1]+'</li>'+
	'<li>Writing: '+sat_grade[1][2]+'</li>'+
	'<li>Class 1: '+sat_grade[1][3]+'</li>'+
	'<li>Class 2: '+sat_grade[1][4]+'</li>'+
	'<li>Class 3: '+sat_grade[1][5]+'</li>'+
	'</ul>'+
	'</div>'

	var div_close= '</div></div>'
	var stim = opening_div+table_div+left_div+right_div+div_close
	/*
	if (include_opening_div){
			var stim = opening_div+left_div+right_div
	}else{
			var stim = left_div+right_div
	}
	*/

	return(stim)
}

select_left = function(){
				console.log('registering extra key 1')
				$( "#stim_left" ).css( "border", "3px solid black" );
				$( "#stim_right" ).css( "border", "none" );
			};
select_right = function(){
			console.log('registering extra key 2')
			$( "#stim_right" ).css( "border", "3px solid black" );
			$( "#stim_left" ).css( "border", "none" );
		};
