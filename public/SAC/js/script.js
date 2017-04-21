var JSONsrc;
var answersObj = [];
var idlist = [];
$.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    }
});

updateJSON();

function updateJSON(webversion) {
    $.ajax({
        url: 'http://concussiontracker.herokuapp.com/sacjson',
        dataType: "json",
        timeout: 5000,
        success: function (data) {
            localStorage["sacForm"] = data;
            JSONsrc = JSON.parse(localStorage["initForm"]).form;
            generateForm();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('failed to update json');
        }
    });
}

function storeToLocalStorage(localStorageVariableName) {
    var ancestor = document.getElementById('container'),
        descendents = ancestor.getElementsByTagName('INPUT');
    var i, e;
    for (i = 0; i < descendents.length; ++i) {
        e = descendents[i];
        var answer = {};
        var id = e.id.substring(0, e.id.indexOf("_"));
        var idIndex = idlist.indexOf(id);
        answer.id = e.id;
        if (e.type == "text" || e.type == "date") {
            answer.answer = e.value;
        }
        if (e.type == "checkbox" || e.type == "radio") {
            answer.answer = e.checked;
        }
        if (e.type == "range") {
            answer.answer = $("#" + e.id + "Val").innerHTML;
        }
        answersObj[idIndex].answers.push(answer);
    }
    var s = JSON.stringify(answersObj);
    localStorage.setItem(localStorageVariableName, s);
}

function exportCSV() {
    var ancestor = document.getElementById('container'),
        descendents = ancestor.getElementsByTagName('INPUT');
    var csv = [['id', 'answer']];
    var csvRows = [];
    for (i = 0; i < descendents.length; ++i) {
        e = descendents[i];
        var answer = {};
        var id = e.id.substring(0, e.id.indexOf("_"));
        answer.id = e.id;
        if (e.type == "text" || e.type == "date") {
            answer.answer = e.value;
        }
        if (e.type == "checkbox" || e.type == "radio") {
            answer.answer = e.checked;
        }
        if (e.type == "range") {
            answer.answer = $("#" + e.id + "Val").innerHTML;
        }
        csv.push([answer.id, answer.answer]);
        csvRows.push(csv[i].join(','));
    }
    csv = csvRows.join("%0A");
    var a = document.createElement('a');
    a.href = 'data:attachment/csv,' + csv;
    a.target = '_blank';
    a.download = 'PatientInformation.csv';
    document.body.appendChild(a);
    a.click();
}

function generateForm() {
    for (var k = 0; k < JSONsrc.length; k++) {
        //Creating localStorage Object
        var temp = {};
        temp.title = JSONsrc[k].title;
        temp.answers = [];
        answersObj.push(temp);
        idlist.push(JSONsrc[k].id);
        //title, description
        var title = document.createElement('h1');
        title.className = "page-header";
        var description = document.createElement('h2');
        title.appendChild(document.createTextNode(JSONsrc[k]["title"]));
        title.id = JSONsrc[k].id;
        description.appendChild(document.createTextNode(JSONsrc[k]["desc"]));
        container.appendChild(title);
        container.appendChild(description);
        //Generating the actual form
        for (var i = 0; i < JSONsrc[k]["questions"].length; i++) {
            var e = document.createElement('h3');
            e.innerHTML = JSONsrc[k]["questions"][i].question;
            container.appendChild(e);
            var l1 = JSONsrc[k]["questions"][i];
            if (l1["answers"]) {
                appendOptions(e, l1["answers"], 0);
            }
        }
    }
    restoreFromLocalStorage();
    hideunhide();
    appendSubmit();
}

function appendOptions(e1, lev, x) {
    var el; //container wrapper
    var other = false; //boolean other
    var select = false; //boolean select
    if (e1.innerText.indexOf("Other") != -1) {
        other = false;
    }
    if (lev[0] && lev[0].type == "select") {
        select = true;
    }
    if (select) {
        el = document.createElement('select');
    } else {
        el = document.createElement('span');
    }
    el.className = "option level" + x;
    for (var i = 0; i < lev.length; i++) {
        if (select) {
            ex = appendOption(el, lev[i]);
            if (lev[i]["options"]) {
                appendOptions(el, lev[i]["options"], x + 1);
            }
        } else {
            singop = document.createElement('div');
            if (other) {
                ex = appendOption(e1, lev[i]);
                //add directly to target
            } else {
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

function appendOption(target, op) {
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
    } else if (type == "range") {
        input = document.createElement('div');
        var slidervalue = document.createElement('span');
        var tabElement = document.createElement('tab');
        tabElement.align = "right";
        slidervalue.id = id + "Val";
        label.htmlFor = id;
        $(slidervalue).css("padding-left", "10px");
        label.appendChild(document.createTextNode(text));
        target.appendChild(label);
        target.appendChild(tabElement);
        spancontainer.appendChild(input);
        target.appendChild(spancontainer);
        target.appendChild(slidervalue);
        $(slidervalue).text(0);
        $(input).slider({
            orientation: "horizontal",
            min: 0,
            max: 10,
            value: 0,
            step: 1,
            animate: "fast",
            create: function () {
                $(slidervalue).text($(this).slider("value"));
            },
            slide: function (event, ui) {
                $(slidervalue).text(ui.value);
            }
        });
    } else { //checkbox, textbox, radio
        input.name = id.substring(0, id.lastIndexOf("_"));
        label.htmlFor = id;
        label.appendChild(document.createTextNode(text));
        if (type == "text") {
            if (text != "") {
                $(spancontainer).css("padding-left", "10px");
            }
            input.className = "form-control";
            target.appendChild(label);
            spancontainer.appendChild(input);
            target.appendChild(spancontainer);
        } else if (type == "") {
            target.appendChild(label);
        } else if (type == "checkbox") {
            target.appendChild(input);
            target.appendChild(label);
        } else {
            target.appendChild(input);
            target.appendChild(label);
        }
    }
    return input;
}

function appendSubmit() {
    var sub = document.createElement('button');
    sub.className = "btn btn-default";
    sub.innerHTML = "Submit";
    sub.id = "submit";
    container.appendChild(sub);
    $(sub).on('click', function () {
        submit();
        exportCSV();
    });
}

function appendRestore() {
    var restore = document.createElement('button');
    restore.className = "btn btn-default";
    restore.innerHTML = "Restore from localStorage";
    restore.id = "restore";
    container.appendChild(restore);
    $(restore).on('click', function () {
        restoreFromLocalStorage();
    });
}

function restoreFromLocalStorage() {
    if (localStorage.getItem('init')) {
        var a = JSON.parse(localStorage.getItem('init'));
        for (var i = 0; i < a.length; i++) {
            for (var j = 0; j < a[i].answers.length; j++) {
                var q = a[i].answers[j];
                if (document.getElementById(q.id)) {
                    var type = document.getElementById(q.id).type;
                    if (type == "checkbox" || type == "radio") {
                        document.getElementById(q.id).checked = q.answer;
                    } else {
                        document.getElementById(q.id).value = q.answer;
                    }
                }
            }
        }
    }
}

function hideunhide() {
    $("input:checkbox").each(function () {
        if (!$(this).is(':checked')) {
            for (var i = 0; i < this.parentNode.childNodes.length; i++) {
                if ($(this.parentNode.childNodes[i]).hasClass("option")) {
                    this.parentNode.childNodes[i].style.display = "none";
                }
            }
        } else {
            for (var i = 0; i < this.parentNode.childNodes.length; i++) {
                if ($(this.parentNode.childNodes[i]).hasClass("option")) {
                    this.parentNode.childNodes[i].style.display = "block";
                }
            }
        }

    });
    $("input:radio").each(function () {
        if (!$(this).is(':checked')) {
            for (var i = 0; i < this.parentNode.childNodes.length; i++) {
                if ($(this.parentNode.childNodes[i]).hasClass("option")) {
                    this.parentNode.childNodes[i].style.display = "none";
                }
            }
        } else {
            for (var i = 0; i < this.parentNode.childNodes.length; i++) {
                if ($(this.parentNode.childNodes[i]).hasClass("option")) {
                    this.parentNode.childNodes[i].style.display = "block";
                }
            }
        }
    });
}
$('input:checkbox').change(function () {
    hideunhide();
});
$('input:radio').change(function () {
    hideunhide();
});


function submit() {
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

    if (localStorage.getItem("SAC") == null) {
        var answerJ = '{"title": "Sleep, Alcohol, Caffeine Tracker", "groups": [{';
        answerJ += '"date": ' + '"' + date + '", ';
        answerJ += '"answers": [';

        var full = document.querySelectorAll("input");
        for (var i = 0; i < full.length; i++) {
            if (full[i].type == "checkbox") {
                if (full[i].checked == true) {
                    answerJ += '{"id": "' + full[i].id + '", "answer": "Yes"}, ';
                } else {
                    answerJ += '{"id": "' + full[i].id + '", "answer": "No"}, ';
                }
            } else if (full[i].type == "text") {
                answerJ += '{"id": "' + full[i].id + '", "answer": "' + full[i].value + '"}, ';
            } else if (full[i].type == "radio") {
                if (full[i].checked == true) {
                    answerJ += '{"id": "' + full[i].id + '", "answer": "Yes"}, ';
                } else {
                    answerJ += '{"id": "' + full[i].id + '", "answer": "No"}, ';
                }
            }
        }
        answerJ = answerJ.substring(0, answerJ.length - 2); //gets rid of extra comma
        answerJ += ']}';
        answerJ += ']}';
        localStorage.setItem("SAC", answerJ);
    } else if (localStorage.getItem("SAC") != null) {
        var ls = localStorage.getItem("SAC");
        ls = ls.substring(0, ls.length - 2); //gets rid of last } and ]
        ls += ', {';
        var answerJ = '';
        answerJ += '"date": ' + '"' + date + '", ';
        answerJ += '"answers": [';

        var full = document.querySelectorAll("input");
        for (var i = 0; i < full.length; i++) {
            if (full[i].type == "checkbox") {
                if (full[i].checked == true) {
                    answerJ += '{"id": "' + full[i].id + '", "answer": "Yes"}, ';
                } else {
                    answerJ += '{"id": "' + full[i].id + '", "answer": "No"}, ';
                }
            } else if (full[i].type == "text") {
                answerJ += '{"id": "' + full[i].id + '", "answer": "' + full[i].value + '"}, ';
            } else if (full[i].type == "radio") {
                if (full[i].checked == true) {
                    answerJ += '{"id": "' + full[i].id + '", "answer": "Yes"}, ';
                } else {
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
    console.log("submit end"); ===
    ===
    =
    document.getElementById("submit").addEventListener("click", submit);

    var text = '[{ 	"id": "SAC", 	"title": "Sleep/Alcohol/Caffeine Tracker", 	"desc": "Please answer the following questions about your daily sleep and alcohol/caffeine consumption", 	"date": "", 	"questions": [{ 		"id": "SAC_0", 		"question": "How many hours of sleep did you get last night?", 		"answers": [{ 			"id": "SAC_0_0", 			"type": "text", 			"text": "hrs", 			"options": [{ 				"id": "SAC_0_0_0",  				"type": "text", 				"text": "How many times, if any, did you wake up during the night?"  			}, { 				"id": "SAC_0_0_1", 				"type": "text", 				"text": "Please rate the quality of your sleep on a scale of 1 to 5" 			}]  		}] 	}, { 		"id": "SAC_1", 		"question": "Did you drink alcohol today?", 		"answers": [{ 			"id": "SAC_1_0", 			"type": "radio", 			"text": "Yes", 			"options": [{ 				"id": "SAC_1_0_0", 				"type": "checkbox", 				"text": "Beer", 				"options": [{ 					"id": "SAC_1_0_0_0", 					"type": "text", 					"text": "If yes, how many beers?" 				}] 			}, { 				"id": "SAC_1_0_1", 				"type": "checkbox", 				"text": "Wine", 				"options": [{ 					"id": "SAC_1_0_1_0", 					"type" :"text", 					"text": "If yes, how many glasses?" 				}] 			}, { 				"id": "SAC_1_0_2", 				"type": "checkbox", 				"text": "Hard liquor", 				"options": [{ 					"id": "SAC_1_0_2_0", 					"type": "text", 					"text": "If yes, what liquor?", 					"options":[{ 						"id": "SAC_1_0_2_0_0", 						"type": "text", 						"text": "How many shots?" 					}] 				}] 			}] 		}, { 			"id": "SAC_1_1", 			"type": "radio", 			"text": "No" 		}]    	}, { 		"id": "SAC_2", 		"question": "Did you consume caffeine today?", 		"answers": [{ 			"id": "SAC_2_0", 			"type": "radio", 			"text": "Yes", 			"options": [{ 				"id": "SAC_2_0_0", 				"type": "checkbox", 				"text": "Coffee", 				"options": [{ 					"id": "SAC_2_0_0_0", 					"type": "text", 					"text": "How many 8oz cups?" 				}] 			}, { 				"id": "SAC_2_0_1", 				"type": "checkbox", 				"text": "Tea", 				"options": [{ 					"id": "SAC_2_0_1_0", 					"type": "text", 					"text": "How many 8oz cups?" 				}] 			}, { 				"id": "SAC_2_0_2", 				"type": "checkbox", 				"text": "Other", 				"options": [{ 					"id": "SAC_2_0_2_0", 					"type": "text", 					"text": "How many milligrams?" 				}] 			}] 		}, { 			"id": "SAC_2_1", 			"type": "radio", 			"text": "No" 		}] 	}, { 		"id": "SAC_3", 		"question": "Did you consume drugs today?", 		"answers": [{ 			"id": "SAC_3_0", 			"type": "radio", 			"text": "Yes", 			"options": [{ 				"id": "SAC_3_0_0", 				"type": "checkbox",  				"text": "Marijuana", 				"options": [{ 					"id": "SAC_3_0_0_0", 					"type": "checkbox", 					"text": "Recreational Marijuana", 					"options": [{ 						"id": "SAC_3_0_0_0_0", 						"type": "text", 						"text": "How many grams?" 					}] 				}, { 					"id": "SAC_3_0_0_1", 					"type": "checkbox", 					"text": "Medicinal Marijuana", 					"options": [{ 						"id": "SAC_3_0_0_0_1", 						"type": "text", 						"text": "How many grams?" 					}]  				}] 			}, { 				"id": "SAC_3_0_1", 				"type": "checkbox", 				"text": "Cocaine", 				"options": [{ 					"id": "SAC_3_0_1_0", 					"type": "text", 					"text": "How many grams?" 				}] 			}, { 				"id": "SAC_3_0_2", 				"type": "checkbox", 				"text": "Other drug", 				"options": [{ 					"id": "SAC_3_0_2_0", 					"type": "text", 					"text": "What drug?" 				}, { 					"id": "SAC_3_0_2_1", 					"type": "text", 					"text": "How many grams?" 				}] 			}] 		}] 	}]   }]';
    var data = JSON.parse(text);

    function submit() {
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

        if (localStorage.getItem("SAC") == null) {
            var answerJ = '{"title": "Sleep, Alcohol, Caffeine Tracker", "groups": [{';
            answerJ += '"date": ' + '"' + date + '", ';
            answerJ += '"answers": [';

            var full = document.querySelectorAll("input");
            for (var i = 0; i < full.length; i++) {
                if (full[i].type == "checkbox") {
                    if (full[i].checked == true) {
                        answerJ += '{"id": "' + full[i].id + '", "answer": "Yes"}, ';
                    } else {
                        answerJ += '{"id": "' + full[i].id + '", "answer": "No"}, ';
                    }
                } else if (full[i].type == "text") {
                    answerJ += '{"id": "' + full[i].id + '", "answer": "' + full[i].value + '"}, ';
                } else if (full[i].type == "radio") {
                    if (full[i].checked == true) {
                        answerJ += '{"id": "' + full[i].id + '", "answer": "Yes"}, ';
                    } else {
                        answerJ += '{"id": "' + full[i].id + '", "answer": "No"}, ';
                    }
                }
            }
            answerJ = answerJ.substring(0, answerJ.length - 2); //gets rid of extra comma
            answerJ += ']}';
            answerJ += ']}';
            localStorage.setItem("SAC", answerJ);
        } else if (localStorage.getItem("SAC") != null) {
            var ls = localStorage.getItem("SAC");
            ls = ls.substring(0, ls.length - 2); //gets rid of last } and ]
            ls += ', {';
            var answerJ = '';
            answerJ += '"date": ' + '"' + date + '", ';
            answerJ += '"answers": [';

            var full = document.querySelectorAll("input");
            for (var i = 0; i < full.length; i++) {

                if (full[i].type == "checkbox") {
                    if (full[i].checked == true) {
                        answerJ += '{"id": "' + full[i].id + '", "answer": "Yes"}, ';
                    } else {
                        answerJ += '{"id": "' + full[i].id + '", "answer": "No"}, ';
                    }
                } else if (full[i].type == "text") {
                    answerJ += '{"id": "' + full[i].id + '", "answer": "' + full[i].value + '"}, ';
                } else if (full[i].type == "radio") {
                    if (full[i].checked == true) {
                        answerJ += '{"id": "' + full[i].id + '", "answer": "Yes"}, ';
                    } else {
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
