$(document).ready(function () {
    var found = false;
    var json = JSON.parse(localStorage.getItem("CH"));
    console.log(json);
    var descendents = document.getElementById('container').getElementsByTagName('INPUT');
    for (var i = 0; i < descendents.length; ++i) {
        var e = descendents[i];
        if (e.type == "text") {
                found = false;
            for (var j = 0; j < json.answers.length; j++) {
                var ans = json.answers[j];
                console.log(ans.id, ans.type);
                if (ans.id == e.id && (ans.type).indexOf(e.type) != -1) {
                    //e.value = ans.answer;
                    found = true;
                    var text = document.createElement('span');
                    text.innerText = ans.answer;
                    e.parentNode.appendChild(text);
                    // $(e).remove();
                    //i--;
                    break;
                }
            }
                if (found == false) {
                    $(e.parentNode).remove();
                    i--;
                }
        }
        if (e.type == "checkbox" || e.type == "radio") {
                found = false;
            for (var j = 0; j < json.answers.length; j++) {
                var ans = json.answers[j];
                if (ans.id == e.id) {
                    e.checked = true;
                    found = true;
                }
            }
                if (found == false) {
                    $(e.parentNode).remove();
                    i--;
                }
        }
    }
    
    var descendents = document.getElementById('container').getElementsByTagName('INPUT');
    for (var i = 0; i < descendents.length; ++i) {
        descendents[i].disabled = "true";
    }

});
