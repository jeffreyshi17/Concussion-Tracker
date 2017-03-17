function displayMT(){
	var edits = false;
	var text = '<div class="container theme-showcase" role="main"> <div class="page-header"><h1>Menstrual Tracker Results</h1></div> <div class ="row"> <div class = "col-md-6"> <table class = "table" > <thead> <tr> <td>Date</td> <td>Last Period</td> <td>Menopausal</td> <td>Oral contraceptives</td> <td>Missed Periods</td> <td>Period Description</td> </tr> </thead> <tbody>';
	for(var i = 0; i< localStorage.length; i++){
		var json = JSON.parse(localStorage.getItem(localStorage.key(i)));
		if(typeof json.title != "undefined" && json.title == "Menstrual Tracker" ){
			edits = true;
			text+= '<tr>';
			text+='<td>'+ json.date+'</td>';
				for(var j = 0; j < json.answers.length; j++){
					text +='<td>'+ json.answers[j].answer+'</td>';
				}
			text+= "</tr>";
		}
	}
	text += '</tbody> </table> </div> </div> </div> </BODY> </HTML>';
	if(edits){
	document.getElementById("menstrual_tracker").innerHTML = text;}
}
function displayS(){
		var json = JSON.parse(localStorage.getItem("Symptoms"));
		var insert = document.createElement("td");
		insert.innerHTML = json.form[0].date.substring(0,10);
		insert.setAttribute("id","date");
		for (var i = 0; i < json.form.length; i++){
			var insertD = document.createElement("td");
			insertD.innerHTML = json.form[i].date.substring(0,10);
			var date = document.getElementById("date").parentNode.parentNode.appendChild(insertD);
			for (var j = 0; j < json.form[i].answers.length; j++){
				document.getElementById("R"+json.form[i].answers[j].id).style.visibility = "visible";
				var parent = document.getElementById("R"+json.form[i].answers[j].id).parentNode.parentNode.parentNode;
				var insert1 = document.createElement("td");
				var insert2 = document.createElement("input");
				parent.appendChild(insert1);
				insert1.appendChild(insert2);
				insert2.setAttribute("type", "range");
				insert2.setAttribute("id", json.form[i].answers[j].id);
				insert2.setAttribute("min", 0);
				insert2.setAttribute("max", 10);
				insert2.setAttribute("value", json.form[i].answers[j].value);
				insert2.setAttribute("disabled", true);
				insert2.setAttribute("style", "border-left:30px");
			}
		}
	var contentToRemove = document.querySelectorAll("#original");
		$(contentToRemove).remove(); 
	$("#symptoms").removeAttr( "hidden" );
	console.log(json);
}
function displaySAC(){
	if(localStorage.getItem("SAC") != null){
	var text = '[{ 	"id": "SAC", 	"title": "Sleep/Alcohol/Caffeine Tracker", 	"desc": "Please answer the following questions about your daily sleep and alcohol/caffeine consumption", 	"date": "", 	"questions": [{ 		"id": "SAC_0", 		"question": "How many hours of sleep did you get last night?", 		"answers": [{ 			"id": "SAC_0_0", 			"type": "text", 			"text": "hrs", 			"options": [{ 				"id": "SAC_0_0_0",  				"type": "text", 				"text": "How many times, if any, did you wake up during the night?"  			}, { 				"id": "SAC_0_0_1", 				"type": "text", 				"text": "Please rate the quality of your sleep on a scale of 1 to 5" 			}]  		}] 	}, { 		"id": "SAC_1", 		"question": "Did you drink alcohol today?", 		"answers": [{ 			"id": "SAC_1_0", 			"type": "radio", 			"text": "Yes", 			"options": [{ 				"id": "SAC_1_0_0", 				"type": "checkbox", 				"text": "Beer", 				"options": [{ 					"id": "SAC_1_0_0_0", 					"type": "text", 					"text": "If yes, how many beers?" 				}] 			}, { 				"id": "SAC_1_0_1", 				"type": "checkbox", 				"text": "Wine", 				"options": [{ 					"id": "SAC_1_0_1_0", 					"type" :"text", 					"text": "If yes, how many glasses?" 				}] 			}, { 				"id": "SAC_1_0_2", 				"type": "checkbox", 				"text": "Hard liquor", 				"options": [{ 					"id": "SAC_1_0_2_0", 					"type": "text", 					"text": "If yes, what liquor?", 					"options":[{ 						"id": "SAC_1_0_2_0_0", 						"type": "text", 						"text": "How many shots?" 					}] 				}] 			}] 		}, { 			"id": "SAC_1_1", 			"type": "radio", 			"text": "No" 		}]    	}, { 		"id": "SAC_2", 		"question": "Did you consume caffeine today?", 		"answers": [{ 			"id": "SAC_2_0", 			"type": "radio", 			"text": "Yes", 			"options": [{ 				"id": "SAC_2_0_0", 				"type": "checkbox", 				"text": "Coffee", 				"options": [{ 					"id": "SAC_2_0_0_0", 					"type": "text", 					"text": "How many 8oz cups?" 				}] 			}, { 				"id": "SAC_2_0_1", 				"type": "checkbox", 				"text": "Tea", 				"options": [{ 					"id": "SAC_2_0_1_0", 					"type": "text", 					"text": "How many 8oz cups?" 				}] 			}, { 				"id": "SAC_2_0_2", 				"type": "checkbox", 				"text": "Other", 				"options": [{ 					"id": "SAC_2_0_2_0", 					"type": "text", 					"text": "How many milligrams?" 				}] 			}] 		}, { 			"id": "SAC_2_1", 			"type": "radio", 			"text": "No" 		}] 	}, { 		"id": "SAC_3", 		"question": "Did you consume drugs today?", 		"answers": [{ 			"id": "SAC_3_0", 			"type": "radio", 			"text": "Yes", 			"options": [{ 				"id": "SAC_3_0_0", 				"type": "checkbox",  				"text": "Marijuana", 				"options": [{ 					"id": "SAC_3_0_0_0", 					"type": "checkbox", 					"text": "Recreational Marijuana", 					"options": [{ 						"id": "SAC_3_0_0_0_0", 						"type": "text", 						"text": "How many grams?" 					}] 				}, { 					"id": "SAC_3_0_0_1", 					"type": "checkbox", 					"text": "Medicinal Marijuana", 					"options": [{ 						"id": "SAC_3_0_0_0_1", 						"type": "text", 						"text": "How many grams?" 					}]  				}] 			}, { 				"id": "SAC_3_0_1", 				"type": "checkbox", 				"text": "Cocaine", 				"options": [{ 					"id": "SAC_3_0_1_0", 					"type": "text", 					"text": "How many grams?" 				}] 			}, { 				"id": "SAC_3_0_2", 				"type": "checkbox", 				"text": "Other drug", 				"options": [{ 					"id": "SAC_3_0_2_0", 					"type": "text", 					"text": "What drug?" 				}, { 					"id": "SAC_3_0_2_1", 					"type": "text", 					"text": "How many grams?" 				}] 			}] 		}] 	}]   }]';
	var localStorageI = localStorage.getItem("SAC");
	var data = JSON.parse(text);
	if(typeof localStorageI != null){
		var localStorageJ = JSON.parse(localStorageI);
		var all = " ";
		if (typeof localStorageJ.groups != null){
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
	}
	//console.log(all);
	document.getElementById("SAC").outerHTML = all;
	}
}
var appendOption = function (target, op) {
    id = op.id;
    type = op.type;
    text = op.text || "";
    text = $('<textarea />').html(text).text();
    var spancontainer = document.createElement('span');
    var input = document.createElement('input');
    var label = document.createElement('label');
    input.type = type;
    input.id = id;
    if (type == "select") {
        var input = document.createElement('option');
        input.value = text;
        input.innerHTML = text;
        target.appendChild(input);
    }
    else if (type == "range") {
        var slidervalue = document.createElement('span');
        var tabElement = document.createElement('tab');
        tabElement.align = "right";
        slidervalue.id = id + "Val";
        label.htmlFor = id;
        $(input).attr({
            'data-slider-min': op.min
            , 'data-slider-max': op.max
            , 'data-slider-step': op.step
            , 'data-slider-value': Math.round((op.max - op.min) / 2)
            , 'type': "range"
            , 'data-slider-tooltip': "hide"
        , });
        $(slidervalue).css("padding-left", "10px");
        $(spancontainer).css("padding-left", "10px");
        label.appendChild(document.createTextNode(text));
        target.appendChild(label);
        target.appendChild(tabElement);
        spancontainer.appendChild(input);
        target.appendChild(spancontainer);
        target.appendChild(slidervalue);
        $(slidervalue).text(Math.round((op.max - op.min) / 2));
        $(input).slider();
        $(input).on("change", function (slideEvt) {
            $(slidervalue).text(slideEvt.value.newValue);
        });
    }
    else { //checkbox, textbox, radio
        input.name = id.substring(0, id.lastIndexOf("_"));
        label.htmlFor = id;
        label.appendChild(document.createTextNode(text));
        if (type == "text") {
            $(spancontainer).css("padding-left", "10px");
            target.appendChild(label);
            spancontainer.appendChild(input);
            target.appendChild(spancontainer);
        }
        else if (type == "") {
            target.appendChild(label);
        }
        else {
            target.appendChild(input);
            target.appendChild(label);
        }
    }
    return input;
}

var JSONsrc;
	var answersObj = [];
	var idlist = [];
function displayFTQ(){
	if(localStorage.getItem("init") != null){
	$.ajaxPrefilter(function (options) {
		if (options.crossDomain && jQuery.support.cors) {
			var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
			options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
			//options.url = "http://cors.corsproxy.io/url=" + options.url;
		}
	});
	$.ajax({
		url: 'http://concussiontracker.herokuapp.com/mainjson'
			//url: 'http://localhost:3000/mainjson'
			
		, dataType: "json"
		, timeout: 5000
		, success: function (data) {
			JSONsrc = JSON.parse(data);
			generateForm();
		}
		, error: function (jqXHR, textStatus, errorThrown) {
			console.log('error ' + textStatus + " " + errorThrown);
		}
	});

	//document.getElementById("FTQ").innerHTML = all;
	$("#FTQ").removeAttr( "hidden" );
	}
}



function generateForm() {
    //appendRestore();
    for (var k = 0; k < JSONsrc.length; k++) {
        var temp = {};
        temp.title = JSONsrc[k].title;
        temp.answers = [];
        answersObj.push(temp);
        idlist.push(JSONsrc[k].id);
        var title = document.createElement('h1');
        title.className = "page-header";
        var description = document.createElement('h3');
        title.appendChild(document.createTextNode(JSONsrc[k]["title"]));
        title.id = JSONsrc[k].id;
        description.appendChild(document.createTextNode(JSONsrc[k]["desc"]));
        container.appendChild(title);
        container.appendChild(description);
        for (var i = 0; i < JSONsrc[k]["questions"].length; i++) {
            var e = document.createElement('h4');
            e.innerHTML = JSONsrc[k]["questions"][i].question;
            container.appendChild(e);
            var l1 = JSONsrc[k]["questions"][i];
            if (l1["answers"]) {
                appendOptions(e, l1["answers"], 0);
            }
        }
    }
    $("input").attr("disabled", true);
    restoreFromLocalStorage();
    //appendSubmit();
}

function appendOptions(e1, lev, x) {
    //e1 = target, lev = json obj, x = level
    var el; //container wrapper
    var other = false; //boolean other
    var select = false; //boolean select
    if (e1.innerText.indexOf("Other") != -1) {
        other = true;
    }
    if (lev[0] && lev[0].type == "select") {
        select = true;
    }
    if (select) {
        el = document.createElement('select');
    }
    else {
        el = document.createElement('span');
    }
    el.className = "option level" + x;
    for (var i = 0; i < lev.length; i++) {
        if (select) {
            ex = appendOption(el, lev[i]);
            if (lev[i]["options"]) {
                appendOptions(el, lev[i]["options"], x + 1);
            }
        }
        else {
            singop = document.createElement('div');
            if (other) {
                ex = appendOption(e1, lev[i]);
                //add directly to target
            }
            else {
                ex = appendOption(singop, lev[i]);
                el.appendChild(singop);
                //add to div
            }
            if (lev[i]["options"]) {
                appendOptions(singop, lev[i]["options"], x + 1);
            }
        }
    }
    e1.appendChild(el);
}
var appendOption = function (target, op) {
    id = op.id;
    type = op.type;
    text = op.text || "";
    text = $('<textarea />').html(text).text();
    var spancontainer = document.createElement('span');
    var input = document.createElement('input');
    var label = document.createElement('label');
    input.type = type;
    input.id = id;
    if (type == "select") {
        var input = document.createElement('option');
        input.value = text;
        input.innerHTML = text;
        target.appendChild(input);
    }
    else if (type == "range") {
        var slidervalue = document.createElement('span');
        var tabElement = document.createElement('tab');
        tabElement.align = "right";
        slidervalue.id = id + "Val";
        label.htmlFor = id;
        $(input).attr({
            'data-slider-min': op.min
            , 'data-slider-max': op.max
            , 'data-slider-step': op.step
            , 'data-slider-value': Math.round((op.max - op.min) / 2)
            , 'type': "range"
            , 'data-slider-tooltip': "hide"
        , });
        $(slidervalue).css("padding-left", "10px");
        $(spancontainer).css("padding-left", "10px");
        label.appendChild(document.createTextNode(text));
        target.appendChild(label);
        target.appendChild(tabElement);
        spancontainer.appendChild(input);
        target.appendChild(spancontainer);
        target.appendChild(slidervalue);
        $(slidervalue).text(Math.round((op.max - op.min) / 2));
        $(input).slider();
        $(input).on("change", function (slideEvt) {
            $(slidervalue).text(slideEvt.value.newValue);
        });
    }
    else { //checkbox, textbox, radio
        input.name = id.substring(0, id.lastIndexOf("_"));
        label.htmlFor = id;
        label.appendChild(document.createTextNode(text));
        if (type == "text") {
            $(spancontainer).css("padding-left", "10px");
            target.appendChild(label);
            spancontainer.appendChild(input);
            target.appendChild(spancontainer);
        }
        else if (type == "") {
            target.appendChild(label);
        }
        else {
            target.appendChild(input);
            target.appendChild(label);
        }
    }
    return input;
}

function restoreFromLocalStorage() {
    if (localStorage.getItem('init')) {
        var a = JSON.parse(localStorage.getItem('init'));
        for (var i = 0; i < a.length; i++) {
            for (var j = 0; j < a[i].answers.length; j++) {
                var q = a[i].answers[j];
                var type = document.getElementById(q.id).type;
                if (type == "checkbox" || type == "radio") {
                    document.getElementById(q.id).checked = q.answer;
                }
                else {
                    document.getElementById(q.id).value = q.answer;
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
	displayFTQ();
	displayMT();
	displayS();
	displaySAC();
});
