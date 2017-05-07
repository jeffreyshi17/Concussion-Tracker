var jsonSymptoms = JSON.parse(localStorage.getItem("daily"));

var jsonQuestionnaire = JSON.parse(localStorage.getItem("init"));
var x = 0; //initlal text box count
$("#submitError").hide();

if(localStorage.getItem("init") == null){
	$("#completeSym").hide();
	$("#currentStep").hide();
	$("#problematicSymptoms").hide();
	$("#nextStep").hide();
	$("#current").hide();
	$("#pre-injury").hide();
	window.alert("You must complete the initial questionnare before you can access return to play or the activity tracker.");

}



  

var steps = ["No physical activity: rest until you are not exhibiting symptoms.", "You may participate in light aerobic exercise.", "You may participate in sport specific training. (No Contact)", "You may participate in non-contact drills.", "You may participate in full contact drills.", "You may return to play!"];

var symptomArr = ["Headaches", "Pressure in Head", "Nausea/Vomiting", "Sensitivity to light", "Sensitivity to Noise", "Dizziness/Vertigo", "Slowed Down", "In a Fog", "Not Right", "Difficulty Concentrating", "Memory Difficulties", "Fatigued or Low Energy", "Confused", "Irritable", "Sad", "Nervous", "Anxious", "Drowsy", "Sleeping More Than Usual", "Sleeping Less Than Usual", "Balance Problems", "Neck Pain"];

$("#doctorCheckedText").hide();

if(localStorage.getItem("step") == null){
	$("#completeSym").hide();
	$("#currentStep").hide();
	$("#problematicSymptoms").hide();
	$("#nextStep").hide();
	$("#current").hide();
	$("#pre-injury").hide();
	window.alert("You must activate return to play before you can access it!");

}


var update = true;



console.log(jsonSymptoms[jsonSymptoms.length-1].answers[0].answers[1].answer);
//console.log(jsonSymptoms);

if(!(jsonSymptoms.length > localStorage.getItem("form"))){
	$("#completeSym").show();
	$("#currentStep").show();
	$("#problematicSymptoms").show();
	$("#nextStep").show();
	$("#current").show();
	update = false;
}

console.log("after");

var currentStep = localStorage.getItem("step");




if(currentStep === '1000'){
	currentStep = 0;
	
}

var add = false;
var addit = false;
var nextStep = 0;
var problematicSymptoms = "";
var symptomCheckResponse = symptomCheck(jsonSymptoms);





$(document).ready(function(){

	
	


if(symptomCheckResponse.length != 0){

	problematicSymptoms = "You must wait for these symptoms to return to their baseline value before you can advance: ";

	if(parseInt(currentStep) > 0){
		if(update){
		currentStep--;
		}	
		
		problematicSymptoms = "You have been sent back to the previous step because you were exhibiting symptoms. You must wait for these symptoms to return to their baseline value before you can advance: ";
	
	}

	for (var i = 0; i < symptomCheckResponse.length; i++) {
				
		problematicSymptoms += symptomCheckResponse[i] + ", ";

	}
	problematicSymptoms = problematicSymptoms.substring(0, problematicSymptoms.length-2);

	

	

		

}
else{     //for when there are no symptoms out of bounds
	if(update && parseInt(currentStep) === 4){
		if(localStorage.getItem("slider")=== "yes"){
			currentStep++;
			localStorage.setItem("slider", "no");
		}
		else{//button wasn't clicked
			if(update){
				problematicSymptoms = "Your doctor must approve you for full return to play before you can advance";
			}
			else{
				problematicSymptoms = "You must complete the symptom tracker again to view updated Return to Play status";   
			}
			
		}//else
	}
	else{//not step 4 when page was loaded
		if(!(parseInt(currentStep) === 5 || parseInt(currentStep) === 4 )){
			if(update){
				currentStep++;
				addit = true;
			}
		}
		

	}//else
}//else

	if (parseInt(currentStep) === 4){
		
		
		
		$("#doctorCheckedText").show();

		

	}

	nextStep = parseInt(currentStep) + 1;


	$("#currentStep").html("<h2>" + steps[currentStep] + "</h2>");
	if(!(parseInt(currentStep) === 5)){
		$("#nextStep").html("The next step once you advance will be: " + steps[nextStep]);
	}
	else{
		$("#nextStep").html("");
	}

	if(parseInt(currentStep) === 4){
		$("#problematicSymptoms").html("Please consult your doctor and ask if you are ready to return to play. If your doctor approves, click on the slider.");
	}
	else{
		$("#problematicSymptoms").html(problematicSymptoms);
	}


	if(update || parseInt(currentStep) === 5){
	$("#completeSym").html("");
	}
	else{
		$("#completeSym").html("You must complete the symptom tracker again to view updated Return to Play status");
	}





if(!(currentStep > 5)){
	localStorage.setItem("step", currentStep);
}



    var max_fields      = 99; 
    var wrapper         = $(".input_fields_wrap"); 
    var add_button      = $(".add_field_button"); 
    
    
    $(add_button).click(function(e){ 
        e.preventDefault();
        if(x < max_fields){ 
            x++; 
            
            $(wrapper).append('<div><tr><td><input type="text" id="' + x + 'b0"/></td>&nbsp&nbsp&nbsp&nbsp&nbsp<td><input type="text" id="' + x + 'b1"/></td><td><a href="#" class="remove_field">Remove</a></td></tr></div>'); //add input box
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })


    if(parseInt(currentStep) === 0){
		$("#allowedAct").html("<h3>You should not complete any physical activity</h3>");
	}
	
	else{
		var allowedActString = " ";
		for(var p = parseInt(currentStep); p > 0; p--){
			allowedActString += "" + steps[p] + " <br>";
		}
		$("#allowedAct").html("<h3>You are allowed to do these types of activities:</h3>" + allowedActString);
	}




});// doc ready


var jsonActivity = localStorage.getItem("activityTracker");
var jsonActivityString = "";


$('#subButton').on("click", function() {
	if( $("#0b0").val() === ""){
		$("#submitError").show();
	}
	else{

		$("#submitError").hide();
		if(jsonActivity != null){
			var getDate = new Date();
			getDate = getDate.getTime();
			jsonActivity = jsonActivity.substring(0, jsonActivity.length-2);
			jsonActivity += ',{"timeStamp": "' + getDate + '","trackedActivies":[';

			for(var i = 0; i<=x; i++){
				var idString0 = '#' + i + 'b0';
				var enteredText0 = $(idString0).val();
				var idString1 = '#' + i + 'b1';
				var enteredText1 = $(idString1).val();
				jsonActivity += '{"activity":"' + enteredText0 + '", "duration":"' + enteredText1 + '"},';
			}
			jsonActivity = jsonActivity.substring(0, jsonActivity.length-1);
			jsonActivity += ']}]}';
			localStorage.setItem("activityTracker", jsonActivity);
			location.reload();



		}
		else{//build the json for the first submission

			var getDate = new Date();
			getDate = getDate.getTime();
			jsonActivityString = '{"Submissions":[{"timeStamp": "' + getDate + '","trackedActivies":[';
		
			for(var i = 0; i<=x; i++){
				var idString0 = '#' + i + 'b0';
				var enteredText0 = $(idString0).val();
				var idString1 = '#' + i + 'b1';
				var enteredText1 = $(idString1).val();
				jsonActivityString += '{"activity":"' + enteredText0 + '", "duration":"' + enteredText1 + '"},';
			}
			jsonActivityString = jsonActivityString.substring(0, jsonActivityString.length-1);
			jsonActivityString += ']}]}';
			localStorage.setItem("activityTracker", jsonActivityString);
			location.reload();
		}
	}



});



$('#doctorCheckedText').on("click", function() {

	if($('#doctorChecked').prop('checked')){
		
		localStorage.setItem("slider", "yes");
	}
	else{

		localStorage.setItem("slider", "no");

	}

	});


var formLength = jsonSymptoms.length;

if(addit){
	formLength + 1;
}

localStorage.setItem("form", formLength);



//returns symptoms[].length = 0 if all symptoms are at baseline
//returns symptoms[numOfSymptoms] if any symptom 
  


function symptomCheck(){
	var symptoms = [];
	

	console.log("length: " + jsonSymptoms[jsonSymptoms.length-2].answers[0].answers.length);
	for(var i = 1; i < jsonSymptoms[jsonSymptoms.length-1].answers[0].answers.length; i++){
		//console.log("i: " + i);
		
		if((jsonSymptoms[jsonSymptoms.length-1].answers[0].answers[i].answer - jsonQuestionnaire[2].answers[86 + i*2].answer > 0)){
			symptoms.push(symptomArr[i-1]);
		}

	}// for iterating through symptoms. 

	return symptoms;

}

