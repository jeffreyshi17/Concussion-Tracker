function storeToLocalStorage() {
    var date = new Date();
    var save = '{"title": "Symptom Tracker", "time": "'+date.getTime()+'","answers": [';
    var body = document.querySelectorAll("input");
    for(var i = 0; i < body.length; i++){
        if(body[i].type == "range"){
            save +='{"id": "'+ body[i].id +'","value": "'+body[i].value+'"},';
        }
        if(body[i].type == "text"){
            save +='{"id": "'+ body[i].id +'","answer": "' + body[i].value +'"},';
        }
    }
    save = save.substring(0, save.length - 1);
    save += ']}';
    var d = (date.getFullYear()+"/"+date.getMonth()+1+"/"+date.getDate());
    localStorage.setItem('Symptoms '+d, save);
}
function restoreFromLocalStorage() {
	var max = localStorage.getItem(5);
}

var clearLocal = function(){
	localStorage.clear();
}

var createSummary = function(){
window.location.href = "summary";
}

document.getElementById("save").addEventListener("click",storeToLocalStorage);
document.getElementById("check").addEventListener("click",restoreFromLocalStorage);
document.getElementById("clear").addEventListener("click",clearLocal);
document.getElementById("summary").addEventListener("click",createSummary);
