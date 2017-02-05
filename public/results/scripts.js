function displayMT(){
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
function displayS(){
	for(var i = 0; i< localStorage.length; i++){
		if(localStorage.getItem(localStorage.key(i)).substring(11,26) == "Symptom Tracker"){
			var json = JSON.parse(localStorage.getItem(localStorage.key(i)));
			var insert = document.createElement("td");
			insert.innerHTML = json.form[0].date.substring(0,10);
			var date = document.getElementById("date").parentNode.parentNode.appendChild(insert);
			if(localStorage.getItem(localStorage.key(i)).substring(11,26) == "Symptom Tracker"){
				for (var j = 0; j < json.form[0].answers.length; j++){
					document.getElementById(json.form[0].answers[j].id).style.visibility = "visible";
					var parent = document.getElementById(json.form[0].answers[j].id).parentNode.parentNode.parentNode;
					var insert1 = document.createElement("td");
					var insert2 = document.createElement("input");
					parent.appendChild(insert1);
					insert1.appendChild(insert2);
					insert2.setAttribute("type", "range");
					insert2.setAttribute("id", json.form[0].answers[j].id);
					insert2.setAttribute("min", 0);
					insert2.setAttribute("max", 10);
					insert2.setAttribute("value", json.form[0].answers[j].value);
					
				}
			}
		}
		
	}
	var contentToRemove = document.querySelectorAll("#original");
		$(contentToRemove).remove(); 
}


document.addEventListener('DOMContentLoaded', function() {
	displayMT();
		displayS();
});
