$(document).ready(function () {
    if (localStorage.length === 0) {
	document.getElementById("viewSavedAnswers").disabled=true;
    }
    $('input:checkbox').change(function () {
        if ($(this).is(":checked")) {
            if (document.getElementById(this.id + "form")) {
                document.getElementById(this.id + "form").style.display = "block";
                var m = $("#" + this.id + "form").find('.suboption').find('input:checkbox')
                for (var j = 0; j < m.length; j++) {
                    m[j].checked = false;
                }
                $("#" + this.id + "form").find('input:text').val('');
            }
        }
        else {
            if (document.getElementById((this).id + "form")) {
                document.getElementById((this).id + "form").style.display = "none";
            }
        }
    });
    $('input:radio').change(function () {
        if ($(this).is(":checked")) {
            var x = document.getElementsByName(this.name);
            for (var i = 0; i < x.length; i++) {
                if (document.getElementById(x[i].id + "form")) {
                    document.getElementById(x[i].id + "form").style.display = "none";
                    var m = $("#" + this.id + "form").find('.suboption').find('input:checkbox')
                    for (var j = 0; j < m.length; j++) {
                        m[j].checked = false;
                    }
                    $("#" + x[i].id + "form").find('input:text').val('');
                }
            }
            if (document.getElementById(this.id + "form")) {
                document.getElementById(this.id + "form").style.display = "block";
            }
        }
    });
});

function checkFields(question) {
    var checks_radios = $(question).find(':checkbox, :radio')
        , inputs = $(question).find(':input').not(checks_radios).not('[type="submit"],[type="button"],[type="reset"]')
        , checked = checks_radios.filter(':checked')
        , filled = inputs.filter(function () {
            return $.trim($(this).val()).length > 0;
        });
    if (checked.length + filled.length === 0) {
        return false;
    }
    return true;
}
var localstoragedata;
$('#container').submit(function () {
    var data = {
        "title": "Concussion History"
        , "answers": []
    };
    var questions = document.getElementById("container").getElementsByClassName("question");
    var incomplete = 0;
    for (var i = 0; i < questions.length; i++) {
        if (!checkFields(questions[i])) {
            questions[i].getElementsByClassName("alert")[0].innerText = "**This question is required.";
            incomplete++;
        }
        else {
            questions[i].getElementsByClassName("alert")[0].innerText = "";
        }
    }
    if (incomplete == 0) {
        var descendents = document.getElementById('container').getElementsByTagName('INPUT');
        for (var i = 0; i < descendents.length; ++i) {
            var e = descendents[i];
            if (e.type == "text") {
                if (e.value != "") {
                    data.answers.push({
                        id: e.id
                        , answer: e.value
                    });
                }
            }
            if (e.type == "checkbox" || e.type == "radio") {
                if (e.checked) {
                    data.answers.push({
                        id: e.id
                        , answer: e.checked
                    });
                }
            }
        }
        localStorage.setItem("CH", JSON.stringify(data));
        scroll(0,0)
    window.location.href = 'symptoms';
    } 
        return false;
});

document.getElementById("viewSavedAnswers").addEventListener("click", function () {
    window.location.href = 'summary';
});
