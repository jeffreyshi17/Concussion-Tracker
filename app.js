var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    fs = require('fs'),
    ejs = require('ejs'),
    port = process.env.PORT || 3000;
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index.ejs');
});
app.get('/question', function (req, res) {
    res.locals.data = JSON.parse(fs.readFileSync("data/concussiontracker.json", 'utf8'));
    res.render('concussionhistory.ejs');
});

app.get('/recoveryactivities', function (req, res) {
    res.locals.data = JSON.parse(fs.readFileSync("data/recoveryActivities.json", 'utf8'));
    res.render('recoveryactivities.ejs');
});
app.get('/about', function (req, res) {
    res.render('about.ejs');
});
app.get('/faq', function (req, res) {
    res.locals.data = JSON.parse(fs.readFileSync("data/faq.json", 'utf8'));
    res.render('faq.ejs');
});
app.get('/menstrualtracker', function (req, res) {
    res.locals.data = JSON.parse(fs.readFileSync("data/menstrualtracker.json", 'utf8'));
    res.render('menstrualtracker.ejs');
});

app.get('/dailytracker', function (req, res) {
    res.locals.data = JSON.parse(fs.readFileSync("data/daily.json", 'utf8'));
    res.render('dailytracker.ejs');
});
app.get('/results', function (req, res) {
    res.locals.dataCH = JSON.parse(fs.readFileSync("data/concussiontracker.json", 'utf8'));
	res.locals.dataD = JSON.parse(fs.readFileSync("data/daily.json", 'utf8'));
	res.locals.dataMT = JSON.parse(fs.readFileSync("data/menstrualtracker.json", 'utf8'));

    res.render('results.ejs');
});
app.get('/FTQ_results', function (req, res) {
    res.locals.dataCH = JSON.parse(fs.readFileSync("data/concussiontracker.json", 'utf8'));
    res.render('FTQ_results.ejs');
});
app.get('/settings', function (req, res) {
    res.render('settings.ejs');
});
app.get('/returntoplay', function (req, res) {
    res.render('returntoplay.ejs'); 
});
app.get('/initjson', function (req, res) {
    console.log('request received');
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        "Access-Control-Allow-Origin": "*"
    });
    //res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(fs.readFileSync("data/concussiontracker.json", 'utf8'), null, 3));
});
app.get('/dailyjson', function (req, res) {
    console.log('request received');
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        "Access-Control-Allow-Origin": "*"
    });
    //res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(fs.readFileSync("data/daily.json", 'utf8'), null, 3));
});

app.get('/menstrualjson', function (req, res) {
    console.log('request received');
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        "Access-Control-Allow-Origin": "*"
    });
    //res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(fs.readFileSync("data/menstrualtracker.json", 'utf8'), null, 3));
});
app.get('/settings', function (req, res) {
    //res.locals.data = JSON.parse(fs.readFileSync("data/concussiontracker.json", 'utf8'));
    res.render('settings.ejs');
});
app.listen(port);
/*
http.createServer(function (req, res) {
    console.log('request received');
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    var response = (fs.readFileSync("data/concussiontracker.json", 'utf8')).replace(/(\r\n|\n|\r)/gm, "") 
    res.end('_concussiontracker(\'' + response + '\')');
}).listen(8194);
*/
console.log("Listening on port 3000!");
