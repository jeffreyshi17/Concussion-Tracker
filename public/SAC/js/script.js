document.getElementById("submit").addEventListener("click", submit);
document.getElementById("summary").addEventListener("click", createSummary);

var text = '[{ 	"id": "SAC", 	"title": "Sleep/Alcohol/Caffeine Tracker", 	"desc": "Please answer the following questions about your daily sleep and alcohol/caffeine consumption", 	"date": "", 	"questions": [{ 		"id": "SAC_0", 		"question": "How many hours of sleep did you get last night?", 		"answers": [{ 			"id": "SAC_0_0", 			"type": "text", 			"text": "hrs", 			"options": [{ 				"id": "SAC_0_0_0",  				"type": "text", 				"text": "How many times, if any, did you wake up during the night?"  			}, { 				"id": "SAC_0_0_1", 				"type": "text", 				"text": "Please rate the quality of your sleep on a scale of 1 to 5" 			}]  		}] 	}, { 		"id": "SAC_1", 		"question": "Did you drink alcohol today?", 		"answers": [{ 			"id": "SAC_1_0", 			"type": "radio", 			"text": "Yes", 			"options": [{ 				"id": "SAC_1_0_0", 				"type": "checkbox", 				"text": "Beer", 				"options": [{ 					"id": "SAC_1_0_0_0", 					"type": "text", 					"text": "If yes, how many beers?" 				}] 			}, { 				"id": "SAC_1_0_1", 				"type": "checkbox", 				"text": "Wine", 				"options": [{ 					"id": "SAC_1_0_1_0", 					"type" :"text", 					"text": "If yes, how many glasses?" 				}] 			}, { 				"id": "SAC_1_0_2", 				"type": "checkbox", 				"text": "Hard liquor", 				"options": [{ 					"id": "SAC_1_0_2_0", 					"type": "text", 					"text": "If yes, what liquor?", 					"options":[{ 						"id": "SAC_1_0_2_0_0", 						"type": "text", 						"text": "How many shots?" 					}] 				}] 			}] 		}, { 			"id": "SAC_1_1", 			"type": "radio", 			"text": "No" 		}]    	}, { 		"id": "SAC_2", 		"question": "Did you consume caffeine today?", 		"answers": [{ 			"id": "SAC_2_0", 			"type": "radio", 			"text": "Yes", 			"options": [{ 				"id": "SAC_2_0_0", 				"type": "checkbox", 				"text": "Coffee", 				"options": [{ 					"id": "SAC_2_0_0_0", 					"type": "text", 					"text": "How many 8oz cups?" 				}] 			}, { 				"id": "SAC_2_0_1", 				"type": "checkbox", 				"text": "Tea", 				"options": [{ 					"id": "SAC_2_0_1_0", 					"type": "text", 					"text": "How many 8oz cups?" 				}] 			}, { 				"id": "SAC_2_0_2", 				"type": "checkbox", 				"text": "Other", 				"options": [{ 					"id": "SAC_2_0_2_0", 					"type": "text", 					"text": "How many milligrams?" 				}] 			}] 		}, { 			"id": "SAC_2_1", 			"type": "radio", 			"text": "No" 		}] 	}, { 		"id": "SAC_3", 		"question": "Did you consume drugs today?", 		"answers": [{ 			"id": "SAC_3_0", 			"type": "radio", 			"text": "Yes", 			"options": [{ 				"id": "SAC_3_0_0", 				"type": "checkbox",  				"text": "Marijuana", 				"options": [{ 					"id": "SAC_3_0_0_0", 					"type": "checkbox", 					"text": "Recreational Marijuana", 					"options": [{ 						"id": "SAC_3_0_0_0_0", 						"type": "text", 						"text": "How many grams?" 					}] 				}, { 					"id": "SAC_3_0_0_1", 					"type": "checkbox", 					"text": "Medicinal Marijuana", 					"options": [{ 						"id": "SAC_3_0_0_0_1", 						"type": "text", 						"text": "How many grams?" 					}]  				}] 			}, { 				"id": "SAC_3_0_1", 				"type": "checkbox", 				"text": "Cocaine", 				"options": [{ 					"id": "SAC_3_0_1_0", 					"type": "text", 					"text": "How many grams?" 				}] 			}, { 				"id": "SAC_3_0_2", 				"type": "checkbox", 				"text": "Other drug", 				"options": [{ 					"id": "SAC_3_0_2_0", 					"type": "text", 					"text": "What drug?" 				}, { 					"id": "SAC_3_0_2_1", 					"type": "text", 					"text": "How many grams?" 				}] 			}] 		}] 	}]   }]';
var data = JSON.parse(text);

function submit(){
	console.log("submit running");
	var date = "";
	var d = new Date();
	// var dSeconds = "";
	// var dMinutes = "";
	// var dHours = "";
	// var dDates = "";
	// var dMonths = "";
	// var dYears = "";
	date = d.toLocaleString();

	// date = (d.getMinutes().toString()) + "." + (d.getHours().toString()) + "." + (d.getDate().toString()) + "." + (d.getMonth().toString()) + "." + (d.getFullYear().toString());

	if (localStorage.getItem("SAC") == null){
		var answerJ = '{"title": "Sleep, Alcohol, Caffeine Tracker", "groups": [{';
		answerJ += '"date": ' + '"' + date + '", ';
		answerJ += '"answers": [';

		var full = document.querySelectorAll("input");
		for (var i = 0; i < full.length; i++){
			if (full[i].type == "checkbox"){
				if (full[i].checked == true){
					answerJ += '{"id": "' + full[i].id + '", "answer": "Yes"}, ';
				}

				else {
					answerJ += '{"id": "' + full[i].id + '", "answer": "No"}, ';
				}
			}
			else if (full[i].type == "text"){
				answerJ += '{"id": "' + full[i].id + '", "answer": "' + full[i].value + '"}, ';
			}
			else if (full[i].type == "radio"){
				if (full[i].checked == true){
					answerJ += '{"id": "' + full[i].id + '", "answer": "Yes"}, ';
				}
				else {
					answerJ += '{"id": "' + full[i].id + '", "answer": "No"}, ';
				}
			}
		}
		answerJ = answerJ.substring(0, answerJ.length - 2); //gets rid of extra comma
		answerJ += ']}';
		answerJ += ']}';
		localStorage.setItem("SAC", answerJ);
	}
	else if (localStorage.getItem("SAC") != null){
		var ls = localStorage.getItem("SAC");
		ls = ls.substring(0, ls.length - 2); //gets rid of last } and ]
		ls += ', {';
		var answerJ = '';
		answerJ += '"date": ' + '"' + date + '", ';
		answerJ += '"answers": [';

		var full = document.querySelectorAll("input");
		for (var i = 0; i < full.length; i++){
			if (full[i].type == "checkbox"){
				if (full[i].checked == true){
					answerJ += '{"id": "' + full[i].id + '", "answer": "Yes"}, ';
				}

				else {
					answerJ += '{"id": "' + full[i].id + '", "answer": "No"}, ';
				}
			}
			else if (full[i].type == "text"){
				answerJ += '{"id": "' + full[i].id + '", "answer": "' + full[i].value + '"}, ';
			}
			else if (full[i].type == "radio"){
				if (full[i].checked == true){
					answerJ += '{"id": "' + full[i].id + '", "answer": "Yes"}, ';
				}
				else {
					answerJ += '{"id": "' + full[i].id + '", "answer": "No"}, ';
				}
			}
		}
		answerJ = answerJ.substring(0, answerJ.length - 2); //gets rid of extra comma
		answerJ += ']}';
		answerJ += ']}';
		ls += answerJ;
		localStorage.setItem("SAC", ls);

	}





	console.log(localStorage.getItem("SAC"));
	console.log("submit end");
}

function createSummary(){
	var newPage = window.open("");
	var localStorageI = localStorage.getItem("SAC");
	var localStorageJ = JSON.parse(localStorageI);
	var all = "";
	all+="<h1 align = center>Summary of Submitted Results</h1>";
	for (var g = 0; g < localStorageJ.groups.length; g++){
		all+="<div align = center><b>" + localStorageJ.groups[g].date + "</b></div>";
		for (var i = 0; i < data[0].questions.length; i++){
			all += "<div align = center>" + data[0].questions[i].question + "</div>";

			for (var j = 0; j < data[0].questions[i].answers.length; j++){
				if (data[0].questions[i].answers[j].type == ""){
					all += "<div align = center>" + data[0].questions[i].answers[j].text + "</div>";
				}
				else {
					var jsonid = data[0].questions[i].answers[j].id;
					var placeInStorage = 0;
					for (var a = 0; a < localStorageJ.groups[g].answers.length; a++){
						if (jsonid == localStorageJ.groups[g].answers[a].id){
							placeInStorage = a;
						}
					}
					all += "<div align = center>" + data[0].questions[i].answers[j].text + ": " + localStorageJ.groups[g].answers[placeInStorage].answer + "</div>";
				}

				if (typeof data[0].questions[i].answers[j].options != "undefined"){
				for (var k = 0; k < data[0].questions[i].answers[j].options.length; k++){
					if (data[0].questions[i].answers[j].options[k].type == ""){
						all += "<div align = center>" + data[0].questions[i].answers[j].options[k].text + "</div>";
					}
					else {
						var jsonid = data[0].questions[i].answers[j].options[k].id;
						var placeInStorage = 0;
						for (var a = 0; a < localStorageJ.groups[g].answers.length; a++){
							if (jsonid == localStorageJ.groups[g].answers[a].id){
								placeInStorage = a;
							}
						}
						all += "<div align = center>" + data[0].questions[i].answers[j].options[k].text + ": " + localStorageJ.groups[g].answers[placeInStorage].answer + "</div>";
					}

					if (typeof data[0].questions[i].answers[j].options[k].options != "undefined"){
					for (var l = 0; l < data[0].questions[i].answers[j].options[k].options.length; l++){
						if (data[0].questions[i].answers[j].options[k].options[l].type == ""){
							all += "<div align = center>" + data[0].questions[i].answers[j].options[k].options[l].text + "</div>";
						}
						else {
							var jsonid = data[0].questions[i].answers[j].options[k].options[l].id;
							var placeInStorage = 0;
							for (var a = 0; a < localStorageJ.groups[g].answers.length; a++){
								if (jsonid == localStorageJ.groups[g].answers[a].id){
									placeInStorage = a;
								}
							}
							all += "<div align = center>" + data[0].questions[i].answers[j].options[k].options[l].text + ": " + localStorageJ.groups[g].answers[placeInStorage].answer + "</div>";
						}

						if (typeof data[0].questions[i].answers[j].options[k].options[l].options != "undefined"){
						for (var m = 0; m < data[0].questions[i].answers[j].options[k].options[l].options.length; m++){ 	
							if (data[0].questions[i].answers[j].options[k].options[l].options[m].type == ""){
								all += "<div align = center>" + questions[i].answers[j].options[k].options[l].options[m].text + "</div>";
							}
							else {
								var jsonid = data[0].questions[i].answers[j].options[k].options[l].options[m].id;
								var placeInStorage = 0;
								for (var a = 0; a < localStorageJ.groups[g].answers.length; a++){
									if (jsonid == localStorageJ.groups[g].answers[a].id){
										placeInStorage = a;
									}
								}
								all += "<div align = center>" + data[0].questions[i].answers[j].options[k].options[l].options[m].text + ": " + localStorageJ.groups[g].answers[placeInStorage].answer + "</div>";
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

	newPage.document.write("<html><head><title>Summary of Results</title></head><body>" + all + "</body></html>");


}