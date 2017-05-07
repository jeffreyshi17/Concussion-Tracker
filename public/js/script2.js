var answersSrc = JSON.parse(localStorage.init);
var questionSrc = JSON.parse(localStorage.initForm).form;
$(document).ready(function () {
    populateLists();
});
//var doc = { /* your json */ };
function getById(arr, id) {
    for (var d = 0, len = arr.length; d < len; d += 1) {
        if (arr[d].id === id) {
            return arr[d];
        }
    }
}
//var doc_id_2 = getById(doc.results, 2);
function generateAnswerArray(arr) {
    var answers = [];
    for (j = 0; j < arr.length; j++) {
        //var pos=getPosition(arr[j].id,_,2);
        //if(arr[j].id.substring(0,pos)==filter){
        answers.push(arr[j].id);
        answers.push(arr[j].answer);
        //}
    }
    //console.log(answers);
    return answers;
}
// types: date, text, radio, checkbox, radio to text, checkbox to text, select,range
var answers1;

function recurAppend(el, structure, answers) {
    for (i = 0; i < structure.length; i++) {
        addElement(el, structure[i], answers);
    }
}

function addElement(el, structureObj, answers) {
    var id = structureObj.id;
    var type = structureObj.type;
    var text = structureObj.text;
    var answer = answers[answers.indexOf(id) + 1];
    var answerElement = document.createElement('li');
    if (type == "text" || type == "date" || type == "range") {
        if (answer != "" || answer != 0) {
            answerElement.innerText = answer;
            el.append(answerElement);
        }
    }
    else if (type == "radio" || type == "checkbox") {
        if (answer) {
            answerElement.innerText = text;
            el.append(answerElement);
        }
    }
    else if (type == "select") {
        if (answer != 0) {
            answerElement.innerText = answer;
            el.append(answerElement);
        }
    }
    //var answerElement = document.createElement('li');
    //el.append("<ul></ul>");
    if (structureObj["options"]) {
        /*
        for (i = 0; i < structureObj["options"].length; i++) {
            if (structureObj["options"][i]) {
                addElement(answerElement, structureObj["options"][0], answers);
            }
        }*/
        console.log(structureObj["options"].length);
        //console.log(structureObj, structureObj["options"][0], structureObj["options"].length);
        /*
         */
    }
}

function populateLists() {
    $("ol").each(function () {
        var sectionId = this.id;
        //var sectionId2=          whater.answers[0].id.substring(0,2)
        $(this).children().each(function () {
            var questionId = this.id;
            var structure = getById(getById(questionSrc, sectionId).questions, questionId).answers;
            //questionSrc.form[sectionId].questions[questionId].answers;
            var answersArr = generateAnswerArray(getById(answersSrc, sectionId).answers);
            //console.log($(this).find("ul").attr("class")+", "+structure[1]+", "+answersArr)
            recurAppend($(this).find("ul"), structure, answersArr);
        });
    });
}

function exportCSV() {
    var ancestor = document.getElementById('container')
        , descendents = ancestor.getElementsByTagName('INPUT');
    var csv = [['id', 'answer']];
    var csvRows = [];
    for (i = 0; i < descendents.length; ++i) {
        e = descendents[i];
        var answer = {};
        var id = e.id.substring(0, e.id.indexOf("_"));
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
        csv.push(["\"" + answer.id + "\"", "\"" + answer.answer + "\""]);
        csvRows.push(csv[i].join(','));
    }
    csv = csvRows.join("%0A");
    var a = document.createElement('a');
    a.href = 'data:attachment/csv,' + csv;
    a.target = '_blank';
    a.download = 'PatientInformation.csv';
    document.body.appendChild(a);
    a.click();
}