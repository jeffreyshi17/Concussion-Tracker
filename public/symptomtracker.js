var testMode = false;
if(localStorage.getItem('test') != null){
	if(localStorage.getItem('test') == "true"){
	testMode = true;
	}
	else{
	testMode = false;
	}
}
console.log(testMode);

if(localStorage.getItem('step') == null){
	$("#returnToPlay").hide();
} 
else{
	$("#returnToPlay").show();
}
	


document.addEventListener('DOMContentLoaded', function() {
	//Symptom Tracker Buttons
	document.getElementById("save").addEventListener("click", storeLocal);
	document.getElementById("clear").addEventListener("click", clearLocal);
	//document.getElementById("summary").addEventListener("click", createSummary);
	//Return to Play Buttons
	//document.getElementById("activateRTP").addEventListener("click", activateRTP);
	//document.getElementById("testRTP").addEventListener("click", testRTP);
	document.getElementById("returnToPlay").addEventListener("click", function () { window.location.href = 'returnToPlayForServer.html';
});
	if (testMode == false){
		if(localStorage.getItem('symptoms') != null){
		var checkDate = new Date();
			checkDate = checkDate.getTime();
			var jsonDisp = JSON.parse(localStorage.getItem('symptoms'));
			if(checkDate - jsonDisp.form[jsonDisp.form.length-1].timestamp > 86400000){
			$("input").prop('disabled', false);
			}
			else{
			$("input").prop('disabled', true);	
			 alert("Inputs are still disabled because 24 hours have not elapsed.");
			}
		}
	}
	else if (testMode == true){
		$("input").prop('disabled', false);	
	}
});


// 
// 
var ansTable = document.getElementById("table");
var symNames = [];
for(j=1; j<ansTable.rows.length; j++){
	symNames.push(ansTable.rows[j].cells[0].innerHTML);
}

//
// 	


var inputAll = document.querySelectorAll("input");

var storeLocal = function() {
	//set up timestamp
	var date = new Date();
	date = date.getTime();
	//

	if(localStorage.getItem('symptoms') == null){
	var save = '{ "title": "Symptom Tracker", "form":[';
	var run = false;
	save += '{"timestamp": "' + date +'", "responses":[';
		for (k = 0; k < inputAll.length; k++) {
			save+='{"id": "' +inputAll[k].id + '",';
			//
			//save+='{"symptom": "' + symNames[k] + '",';
			save+='"symptom": "' +symNames[k] + '",';
			//inputAll.length must equal symNames.length for this to work for future reference
			save+='"value": "' +inputAll[k].value +'"},' 
			run=true
		}
		if(run){
			save = save.substring(0, save.length-1);
		}
	save += ']}]'; //closes responses object and form object
	// first ']' closes all response objects 
	// '}' goes up one level to the form object and closes first form object
	// second ']' closes all form objects
	save += '}'; //closes JSON
	localStorage.setItem("symptoms",save);
}

	else{
	var save = localStorage.getItem('symptoms');
	save = save.substring(0, save.length-2);
	var run = false;
	save += ',';
	save += '{"timestamp": "' +date+'", "responses":[';
		for (k = 0; k < inputAll.length; k++) {
			save+='{"id": "' +inputAll[k].id + '",';
			//
			//save+='{"symptom": "' + symNames[k] + '",';
			save+='"symptom": "' +symNames[k] + '",';
			//inputAll.length must equal symNames.length for this to work for future reference
			save+='"value": "' +inputAll[k].value +'"},' 
			run=true
		}
		if(run){
			save = save.substring(0, save.length-1);
		}
	save += ']}]'; //closes responses object and form object
	// first ']' closes all response objects 
	// '}' goes up one level to the form object and closes first form object
	// second ']' closes all form objects
	save += '}'; //closes JSON
	localStorage.setItem("symptoms",save);
	}
	
	if(testMode == false){
	$("input").prop('disabled', true);
	alert("Your symptoms have been saved. Inputs are now disabled for 24 hours. Please come back tomorrow to update your symptoms.");
	}
	else{
	$("input").prop('disabled', false);
	}
}

var restoreLocal = function() {
	var jsonDisplay = JSON.parse(localStorage.getItem("symptoms"));
	for (k = 0; k < jsonDisplay.answers.length; k++) {
		if(jsonDisplay.answers[k].value != ""){
			for (i = 0; i < inputAll.length; i++){
				if(inputAll[i].id == jsonDisplay.answers[k].id){
					inputAll[i].value = jsonDisplay.answers[k].value;
				}
			}
		}
	}
	for(k=0; k< inputAll.length; k++){
		if(inputAll[k].type == 'range'){
		$("#"+inputAll[k].id+"v").text($("#"+inputAll[k].id).val());  
		}
	}
}

var clearLocal = function() {
	localStorage.clear();
}

var activateRTP = function() {
	if(localStorage.getItem("symptoms") == null){
		window.alert("You must track your symptoms once to activate return to play!")
	}
	else{
		localStorage.setItem("step", "1000");
		var jsonSym = JSON.parse(localStorage.getItem("symptoms"));
		localStorage.setItem("form", jsonSym.form.length-1);
	}
}

var iterator = 1;

$("#clear").hide();
$("#message").hide();
if(localStorage.getItem("test") == "true"){
	$("#message").show();
}

var testRTP = function() {
	iterator++;
	if((iterator % 2) === 0){
		$("#clear").show();
		$("#message").show();
		localStorage.setItem("test", "true");
		testMode = true;
		$("input").prop('disabled', false);
	}
	else{
		$("#clear").hide();
		$("#message").hide();
		localStorage.setItem("test", "false");
		testMode = false;
	}
}

var createSummary = function() {
	window.location.href = "summary";
}

for(k=0; k< inputAll.length; k++){
if(inputAll[k].type == 'range'){

$("#"+inputAll[k].id+"v").text($("#"+inputAll[k].id).val());  

$("#"+inputAll[k].id).on('change', function(){
	for(k=0; k< inputAll.length; k++){
    $("#"+inputAll[k].id+"v").text($("#"+inputAll[k].id).val());
	}
});
}

}
