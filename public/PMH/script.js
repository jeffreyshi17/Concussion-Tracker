document.getElementById("submit").addEventListener("click", submit);
document.getElementById("summary").addEventListener("click", createSummary);

var text = '[{ 	"id": "PMH", 	"title": "Past Medical History", 	"desc": "Please answer the following questions about your past medical history and leave any necessary comments.", 	"questions": [{ 		"id": "PMH_0", 		"question": "Personal History", 		"answers": [{ 			"id": "PMH_0_0", 			"type": "", 			"text": "", 			"options": [{ 				"id": "PMH_0_0_0", 				"type": "checkbox", 				"text": "Headaches/migraines", 				"options": [] 			}, { 				"id": "PMH_0_0_1", 				"type": "checkbox", 				"text": "Depression", 				"options": [] 			}, { 				"id": "PMH_0_0_2", 				"type": "checkbox", 				"text": "Anxiety", 				"options": [] 			}, { 				"id": "PMH_0_0_3", 				"type": "checkbox", 				"text": "Mood changes", 				"options": [] 			}, { 				"id": "PMH_0_0_4", 				"type": "checkbox", 				"text": "Diagnosed learning disability", 				"options": [{ 					"id": "PMH_0_0_4_0", 					"type": "text", 					"text": "Please list:" 				}] 			}] 		}] 	}, { 		"id": "PMH_1", 		"question": "Family History", 		"answers": [{ 			"id": "PMH_1_0", 			"type": "", 			"text": "", 			"options": [{ 				"id": "PMH_1_0_0", 				"type": "checkbox", 				"text": "Headaches/migraines", 				"options": [] 			}, { 				"id": "PMH_1_0_1", 				"type": "checkbox", 				"text": "Depression", 				"options": [] 			}, { 				"id": "PMH_1_0_2", 				"type": "checkbox", 				"text": "Anxiety", 				"options": [] 			}, { 				"id": "PMH_1_0_3", 				"type": "checkbox", 				"text": "Mood changes", 				"options": [] 			}] 		}] 	}, { 		"id": "PMH_2", 		"question": "Birth", 		"answers": [{ 			"id": "PMH_2_0", 			"type": "", 			"text": "", 			"options": [{ 				"id": "PMH_2_0_0", 				"type": "checkbox", 				"text": "Full term", 				"options": [] 			}, { 				"id": "PMH_2_0_1", 				"type": "checkbox", 				"text": "Premature", 				"options": [{ 					"id": "PMH_2_0_1_0", 					"type": "text", 					"text": "Please specify at how many weeks of gestation" 				}] 			}, { 				"id": "PMH_2_0_2", 				"type": "checkbox", 				"text": "Vaginal", 				"options": [] 			}, { 				"id": "PMH_2_0_3", 				"type": "checkbox", 				"text": "C-Section", 				"options": [{ 					"id": "PMH_2_0_3_0", 					"type": "text", 					"text": "Pleae specify the indication" 				}] 			}] 		}] 	}, { 		"id": "PMH_3", 		"question": "Did you reach developmental milestones growing up?", 		"answers": [{ 			"id": "PMH_3_0", 			"type": "radio", 			"text": "Yes", 			"options": [] 		}, { 			"id": "PMH_3_1", 			"type": "radio", 			"text": "No", 			"options": [{ 				"id": "PMH_3_1_0", 				"type": "text", 				"text": "If no, please explain", 				"options": [] 			}] 		}] 	}, { 		"id": "PMH_4", 		"question": "Did you consume alcohol?", 		"answers": [{ 			"id": "PMH_4_0", 			"type": "checkbox", 			"text": "Pre-Injury", 			"options": [] 		}, { 			"id": "PMH_4_1", 			"type": "checkbox", 			"text": "Post-Injury", 			"options": [] 		}] 	}, { 		"id": "PMH_5", 		"question": "Did you smoke cigarettes?", 		"answers": [{ 			"id": "PMH_5_0", 			"type": "checkbox", 			"text": "Pre-Injury", 			"options": [] 		}, { 			"id": "PMH_5_1", 			"type": "checkbox", 			"text": "Post-Injury", 			"options": [] 		}] 	}, { 		"id": "PMH_6", 		"question": "Did you smoke marijuana?", 		"answers": [{ 			"id": "PMH_6_0", 			"type": "checkbox", 			"text": "Pre-Injury", 			"options": [] 		}, { 			"id": "PMH_6_1", 			"type": "checkbox", 			"text": "Post-Injury", 			"options": [] 		}] 	}, { 		"id": "PMH_7", 		"question": "Did you use recreational drugs", 		"answers": [{ 			"id": "PMH_7_0", 			"type": "checkbox", 			"text": "Pre-Injury", 			"options": [] 		}, { 			"id": "PMH_7_1", 			"type": "checkbox", 			"text": "Post-Injury", 			"options": [] 		}] 	}] }]'; 
var data = JSON.parse(text);


function submit() {
	console.log("submit running");
	var answerJ = '{"title": "Past Medical History", "answers": [';
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
	answerJ = answerJ.substring(0, answerJ.length - 2); //gets rid of extra space and comma
	answerJ+=']}';
	var testString = "asdkfjas;ldfjas;ldfjas;ldfjas;ldfjasd;lfjasdkfjas;ldfjas;ldfjas;ldfjas;ldfjasd;lfjasdkfjas;ldfjas;ldfjas;ldfjas;ldfjasd;lfjasdkfjas;ldfjas;ldfjas;ldfjas;ldfjasd;lfjasdkfjas;ldfjas;ldfjas;ldfjas;ldfjasd;lfjasdkfjas;ldfjas;ldfjas;ldfjas;ldfjasd;lfjasdkfjas;ldfjas;ldfjas;ldfjas;ldfjasd;lfjasdkfjas;ldfjas;ldfjas;ldfjas;ldfjasd;lfjasdkfjas;ldfjas;ldfjas;ldfjas;ldfjasd;lfjLASTLETTERS";
	localStorage.setItem("PMH", answerJ);
	console.log(testString);
	console.log(localStorage.getItem("PMH"));
	console.log("submit end");
}


function createSummary(){
	var newPage = window.open("");
	var localStorageI = localStorage.getItem("PMH");
	console.log(localStorageI);
	var localStorageJ = JSON.parse(localStorageI);
	var all = "";
	all+="<h1>Summary of Submitted Results</h1>";

	for (var i = 0; i < data[0].questions.length; i++){
		all += "<div>" + data[0].questions[i].question + "</div>";

		for (var j = 0; j < data[0].questions[i].answers.length; j++){
			if (data[0].questions[i].answers[j].type == ""){
				all += "<div>" + data[0].questions[i].answers[j].text + "</div>";
			}
			else {
				var jsonid = data[0].questions[i].answers[j].id;
				var placeInStorage = 0;
				for (var a = 0; a < localStorageJ.answers.length; a++){
					if (jsonid == localStorageJ.answers[a].id){
						placeInStorage = a;
					}
				}
				all += "<div>" + data[0].questions[i].answers[j].text + ": " + localStorageJ.answers[placeInStorage].answer + "</div>";
			}

			for (var k = 0; k < data[0].questions[i].answers[j].options.length; k++){
				if (data[0].questions[i].answers[j].options[k].type == ""){
					all += "<div>" + data[0].questions[i].answers[j].options[k].text + "</div>";
				}
				else {
					var jsonid = data[0].questions[i].answers[j].options[k].id;
					var placeInStorage = 0;
					for (var a = 0; a < localStorageJ.answers.length; a++){
						if (jsonid == localStorageJ.answers[a].id){
							placeInStorage = a;
						}
					}
					all += "<div>" + data[0].questions[i].answers[j].options[k].text + ": " + localStorageJ.answers[placeInStorage].answer + "</div>";
				}
				for (var l = 0; l < data[0].questions[i].answers[j].options[k].options.length; l++){
					if (data[0].questions[i].answers[j].options[k].options[l].type == ""){
						all += "<div>" + data[0].questions[i].answers[j].options[k].options[l].text + "</div>";
					}
					else {
						var jsonid = data[0].questions[i].answers[j].options[k].options[l].id;
						var placeInStorage = 0;
						for (var a = 0; a < localStorageJ.answers.length; a++){
							if (jsonid == localStorageJ.answers[a].id){
								placeInStorage = a;
							}
						}
						all += "<div>" + data[0].questions[i].answers[j].options[k].options[l].text + ": " + localStorageJ.answers[placeInStorage].answer + "</div>";
					}	
				}
			}
		}
		all += "<br></br>";
	}

	newPage.document.write("<html><head><title>Summary of Results</title></head><body>" + all + "</body></html>");

}

console.log("linked");