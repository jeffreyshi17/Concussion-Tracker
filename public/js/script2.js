var answerSrc=JSON.parse(localStorage.init);
var questionSrc=JSON.parse(localStorage.initForm);

function generateAnswerArray(){
    var answers={};
    for(i=0;i<7;i++){
        for(j=0;j<answerSrc[i].answers.length;j++){
            answers.push(answerSrc[i].answers[j].id);
            answers.push(answerSrc[i].answers[j].answer);
        }
    }
    console.log(answers);
}
function populateLists(){
    $("ol").each(function(){
        $(this).children().each(function(){
            var questionId=this.id;
        });

    });

}
function exportCSV() {
    var ancestor = document.getElementById('container'),
        descendents = ancestor.getElementsByTagName('INPUT');
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