var jsonSymptoms = JSON.parse(localStorage.getItem("symptoms"));

var jsonQuestionnaire = JSON.parse(localStorage.getItem("initialAnswers"));

if(localStorage.getItem("initialAnswers") == null){
	$("#completeSym").hide();
	$("#currentStep").hide();
	$("#problematicSymptoms").hide();
	$("#nextStep").hide();
	$("#current").hide();
	$("#pre-injury").hide();
	window.alert("You must complete the initial questionnare before you can access return to play");

}





var steps = ["No physical activity: rest until you are not exhibiting symptoms.", "You may participate in light aerobic exercise.", "You may participate in sport specific training. (No Contact)", "You may participate in non-contact drills.", "You may participate in full contact drills.", "You may return to play!"];



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


if(!(jsonSymptoms.form.length > localStorage.getItem("form"))){
	$("#completeSym").show();
	$("#currentStep").show();
	$("#problematicSymptoms").show();
	$("#nextStep").show();
	$("#current").show();
	update = false;
}



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

});// doc ready



$('#doctorCheckedText').on("click", function() {

	if($('#doctorChecked').prop('checked')){
		
		localStorage.setItem("slider", "yes");
	}
	else{

		localStorage.setItem("slider", "no");

	}

	});



	

var formLength = jsonSymptoms.form.length;

if(addit){
	formLength + 1;
}

localStorage.setItem("form", formLength);








//returns symptoms[].length = 0 if all symptoms are at baseline
//returns symptoms[numOfSymptoms] if any symptom 
  


function symptomCheck(){
	var symptoms = [];
	

	
	for(var i = 0; i < jsonSymptoms.form[jsonSymptoms.form.length-1].responses.length; i++){
		
		if((jsonSymptoms.form[jsonSymptoms.form.length-1].responses[i].value - jsonQuestionnaire[6].answers[i*3].answer > 0)){
			symptoms.push(jsonSymptoms.form[jsonSymptoms.form.length-1].responses[i].symptom);
		}

	}// for iterating through symptoms. 

	return symptoms;

}
