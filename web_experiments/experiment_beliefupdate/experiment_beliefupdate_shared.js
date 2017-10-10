
html_for_pairwise = function(pair,profile_chart_img_path,self_describe,sat_grade,opening_instructions='',if_you=false,include=1234){
	pair0 = pair[0]
	pair1 = pair[1] // so I don't modify in the function
	console.log(if_you)

	// if I'm putting in a person.
	if (typeof if_you =='string'){
		pair0=if_you
	}

	if (if_you==true){
		pair0='You'
		console.log('here')
	}else{
		pair0 = 'Candidate '+pair0
	}

	pair1 = 'Candidate '+pair1

	var opening_div =opening_instructions+'<hr width:100%></div>'+
		'<div style="display: table; width:100%">'

	var table_div = '<div style="display: table-row">'

	var left_div1 =
	'<div id="stim_left" style="display: table-cell;width:45%;padding:2.5%;font-size:12;line-height:120%">'+
	'<p style="font-size:18">'+pair0+'</p>'
	var left_div2 =
	'<img src='+profile_chart_img_path[0]+' style="max-height: 300px; max-width: 300px;">'
	var left_div3 =
	'<p>'+self_describe[0].padEnd(500,' ')+'</p>'
	var left_div4 =
	'<div class="table" style="display: table;">'+
	'<div class="row" style="display: table-row">'+
	'<div class="cell" style="display: table-cell">Reading: </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[0][0]+'</div></div>'+
  '<div class="row" style="display: table-row">'+
	'<div class="cell" style="display: table-cell">Math: </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[0][1]+'</div></div>'+
	'<div class="row" style="display: table-row">'+
	'<div class="cell" style="display: table-cell">Writing: </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[0][2]+'</div></div>'+
	'</div>'+
	'<div class="table" style="display: table;">'+
	'<div class="row" style="display: table-row">'+
	'<div class="cell" style="display: table-cell">Class 1: </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[0][3].split(':')[0]+' </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[0][3].split(':')[1]+' </div></div>'+
  '<div style="display: table-row">'+
	'<div class="cell" style="display: table-cell">Class 2: </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[0][4].split(':')[0]+' </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[0][4].split(':')[1]+' </div></div>'+
	'<div class="row" style="display: table-row">'+
	'<div class="cell" style="display: table-cell">Class3: </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[0][5].split(':')[0]+' </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[0][5].split(':')[1]+' </div></div>'+
	'</div>'
	if (include==1234){
		var left_div = left_div1+left_div2+left_div3+left_div4+'</div>'
	}
	if (include==123){
		var left_div = left_div1+left_div2+left_div3+'</div>'
	}
	if (include==12){
		var left_div = left_div1+left_div2+'</div>'
	}
	if (include==124){
		var left_div = left_div1+left_div2+left_div4+'</div>'
	}
	if (include==1){
		var left_div = left_div1+'</div>'
	}


	var right_div1 =
	'<div id="stim_right" style="display: table-cell;width:45%;padding:2.5%;font-size:12;line-height:120%">'+
	'<p style="font-size:18">'+pair1+'</p>'
	var right_div2 =
	'<img src='+profile_chart_img_path[1]+' style="max-height: 300px; max-width: 300px;">'
	var right_div3 =
	'<p>'+self_describe[1]+'</p>'
	var right_div4 =
	'<div class="table" style="display: table;">'+
	'<div class="row" style="display: table-row">'+
	'<div class="cell" style="display: table-cell">Reading: </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[1][0]+'</div></div>'+
  '<div class="row" style="display: table-row">'+
	'<div class="cell" style="display: table-cell">Math: </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[1][1]+'</div></div>'+
	'<div class="row" style="display: table-row">'+
	'<div class="cell" style="display: table-cell">Writing: </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[1][2]+'</div></div>'+
	'</div>'+
	'<div class="table" style="display: table;">'+
	'<div class="row" style="display: table-row">'+
	'<div class="cell" style="display: table-cell">Class 1: </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[1][3].split(':')[0]+' </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[1][3].split(':')[1]+' </div></div>'+
  '<div style="display: table-row">'+
	'<div class="cell" style="display: table-cell">Class 2: </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[1][4].split(':')[0]+' </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[1][4].split(':')[1]+' </div></div>'+
	'<div class="row" style="display: table-row">'+
	'<div class="cell" style="display: table-cell">Class3: </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[1][5].split(':')[0]+' </div>'+
	'<div class="cell" style="display: table-cell"> '+sat_grade[1][5].split(':')[1]+' </div></div>'+
	'</div>'+
	'</div>'
	if (include==1234){
		var right_div = right_div1+right_div2+right_div3+right_div4+'</div>'
	}
	if (include==123){
		var right_div = right_div1+right_div2+right_div3+'</div>'
	}
	if (include==12){
		var right_div = right_div1+right_div2+'</div>'
	}
	if (include==124){
		var right_div = right_div1+right_div2+right_div4+'</div>'
	}
	if (include==1){
		var right_div = right_div1+'</div>'
	}

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
