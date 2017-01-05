var saveData = function (){
var save = '{"title": "Concussion History","answers": [';
var hasBeenViewed = false;

var body = document.querySelectorAll("input");
for(var i = 0; i < body.length; i++){
	if(body[i].checked == true){
		save +='{"id": "'+ body[i].id +'","answer": "Yes"},';
	}
	if(body[i].type == "text"){
		save +='{"id": "'+ body[i].id +'","answer": "' + body[i].value +'"},';
	}
}
save = save.substring(0, save.length - 1);
save += ']}';
localStorage.setItem('json', save);
}
var display  = function(){
if(!hasBeenViewed){
		var json = JSON.parse(localStorage.getItem('json'));
		var body = document.querySelectorAll("input");
		for(var i = 0; i < body.length; i++){
			var answer = findById(body[i].id, json);
			if (answer == null){
				removeElement(body[i].nextSibling);
				body[i].hidden = true;
				continue;
			}
			if(body[i].type == 'radio' && answer.answer == "Yes"){
				body[i].disabled = true;
			}
			else if (body[i].type == 'radio')
			{
				body[i].hidden = true;
			}
			else if (body[i].type == 'text' && answer != null && findById(answer.id.substring(0, answer.id.length-2), json) != null && findById(answer.id.substring(0, answer.id.length-2), json).answer == 'Yes' ){
				body[i].value = answer.answer;
				body[i].disabled = true;
			}
			else {
				body[i].hidden = true;
			}
		}
	document.getElementById('header1').innerHTML = "Recovery Activies Results";
	document.getElementById('header2').innerHTML = "These are the results";

	hasBeenViewed= true;
	}
}
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('submit').addEventListener('click', saveData);
	document.getElementById('display').addEventListener('click', display);
	correct();
});

var findById  = function(id_, array) {	
	if (array == null){
		return null;
	}
	for (var i = 0; i < array.answers.length; i++) {
		if (array.answers[i].id === id_)
			return array.answers[i];
	}
	return null;
}
var removeElement = function(node) {
	node.parentNode.removeChild(node);
}
var correct = function(){
	var body = document.querySelectorAll("input");
	for(var i = 0; i < body.length; i++){
		body[i].hidden = false;
		body[i].disabled = false;
		body[i].checked = false;
		body[i].value = "";
	}
	hasBeenViewed= false;
};
