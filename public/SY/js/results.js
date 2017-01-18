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
        input[i].disabled = "true";
    }
}
document.getElementById("container").addEventListener("load",restoreFromLocalStorage());

