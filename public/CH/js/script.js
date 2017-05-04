var pageName = 'init';

function JSONsuccess() {
    JSONsrc = JSON.parse(localStorage[pageFormName]).form;
    generatePage();
    restoreFromLocalStorage(pageName);
    hideunhide();
}


function storeToLocalStorage(localStorageVariableName) {
    var inputs = Array.prototype.slice.call(document.getElementById('container').getElementsByTagName('INPUT')).concat(Array.prototype.slice.call(document.getElementById('container').getElementsByClassName('slider-value')));
    var i, e;
    for (i = 0; i < inputs.length; ++i) {
        e = inputs[i];
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
        if ($(e).attr('class') == "slider-value") {
            answer.answer = e.innerHTML;
        }
        answersObj[idIndex].answers.push(answer);
    }
    var s = JSON.stringify(answersObj);
    localStorage.setItem(localStorageVariableName, s);
}
