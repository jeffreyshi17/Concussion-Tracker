function storeToLocalStorage() {
    var date = new Date();
    var save = '{"title": "Symptom Tracker", "time": "'+date.getTime()+'","answers": [';
    var body = document.querySelectorAll("input");
    for(var i = 0; i < body.length; i++){
        if(body[i].type == "range"){
            save +='{"id": "'+ body[i].id +'","value": "'+body[i].value+'"},';
        }
/*        if(body[i].type == "text"){
            save +='{"id": "'+ body[i].id +'","answer": "' + body[i].value +'"},';
        }
*/    }
    save = save.substring(0, save.length - 1);
    save += ']}';
    var d = (date.getFullYear()+"/"+date.getMonth()+1+"/"+date.getDate());
    localStorage.setItem('Symptoms '+d, save);
}
function restoreFromLocalStorage() {
    var json;
    for (var i = localStorage.length-1; i >= 0; i--){
        if(localStorage.key(i).substring(0,8) == "Symptoms"){
            json = JSON.parse(localStorage.getItem(localStorage.key(i)));
            console.log(json);
            break;
        }
    }
    var input = document.querySelectorAll("input");
	for(var i = 0; i < input.length; i++){
        if(input[i].type == 'range'){
            input[i].value = json.answers[i].value;
        }
		if(input[i].type == "text"){
			input[i].value = json.answers[i].answer;
		}
	}
}
var clearLocal = function(){
	localStorage.clear();
}
var createSummary = function(){
window.location.href = "results";
}
document.getElementById("save").addEventListener("click",storeToLocalStorage);
document.getElementById("check").addEventListener("click",restoreFromLocalStorage);
document.getElementById("clear").addEventListener("click",clearLocal);
document.getElementById("summary").addEventListener("click",createSummary);
