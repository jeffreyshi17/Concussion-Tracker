var input = document.querySelectorAll("input");
function restoreFromLocalStorage() {
    var json;
    for (var i = localStorage.length-1; i >= 0; i--){
        if(localStorage.key(i).substring(0,8) == "Symptoms"){
            json = JSON.parse(localStorage.getItem(localStorage.key(i)));

			document.getElementById("date").innerHTML = localStorage.key(i).substring(8,localStorage.key(i).length);
			for(var k = 0; k < input.length; k++){
				if(input[k].type == 'range'){
					input[k].value = json.answers[k].value;
				}
				if(input[k].type == "text"){
					input[k].value = json.answers[k].answer;
				}
				input[k].disabled = "true";
			}
			cutRows();
            break;
        }
    }
}
function cutRows(){
	for(var k = input.length-1; k >= 0; k--){
		console.log(input.length);
		console.log(k+": "+input[k].value);
		if(input[k].value == 0){
			var table = document.getElementById('table');
			var id = input[k].id;
			var cut = parseInt(id.substring(3,id.length));
			console.log(k+": "+cut);
			table.deleteRow(cut+2);
		}
	}
}
document.getElementById("container").addEventListener("load",restoreFromLocalStorage());

