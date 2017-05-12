var answersSrc = JSON.parse(localStorage.init);
var questionSrc = JSON.parse(localStorage.initForm).form;
$(document).ready(function () {
    populateLists();
});

$('#submit').on('click', function () {
        exportCSV();    
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
    for (var i = 0; i < structure.length; i++) {
        addElement(el, structure[i], answers);
    }
}

function addElement(el, structureObj, answers) {
    var id = structureObj.id;
    var type = structureObj.type;
    var text = structureObj.text;
    var answer = answers[answers.indexOf(id) + 1];
    var answerElement = document.createElement('li');
    var ulElement = document.createElement('ul');
    if (type == "text" || type == "date" || type == "range") {
        if (answer != "" || answer != 0) {
            answerElement.innerText = answer;
            ulElement.append(answerElement);
            el.append(ulElement);
        }
    }
    else if (type == "radio" || type == "checkbox") {
        if (answer) {
            answerElement.innerText = text;
            ulElement.append(answerElement);
            el.append(ulElement);
        }
    }
    else if (type == "select") {
        if (answer != 0) {
            answerElement.innerText = answer;
            ulElement.append(answerElement);
            el.append(ulElement);
        }
    }
    //el.append("<ul></ul>");
    if (structureObj["options"]) {
        for (var i = 0; i < structureObj["options"].length; i++) {
            addElement(answerElement, structureObj["options"][i], answers);
        }
        //console.log(structureObj, structureObj["options"][0], structureObj["options"].length);
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
    var answersJSON = JSON.parse(localStorage.init);
    var csv = [['id', 'answer']];
    var csvRows = [];
    for (var i = 0; i < answersJSON.length; i++) {
        for (var j = 0; j < answersJSON[i].answers.length; j++) {
            csv.push(["\"" + answersJSON[i].answers[j].id + "\"", "\"" + answersJSON[i].answers[j].answer + "\""]);
        }
    }
    console.log(csv);
    for (var i = 0; i < csv.length; i++) {
        csvRows.push(csv[i].join(','));
    }
    csv = csvRows.join("%0A");
    
    var a = document.createElement('a');
    a.href = 'data:attachment/csv,' + csv;
    a.target = '_blank';
    a.download = 'init.csv';
    document.body.appendChild(a);
    a.click();
    
}
