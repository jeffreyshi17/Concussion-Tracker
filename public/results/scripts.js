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
function displaySAC(){
	var text = '[{ 	"id": "SAC", 	"title": "Sleep/Alcohol/Caffeine Tracker", 	"desc": "Please answer the following questions about your daily sleep and alcohol/caffeine consumption", 	"date": "", 	"questions": [{ 		"id": "SAC_0", 		"question": "How many hours of sleep did you get last night?", 		"answers": [{ 			"id": "SAC_0_0", 			"type": "text", 			"text": "hrs", 			"options": [{ 				"id": "SAC_0_0_0",  				"type": "text", 				"text": "How many times, if any, did you wake up during the night?"  			}, { 				"id": "SAC_0_0_1", 				"type": "text", 				"text": "Please rate the quality of your sleep on a scale of 1 to 5" 			}]  		}] 	}, { 		"id": "SAC_1", 		"question": "Did you drink alcohol today?", 		"answers": [{ 			"id": "SAC_1_0", 			"type": "radio", 			"text": "Yes", 			"options": [{ 				"id": "SAC_1_0_0", 				"type": "checkbox", 				"text": "Beer", 				"options": [{ 					"id": "SAC_1_0_0_0", 					"type": "text", 					"text": "If yes, how many beers?" 				}] 			}, { 				"id": "SAC_1_0_1", 				"type": "checkbox", 				"text": "Wine", 				"options": [{ 					"id": "SAC_1_0_1_0", 					"type" :"text", 					"text": "If yes, how many glasses?" 				}] 			}, { 				"id": "SAC_1_0_2", 				"type": "checkbox", 				"text": "Hard liquor", 				"options": [{ 					"id": "SAC_1_0_2_0", 					"type": "text", 					"text": "If yes, what liquor?", 					"options":[{ 						"id": "SAC_1_0_2_0_0", 						"type": "text", 						"text": "How many shots?" 					}] 				}] 			}] 		}, { 			"id": "SAC_1_1", 			"type": "radio", 			"text": "No" 		}]    	}, { 		"id": "SAC_2", 		"question": "Did you consume caffeine today?", 		"answers": [{ 			"id": "SAC_2_0", 			"type": "radio", 			"text": "Yes", 			"options": [{ 				"id": "SAC_2_0_0", 				"type": "checkbox", 				"text": "Coffee", 				"options": [{ 					"id": "SAC_2_0_0_0", 					"type": "text", 					"text": "How many 8oz cups?" 				}] 			}, { 				"id": "SAC_2_0_1", 				"type": "checkbox", 				"text": "Tea", 				"options": [{ 					"id": "SAC_2_0_1_0", 					"type": "text", 					"text": "How many 8oz cups?" 				}] 			}, { 				"id": "SAC_2_0_2", 				"type": "checkbox", 				"text": "Other", 				"options": [{ 					"id": "SAC_2_0_2_0", 					"type": "text", 					"text": "How many milligrams?" 				}] 			}] 		}, { 			"id": "SAC_2_1", 			"type": "radio", 			"text": "No" 		}] 	}, { 		"id": "SAC_3", 		"question": "Did you consume drugs today?", 		"answers": [{ 			"id": "SAC_3_0", 			"type": "radio", 			"text": "Yes", 			"options": [{ 				"id": "SAC_3_0_0", 				"type": "checkbox",  				"text": "Marijuana", 				"options": [{ 					"id": "SAC_3_0_0_0", 					"type": "checkbox", 					"text": "Recreational Marijuana", 					"options": [{ 						"id": "SAC_3_0_0_0_0", 						"type": "text", 						"text": "How many grams?" 					}] 				}, { 					"id": "SAC_3_0_0_1", 					"type": "checkbox", 					"text": "Medicinal Marijuana", 					"options": [{ 						"id": "SAC_3_0_0_0_1", 						"type": "text", 						"text": "How many grams?" 					}]  				}] 			}, { 				"id": "SAC_3_0_1", 				"type": "checkbox", 				"text": "Cocaine", 				"options": [{ 					"id": "SAC_3_0_1_0", 					"type": "text", 					"text": "How many grams?" 				}] 			}, { 				"id": "SAC_3_0_2", 				"type": "checkbox", 				"text": "Other drug", 				"options": [{ 					"id": "SAC_3_0_2_0", 					"type": "text", 					"text": "What drug?" 				}, { 					"id": "SAC_3_0_2_1", 					"type": "text", 					"text": "How many grams?" 				}] 			}] 		}] 	}]   }]';
	var localStorageI = localStorage.getItem("SAC");
	var data = JSON.parse(text);
	if(typeof localStorageI != 'undefined'){
		var localStorageJ = JSON.parse(localStorageI);
		var all = "";
		all+="<div class = 'container'>";
		all+="<h1 class = 'page-header' >Summary of Submitted Results</h1>";
		for (var g = 0; g < localStorageJ.groups.length; g++){
			all+="<div><b><u>" + localStorageJ.groups[g].date + "</u></b></div>";
			for (var i = 0; i < data[0].questions.length; i++){
				all += "<div ><b>" + data[0].questions[i].question + "</b></div>";

				for (var j = 0; j < data[0].questions[i].answers.length; j++){
					if (data[0].questions[i].answers[j].type == ""){
						all += "<div" + data[0].questions[i].answers[j].text + "</div>";
					}
					else {
						var jsonid = data[0].questions[i].answers[j].id;
						var placeInStorage = 0;
						for (var a = 0; a < localStorageJ.groups[g].answers.length; a++){
							if (jsonid == localStorageJ.groups[g].answers[a].id){
								placeInStorage = a;
							}
						}
						if (data[0].questions[i].answers[j].type == "text"){
							if (localStorageJ.groups[g].answers[placeInStorage].answer != ""){
								all += "<div >" + data[0].questions[i].answers[j].text + ": " + localStorageJ.groups[g].answers[placeInStorage].answer + "</div>";
							}
						}
						else {
							if (localStorageJ.groups[g].answers[placeInStorage].answer != "No"){
								all += "<div >" + data[0].questions[i].answers[j].text + "</div>";
							}
						}
					}

					if (typeof data[0].questions[i].answers[j].options != "undefined"){
					for (var k = 0; k < data[0].questions[i].answers[j].options.length; k++){
						if (data[0].questions[i].answers[j].options[k].type == ""){
							all += "<div >" + data[0].questions[i].answers[j].options[k].text + "</div>";
						}
						else {
							var jsonid = data[0].questions[i].answers[j].options[k].id;
							var placeInStorage = 0;
							for (var a = 0; a < localStorageJ.groups[g].answers.length; a++){
								if (jsonid == localStorageJ.groups[g].answers[a].id){
									placeInStorage = a;
								}
							}
							if (data[0].questions[i].answers[j].options[k].type == "text"){
								if (localStorageJ.groups[g].answers[placeInStorage].answer != ""){
									all += "<div >" + data[0].questions[i].answers[j].options[k].text + ": " + localStorageJ.groups[g].answers[placeInStorage].answer + "</div>";
								}
							}
							else {
								if (localStorageJ.groups[g].answers[placeInStorage].answer != "No"){
									all += "<div >" + data[0].questions[i].answers[j].options[k].text + "</div>";
								}
							}						
							
						}

						if (typeof data[0].questions[i].answers[j].options[k].options != "undefined"){
						for (var l = 0; l < data[0].questions[i].answers[j].options[k].options.length; l++){
							if (data[0].questions[i].answers[j].options[k].options[l].type == ""){
								all += "<div >" + data[0].questions[i].answers[j].options[k].options[l].text + "</div>";
							}
							else {
								var jsonid = data[0].questions[i].answers[j].options[k].options[l].id;
								var placeInStorage = 0;
								for (var a = 0; a < localStorageJ.groups[g].answers.length; a++){
									if (jsonid == localStorageJ.groups[g].answers[a].id){
										placeInStorage = a;
									}
								}
								if (data[0].questions[i].answers[j].options[k].options[l].type == "text"){
									if (localStorageJ.groups[g].answers[placeInStorage].answer != ""){
										all += "<div >" + data[0].questions[i].answers[j].options[k].options[l].text + ": " + localStorageJ.groups[g].answers[placeInStorage].answer + "</div>";
									}
								}
								else {
									if (localStorageJ.groups[g].answers[placeInStorage].answer != "No"){
										all += "<div >" + data[0].questions[i].answers[j].options[k].options[l].text + "</div>";
									}
								}							
							}

							if (typeof data[0].questions[i].answers[j].options[k].options[l].options != "undefined"){
							for (var m = 0; m < data[0].questions[i].answers[j].options[k].options[l].options.length; m++){ 	
								if (data[0].questions[i].answers[j].options[k].options[l].options[m].type == ""){
									all += "<div >" + questions[i].answers[j].options[k].options[l].options[m].text + "</div>";
								}
								else {
									var jsonid = data[0].questions[i].answers[j].options[k].options[l].options[m].id;
									var placeInStorage = 0;
									for (var a = 0; a < localStorageJ.groups[g].answers.length; a++){
										if (jsonid == localStorageJ.groups[g].answers[a].id){
											placeInStorage = a;
										}
									}
									if (data[0].questions[i].answers[j].options[k].options[l].options[m].type == "text"){
										if (localStorageJ.groups[g].answers[placeInStorage].answer != ""){
											all += "<div >" + data[0].questions[i].answers[j].options[k].options[l].options[m].text + ": " + localStorageJ.groups[g].answers[placeInStorage].answer + "</div>";
										}
									}
									else {
										if (localStorageJ.groups[g].answers[placeInStorage].answer != "No"){
											all += "<div >" + data[0].questions[i].answers[j].options[k].options[l].options[m].text+ "</div>";
										}
									}								

								}
							}
							}

						}
						}
					}
					}
				}
				all += "<br></br>";
			}
			
		}
		all+="</div>";
	}
	console.log(all);
	document.getElementById("SAC").outerHTML = all;
	
}




document.addEventListener('DOMContentLoaded', function() {
	displayMT();
	displayS();
	displaySAC();
});
