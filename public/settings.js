$(document).ready(function() {
	if (localStorage.getItem("init") != null) {
	restoreFromLocalStorage("init");
	}
    if (localStorage.getItem("symptoms") == null) {
        $("#eRTP").hide();
        $("#eRTPText").html("You must track your symptoms once before you can enable Return To Play");
    }

    $("#eRTP").change(function() {
        console.log("entered");
        console.log($("#eRTPbutton"));



        if ($("#eRTPbutton")[0].checked) {
            console.log("entered if state");

            localStorage.setItem("step", "1000");
            var jsonSym = JSON.parse(localStorage.getItem("symptoms"));
            localStorage.setItem("form", jsonSym.form.length - 1);

        }

    });

    $("#eTestMode").change(function() {
        if ($("#eTestModeButton")[0].checked) {
            localStorage.setItem('test', 'true');

        } else {
            localStorage.setItem('test', 'false');
        }
    });

});

$("button").click(function (e) {
    saveToLocalStorageButton();
    e.preventDefault();
});

document.querySelectorAll('.update').forEach(function(button) {
    button.onclick = function() {
        var localCopy = JSON.parse(localStorage.init);
        button.parentNode.querySelectorAll('input').forEach(function(input) {
            if (document.getElementById(input.id).type != "checkbox") {
                eval(input.id + " = '" + input.value + "'");
            } else {
                eval(input.id + " = " + input.checked);
            }
            localStorage.init = JSON.stringify(localCopy);
            location.reload();
            location.reload();
        });
    }
});
function saveToLocalStorageButton(){
	var a = JSON.parse(localStorage.getItem("init"));
	var ids = ["PI_0_0", "PI_1_0", "PI_2_0", "PI_2_1", "PI_2_2", "PI_2_3", "PI_3_0"]; 
	for (var i = 0; i <ids.length; i++){
		var question = document.getElementById(ids[i]);
		var change = question.value;
		for(var j = 0; j < a[0].answers.length; j++){
			if (a[0].answers[j].id == ids[i]){
				a[0].answers[j].answer = change;
				//console.log(ids[i]);
			}
		}
	}
	localStorage.setItem("init", JSON.stringify(a));
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
                    } else if ($('#' + q.id).attr('class') == "slider-value") {
                        $('#' + q.id + "_slider").slider().slider("value", q.answer);
                        document.getElementById(q.id).innerText = q.answer;
                    } else {
                        document.getElementById(q.id).value = q.answer;
                    }
                }
				if (document.getElementById(q.id+"H")){
					
					var ele = document.getElementById(a[i].answers[j].id +"H");
                    if (q.id = "PI_0_0") {
                        ele.innerHTML = q.answer;
                    } 
					else if (q.id = "PI_1_0") {
                        ele.innerHTML = q.answer;
                    }
					else if(a[i].answers[j].answer == true && a[i].answers[j].id == "PI_2_0"){
					ele.innerHTML = "male";
					}
					else if(a[i].answers[j].answer == true && a[i].answers[j].id == "PI_2_1"){
					ele.innerHTML = "female";
					}
					else if(a[i].answers[j].answer == true && a[i].answers[j].id == "PI_2_2"){
					ele.innerHTML = a[i].answers[j+1].answer;
					}
					else if (q.id = "PI_3_0") {
                        ele.innerHTML = q.answer;
                    }
                }
            }
        }
    }
}










