function storeToLocalStorage() {
    var parent = document.getElementById('container')
        , children = parent.getElementsByTagName('input');
    var i, e;
    for (i = 0; i < children.length; ++i) {
        e = children[i];
        if (e.type == "text" && e.value!="") {
            localStorage.setItem(e.id, e.value);
        }
        if (e.type == "checkbox" && e.checked!="false") {
            localStorage.setItem(e.id, e.checked);
        }
        if (e.type == "range"){
            localStorage.setItem(e.id, e.value);
        }
    }
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
