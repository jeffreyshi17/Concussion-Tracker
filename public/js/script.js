var pageFormName = pageName + 'Form';
var jsonDirectory = pageName + 'json';
var JSONsrc;
var answersObj = [];
var idlist = [];
$.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    }
});

if (!localStorage[pageFormName] || ($('#versionnumber').text().replace(/\s+/g, '') != JSON.parse(localStorage[pageFormName]).version)) {
    updateJSON();
} else {
    JSONsuccess();
}

function updateJSON() {
    $.ajax({
        url: 'http://concussiontracker.herokuapp.com/' + jsonDirectory,
        dataType: "json",
        timeout: 5000,
        success: function (data) {
            localStorage[pageFormName] = data;
            JSONsuccess();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('failed to update json');
        }
    });
}

function JSONsuccess() {
    JSONsrc = JSON.parse(localStorage[pageFormName]).form;
    generatePage();
    restoreFromLocalStorage(pageName);
    hideunhide();
}

function generatePage() {
    generateForm();
    $('input:checkbox').change(function () {
        hideunhide();
    });
    $('input:radio').change(function () {
        hideunhide();
    });

    $('#submit').on('click', function () {
        storeToLocalStorage(pageName);
        window.location.replace("/results");
    });

    var current = 1;
    widget = $(".step");
    btnnext = $(".next");
    btnback = $(".back");
    btnsubmit = $(".submit");


    // Change progress bar action
    setProgress = function (currstep) {
        var percent = parseFloat(100 / widget.length) * currstep;
        percent = percent.toFixed();
        $(".progress-bar").css("width", percent + "%").html(percent + "%");
    }

    // Hide buttons according to the current step
    hideButtons = function (current) {
        var limit = parseInt(widget.length);

        $(".action").hide();

        if (current < limit) btnnext.show();
        if (current > 1) btnback.show();
        if (current == limit) {
            btnnext.hide();
            btnsubmit.show();
        }
    }

    // Init buttons and UI
    widget.not(':eq(0)').hide();
    hideButtons(current);
    setProgress(current);

    // Next button click action
    btnnext.click(function () {
        if (current < widget.length) {
            widget.show();
            widget.not(':eq(' + (current++) + ')').hide();
            $("html, body").animate({
                scrollTop: 0
            }, "fast");

            setProgress(current);
        }
        storeToLocalStorage(pageName);
        hideButtons(current);
    })

    // Back button click action
    btnback.click(function () {
        if (current > 1) {
            current = current - 2;
            btnnext.trigger('click');
        }
        hideButtons(current);
    })
}

function generateForm() {
    var form = document.createElement('form');
    for (var k = 0; k < JSONsrc.length; k++) {
        //Creating localStorage Object
        var temp = {};
        temp.title = JSONsrc[k].title;
        temp.answers = [];
        answersObj.push(temp);
        idlist.push(JSONsrc[k].id);

        var section = document.createElement('div');
        section.className = "step well";
        //title, description
        var title = document.createElement('h1');
        title.className = "page-header";
        var description = document.createElement('h2');
        title.appendChild(document.createTextNode(JSONsrc[k]["title"]));
        title.id = JSONsrc[k].id;
        description.appendChild(document.createTextNode(JSONsrc[k]["desc"]));
        section.appendChild(title);
        section.appendChild(description);
        //Generating the actual form
        for (var i = 0; i < JSONsrc[k]["questions"].length; i++) {
            var e = document.createElement('h3');
            e.innerHTML = JSONsrc[k]["questions"][i].question;
            section.appendChild(e);
            var l1 = JSONsrc[k]["questions"][i];
            if (l1["answers"]) {
                appendOptions(e, l1["answers"], 0);
            }
        }

        form.appendChild(section);
    }

    if (container.firstChild) container.insertBefore(form, container.firstChild);
    else container.appendChild(form);
}

function appendOptions(e1, lev, x) {
    var el; //container wrapper
    var other = false; //boolean other
    var select = false; //boolean select
    if (e1.innerText.indexOf("Other") != -1) {
        other = false;
    }
    if (lev[0] && lev[0].type == "select") {
        select = true;
    }
    if (select) {
        el = document.createElement('select');
    } else {
        el = document.createElement('span');
    }
    el.className = "option level" + x;
    for (var i = 0; i < lev.length; i++) {
        if (select) {
            ex = appendOption(el, lev[i]);
            if (lev[i]["options"]) {
                appendOptions(el, lev[i]["options"], x + 1);
            }
        } else {
            singop = document.createElement('div');
            if (other) {
                ex = appendOption(e1, lev[i]);
                //add directly to target
            } else {
                ex = appendOption(singop, lev[i]);
                el.appendChild(singop);
                //add to div
            }
            if (lev[i]["options"]) {
                appendOptions(singop, lev[i]["options"], x + 1);
            }
        }
    }
    e1.appendChild(el);
}

function appendOption(target, op) {
    id = op.id;
    type = op.type;
    text = op.text || "";
    text = $('<textarea />').html(text).text();
    var spancontainer = document.createElement('span');
    var input = document.createElement('input');
    var label = document.createElement('label');
    input.type = type;
    input.id = id;
    if (type == "select") {
        var input = document.createElement('option');
        input.value = text;
        input.innerHTML = text;
        target.appendChild(input);
    } else if (type == "range") {
        input = document.createElement('div');
        var slidervalue = document.createElement('span');
        var tabElement = document.createElement('tab');
        tabElement.align = "right";
        slidervalue.id = id;
        slidervalue.className = "slider-value";
        label.htmlFor = id + "_slider";
        input.id = id + "_slider";
        $(slidervalue).css("padding-left", "10px");
        label.appendChild(document.createTextNode(text));
        target.appendChild(label);
        target.appendChild(tabElement);
        spancontainer.appendChild(input);
        target.appendChild(spancontainer);
        target.appendChild(slidervalue);
        $(slidervalue).text(0);
        $(input).slider({
            orientation: "horizontal",
            min: 0,
            max: 10,
            value: 0,
            step: 1,
            animate: "fast",
            create: function () {
                $(slidervalue).text($(this).slider("value"));
            },
            slide: function (event, ui) {
                $(slidervalue).text(ui.value);
            }
        });
    } else { //checkbox, textbox, radio
        input.name = id.substring(0, id.lastIndexOf("_"));
        label.htmlFor = id;
        label.appendChild(document.createTextNode(text));
        if (type == "text") {
            if (text != "") {
                $(spancontainer).css("padding-left", "10px");
            }
            input.className = "form-control";
            target.appendChild(label);
            spancontainer.appendChild(input);
            target.appendChild(spancontainer);
        } else if (type == "") {
            target.appendChild(label);
        } else if (type == "checkbox") {
            target.appendChild(input);
            target.appendChild(label);
        } else if (type == "date") {
            target.appendChild(input);
            target.appendChild(label);
        } else {
            target.appendChild(input);
            target.appendChild(label);
        }
    }
    return input;
}

function hideunhide() {
    $("input:checkbox").each(function () {
        if (!$(this).is(':checked')) {
            for (var i = 0; i < this.parentNode.childNodes.length; i++) {
                if ($(this.parentNode.childNodes[i]).hasClass("option")) {
                    this.parentNode.childNodes[i].style.display = "none";
                }
            }
        } else {
            for (var i = 0; i < this.parentNode.childNodes.length; i++) {
                if ($(this.parentNode.childNodes[i]).hasClass("option")) {
                    this.parentNode.childNodes[i].style.display = "block";
                }
            }
        }

    });
    $("input:radio").each(function () {
        if (!$(this).is(':checked')) {
            for (var i = 0; i < this.parentNode.childNodes.length; i++) {
                if ($(this.parentNode.childNodes[i]).hasClass("option")) {
                    this.parentNode.childNodes[i].style.display = "none";
                }
            }
        } else {
            for (var i = 0; i < this.parentNode.childNodes.length; i++) {
                if ($(this.parentNode.childNodes[i]).hasClass("option")) {
                    this.parentNode.childNodes[i].style.display = "block";
                }
            }
        }
    });
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
            }
        }
    }
}
