function storeToLocalStorage() {
    //RTP Protocol
    var level;
    var jtime;
    if(localStorage.length == 0){
        level = 0;
    }
    for (var i = localStorage.length-1; i >= 0; i--){
        if(localStorage.key(i).substring(0,8) != "Symptoms"){
            level = 0;
        }
        if(localStorage.key(i).substring(0,8) == "Symptoms"){
            json = JSON.parse(localStorage.getItem(localStorage.key(i)));
            jtime = json.time;
            level = parseInt(json.form[json.form.length-1].level);
            break;
				console.log(save);
        }
    }
    //RTP protocol
	
    var date = new Date();
    var body = document.querySelectorAll("input");
    if(localStorage.getItem('Symptoms') == null){
        var save = '{"title": "Symptom Tracker", "form":[{"date": "'+date+'", "level":"'+ level+'",  "answers":[';
        for(var i = 0; i < body.length; i++){
            if(body[i].type == "range"){
                save +='{"id": "'+ body[i].id +'","value": "'+body[i].value+'"},';
            }
        }
    save = save.substring(0, save.length - 1);
    save += ']}]}';
    localStorage.setItem('Symptoms',save);
    }
    else{
        var save = localStorage.getItem('Symptoms');
		console.log(save);
		save = JSON.parse(save);
		position = save.form.length;
		save.form[position] = 
           {
            date: date,
			level: level,
            answers: {}
			}	;
        //save = save.substring(0, save.length-2);
       // save += ',{"date": "'+date+'", "answers":[';
        for(var i = 0; i < body.length; i++){
            if(body[i].type == "range"){
                //save +='{"id": "'+ body[i].id +'","value": "'+body[i].value+'"},';
				save.form[position].answers[i] =  {
				id: "",
				values: ""
				};
				save.form[position].answers[i].id =  body[i].id;
				save.form[position].answers[i].id =  body[i].value;
            }
        }
        //save = save.substring(0, save.length-1);
        //save += ']}]}';
				console.log("1");

		console.log(save);
        localStorage.setItem('Symptoms',JSON.stringify(save));
    }
    //RTP Protocol
    var change = false;
    var fullday = false;
	var json =  JSON.parse(localStorage.getItem("Symptoms"));
	var jtime = new Date(json.form[json.form.length-1].date);
	//var njtime = json.form[json.form.length-2].time;
	if(json.form.length-2 < 0  ){
		njtime = jtime;
	}
	else{
	var njtime = new Date(json.form[json.form.length-2].date);
	}
	if(njtime.getTime() - jtime.getTime() >= 86400000){
		fullday = true;
	}
	for(var x = 0; x <=21 ; x+=1){
		if(json.form.length-2 >= 0  ){
			if(json.form[json.form.length-1].answers[x].value < json.form[json.form.length-2].answers[x].value && level >= 1){
				change = true;
			}
		}
	}


    if(change == false && fullday == true && ((njtime - jtime) >= 86400000)){
        level = level + 1;
    }
    else if(change == true && ((njtime - jtime) >= 86400000)){
        level -= 1;
    }
    var stage = ["No Physical Activity", "Light Aerobic Exercise", "Sport-specific Training", "Non-contact Drills", "Full-contact Drills", "Return to Play"];
    document.getElementById("rtp").innerHTML = stage[level];
    for (var i = localStorage.length-1; i >= 0; i--){
        if(localStorage.key(i).substring(0,8) == "Symptoms"){
            var json = JSON.parse(localStorage.getItem(localStorage.key(i)));
            json.form[json.form.length-1].level = level.toString();
            break;
        }
    }
    localStorage.setItem("Symptoms", JSON.stringify(json)); 
    //RTP Protocol
}
function restoreFromLocalStorage() {
    var json = JSON.parse(localStorage.getItem("Symptoms"));
    var input = document.querySelectorAll("input");
    for(var i = 0; i < input.length; i++){
        if(input[i].type == 'range'){
            input[i].value = json.form[json.form.length-1].answers[i].value;
        }
        if(input[i].type == "text"){
            input[i].value = json.form[json.form.length-1].answers[i].answer;
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
//document.getElementById("check").addEventListener("click",restoreFromLocalStorage);
//document.getElementById("clear").addEventListener("click",clearLocal);
//document.getElementById("summary").addEventListener("click",createSummary);
