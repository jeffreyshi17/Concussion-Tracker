var freqData = [];
var symptomDictionary = {};
var daily_data;
if (localStorage.daily) {
    daily_data = JSON.parse(localStorage.daily);
}
var daily_form;
if (localStorage.daily) {
    daily_form = JSON.parse(localStorage.dailyForm).form[0].questions;
}
$(document).ready(function () {
    loadData();
    generateButtons();
    generateDictionary();
    updateData();
});

function generateDictionary() {
    for (var k = 0; k < daily_form.length; k++) {
        symptomDictionary[daily_form[k].answers[0].id] = daily_form[k].question;
    }
}

function generateButtons() {
    for (var i = 0; i < symptomNames.length; i++) {
        var label = document.createElement('label');
        label.className = 'btn btn-primary';
        var button = document.createElement('input');
        button.type = 'checkbox';
        button.id = daily_form[i].answers[0].id;
        button.autocomplete = 'off';
        label.innerText = symptomNames[i];
        label.appendChild(button);
        $('#symptomButtons').append(label);
    }
    $('input:checkbox').change(function () {
        updateData();
    }); //for some reason, Headaches always saves as 0;
}
var dayData = {};
var symptomNames = [];
var symptomPoints = {};
var dateLabels = [];

function loadData() {
    for (var i = 0; i < daily_data.length; i++) {
        dateLabels.push(daily_data[i].date);
        dayData[daily_data[i].date] = {};
        dayData[daily_data[i].date].symptoms = [];
        dayData[daily_data[i].date].points = [];
        for (var j = 0; j < daily_data[i].answers[0].answers.length; j++) { //parse answers 
            if (!(parseInt(daily_data[i].answers[0].answers[j].answer) === 0) && !(isNaN(daily_data[i].answers[0].answers[j].answer)) && !(daily_data[i].answers[0].answers[j].answer == "")) {
                dayData[daily_data[i].date].symptoms.push(daily_data[i].answers[0].answers[j].id);
                dayData[daily_data[i].date].points.push(daily_data[i].answers[0].answers[j].answer);
            }
        }
    }
    for (var k = 0; k < daily_form.length; k++) {
        symptomNames.push(daily_form[k].question);
    }
    
    
    for (var k = 0; k < daily_form.length; k++) {
        symptomPoints[daily_form[k].answers[0].id] = [];
        console.log(daily_form[k].answers[0].id);
        for (var date in dayData) {
            var dataPoint = 0;
            day = dayData[date];
            if (day.symptoms.indexOf(daily_form[k].answers[0].id)!=-1) {
                var pos = day.symptoms.indexOf(daily_form[k].answers[0].id);
                dataPoint = day.points[pos];
            }
            symptomPoints[daily_form[k].answers[0].id].push(dataPoint);
        }
    }
    
    for (var i = 0; i < dateLabels.length; i++) {
    dateLabels[i]=new Date(dateLabels[i]).toDateString();
    }
}
var data;

function updateData() {
    data = {
        labels: dateLabels
        , datasets: [

        ]
        , options: {
            legend: {
                display: true
                , labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            }
        }
    }
    var inputs = document.getElementById('symptomButtons').getElementsByTagName('INPUT');
    var i, e;
    for (i = 0; i < inputs.length; ++i) {
        e = inputs[i];
        if (e.checked) {
            var temp = {
                label: symptomDictionary[e.id]
                , fillColor: "rgba(220,220,220,0)"
                , strokeColor: "rgba(220,220,220,1)"
                , pointColor: "rgba(220,220,220,1)"
                , pointStrokeColor: "#fff"
                , data: symptomPoints[e.id]
            }
            data.datasets.push(temp);
        }
    }
    var count = 10;
    /*
    var data = {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
            , datasets: [
                {
                    fillColor: "rgba(220,220,220,0)"
                    , strokeColor: "rgba(220,220,220,1)"
                    , pointColor: "rgba(220,220,220,1)"
                    , pointStrokeColor: "#fff"
                    , data: [65, 59, 90, 81, 56, 45, 30, 20, 3, 37]
			}
                , {
                    fillColor: "rgba(151,187,205,0.5)"
                    , strokeColor: "rgba(151,187,205,1)"
                    , pointColor: "rgba(151,187,205,1)"
                    , pointStrokeColor: "#fff"
                    , data: [28, 48, 40, 19, 96, 87, 66, 97, 92, 85]
			}
		]
        }
        */
    var ctx = document.getElementById("myChart").getContext("2d");
    var myNewChart = new Chart(ctx);
    myNewChart.Line(data, optionsNoAnimation);
}

function updateChart() {
    myNewChart.Line(data, optionsNoAnimation);
}
var optionsAnimation = {
        //Boolean - If we want to override with a hard coded scale
        scaleOverride: true, //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps: 10, //Number - The value jump in the hard coded scale
        scaleStepWidth: 1, //Number - The scale starting value
        scaleStartValue: 0
    }
    // Not sure why the scaleOverride isn't working...
var optionsNoAnimation = {
    animation: false, //Boolean - If we want to override with a hard coded scale
    scaleOverride: true, //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps: 10, //Number - The value jump in the hard coded scale
    scaleStepWidth: 1, //Number - The scale starting value
    scaleStartValue: 0
}