function display(){
	var text = '<div class="container theme-showcase" role="main"> <div class="page-header"><h1>Menstrual Tracker Results</h1></div> <div class ="row"> <div class = "col-md-6"> <table class = "table" > <thead> <tr> <td>Date</td> <td>Last Period</td> <td>Menopausal</td> <td>Oral contraceptives</td> <td>Missed Periods</td> <td>Period Description</td> </tr> </thead> <tbody>';
	for(var i = 0; i< localStorage.length; i++){
		var json = JSON.parse(localStorage.getItem(localStorage.key(i)));
		if(typeof json.title != "undefined" && json.title == "Menstrual Tracker" ){
			text+= '<tr>';
			text+='<td>'+ json.date+'</td>';
			
				for(var j = 0; j < json.answers.length; j++){
					text +='<td>'+ json.answers[j].answer+'</td>';
				}
			
			text+= "</tr>";
		}
	}
	text += '</tbody> </table> </div> </div> </div> </BODY> </HTML>';
	document.getElementById("menstrual_tracker").innerHTML = text;
}

document.addEventListener('DOMContentLoaded', function() {
	display();
});
