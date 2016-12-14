function restoreFromLocalStorage() {
	var parent = document.getElementById('container'), children = parent.getElementsByTagName('input');
	var i;
	for(i = 0; i < children.length; i++){
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
		 children[i].disabled = "true";
 	}
}
document.getElementById("container").addEventListener("load",restoreFromLocalStorage());