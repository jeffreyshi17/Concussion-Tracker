var pageName = 'menstrual';


function storeToLocalStorage(localStorageVariableName) {
    var ancestor = document.getElementById('container'),
        descendents = ancestor.getElementsByTagName('INPUT');
    var i, e;
    for (i = 0; i < descendents.length; ++i) {
        e = descendents[i];
        var answer = {};
        var id = e.id.substring(0, e.id.indexOf("_"));
        var idIndex = idlist.indexOf(id);
        answer.id = e.id;
        if (e.type == "text" || e.type == "date") {
            answer.answer = e.value;
        }
        if (e.type == "checkbox" || e.type == "radio") {
            answer.answer = e.checked;
        }
        if (e.type == "range") {
            answer.answer = $("#" + e.id + "Val").innerHTML;
        }
        console.log(e, id, idIndex);
        answersObj[idIndex].answers.push(answer);
    }
    var s = JSON.stringify(answersObj);
    localStorage.setItem(localStorageVariableName, s);
}

function restoreFromLocalStorage(localStorageVariableName) {
    if (localStorage.getItem(localStorageVariableName)) {
        var a = JSON.parse(localStorage.getItem(localStorageVariableName));
        for (var i = 0; i < a.length; i++) {
            for (var j = 0; j < a[i].answers.length; j++) {
                var q = a[i].answers[j];
                if (document.getElementById(q.id)) {
                    var type = document.getElementById(q.id).type;
                    if (type == "checkbox" || type == "radio") {
                        document.getElementById(q.id).checked = q.answer;
                    } else {
                        document.getElementById(q.id).value = q.answer;
                    }
                }
            }
        }
    }
}
