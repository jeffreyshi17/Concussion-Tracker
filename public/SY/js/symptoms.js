function storeToLocalStorage() {
    var save = '{"title": "Symptom Tracker","answers": [';
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
    var date = new Date();
    localStorage.setItem('Symptoms '+date.getTime(), save);
}
function restoreFromLocalStorage() {
	var parent = document.getElementById('container'), children = parent.getElementsByTagName('input');
	var i;
	for(i = 0; i < children.length; i++){
        if (children[i].type=="range"){
            if(localStorage.getItem(children[i].id) != ""){
                children[i].value = localStorage.getItem(children[i].id);
            }
            else children[i].value = 0;
        }
		if (children[i].type=="checkbox"){
			if(localStorage.getItem(children[i].id) == "false"){
				children[i].checked = false;
			}
			else if(localStorage.getItem(children[i].id) == "true"){
				children[i].checked = true;
			}
 		}
 		 if(children[i].type == "text"){
 		 	if(localStorage.getItem(children[i].id) != ""){
 		 		children[i].value = localStorage.getItem(children[i].id);
 		 	}
 		 }
 	}
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
