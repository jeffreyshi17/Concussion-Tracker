var input = document.querySelectorAll("input");
function restoreFromLocalStorage() {
    var json;
    for (var i = 0; i < localStorage.length; i++){
        if(localStorage.getItem(localStorage.key(i)).substring(11,26) == "Symptom Tracker"){
            json = JSON.parse(localStorage.getItem(localStorage.key(i)));
			document.getElementById("date").innerHTML = json.form[0].date;
			for(var k = 0; k < input.length; k++){
				if(input[k].type == 'range'){
					input[k].value = json.form[0].answers[k].value;
				}
				if(input[k].type == "text"){
					input[k].value = json.form[0].answers[k].answer;
				}
				input[k].disabled = "true";
			}
			cutRows();
        }
    }
}
function cutRows(){
	for(var k = input.length-1; k >= 0; k--){
		//console.log(input.length);
		//console.log(k+": "+input[k].value);
		if(input[k].value == 0){
			var table = document.getElementById('table');
			var id = input[k].id;
			var cut = parseInt(id.substring(3,id.length));
			//console.log(k+": "+cut);
			table.deleteRow(cut+2);
		}
	}
}
document.getElementById("container").addEventListener("load",restoreFromLocalStorage());

