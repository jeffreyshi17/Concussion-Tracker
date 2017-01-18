$(function() {
     $( "#MH_0_0" ).datepicker({ dateFormat: 'yy-mm-dd'}); 
});


function Submit (){

var save = '{"title": "Menstrual Tracker",';

save+= '"date": "';
save+= new Date();
save += '", "answers": [';
var body = document.getElementsByTagName('input');
for(var i = 0; i < body.length; i++){
	if(body[i].checked == true){
		save +='{"id": "'+ body[i].id +'","answer": "Yes"},';
	}
	if(body[i].type == "text"){
		save +='{"id": "'+ body[i].id +'","answer": "' + body[i].value +'"},';
	}
}
save = save.substring(0, save.length - 1);
save += ']}';
for(var i = 0; i < 10000; i++){
	if(localStorage.getItem("json"+i) === null){
		localStorage.setItem('json'+i, save);
		break;
	}
	
}

	
}
function display(){
	var text = '<div class="container theme-showcase" role="main"> <div class="page-header"><h1>Menstrual Tracker Results</h1></div> <div class ="row"> <div class = "col-md-6"> <table class = "table" > <thead> <tr> <td>Date</td> <td>Last Period</td> <td>Menopausal</td> <td>Oral contraceptives</td> <td>Missed Periods</td> <td>Period Description</td> </tr> </thead> <tbody>';
	for(var i = 0; i< localStorage.length; i++){
		var json = JSON.parse(localStorage.getItem(localStorage.key(i)));
		text+= '<tr>';
		text+='<td>'+ json.date+'</td>';
		for(var j = 0; j < json.answers.length; j++){
			text +='<td>'+ json.answers[j].answer+'</td>';
		}
		text+= "</tr>";
	}
	text += '</tbody> </table> </div> </div> </div> </BODY> </HTML>';
	document.body.innerHTML  = text;
}
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('submit').addEventListener('click', Submit);
	document.getElementById('display').addEventListener('click', display);
});


