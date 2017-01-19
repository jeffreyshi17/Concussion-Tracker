var express = require('express')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , fs = require('fs')
    , ejs = require('ejs')
    , port = process.env.PORT || 3000;

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.get('/', function(req, res){
        res.render('index.ejs');
});
app.get('/question', function(req, res){
        res.locals.data = JSON.parse(fs.readFileSync("data/concussiontracker.json", 'utf8'));
        res.render('concussionhistory.ejs');
});
app.get('/summary', function(req, res){
        res.locals.data = JSON.parse(fs.readFileSync("data/concussiontracker.json", 'utf8'));
        res.render('summary.ejs');
});
app.get('/symptoms', function(req, res){
        res.locals.data = JSON.parse(fs.readFileSync("data/symptoms.json", 'utf8'));
        res.render('symptoms.ejs');
});
app.get('/results', function(req, res){
        res.locals.data = JSON.parse(fs.readFileSync("data/symptoms.json", 'utf8'));
        res.render('results.ejs');
});
app.get('/recoveryactivities', function(req, res){
        res.locals.data = JSON.parse(fs.readFileSync("data/recoveryActivities.json", 'utf8'));
        res.render('recoveryactivities.ejs');
});
app.get('/about', function(req, res){
		res.render('about.ejs');
});
app.get('/faq', function(req, res){
        res.locals.data = JSON.parse(fs.readFileSync("data/faq.json", 'utf8'));
        res.render('faq.ejs');
});
app.get('/menstrualtracker', function(req, res){
        res.locals.data = JSON.parse(fs.readFileSync("data/menstrualtracker.json", 'utf8'));
        res.render('menstrualtracker.ejs');
});
app.get('/sactracker', function(req, res){
        res.locals.data = JSON.parse(fs.readFileSync("data/sac.json", 'utf8'));
        res.render('sac.ejs');
});
app.get('/results', function(req, res){
	    res.locals.data = JSON.parse(fs.readFileSync("data/symptoms.json", 'utf8'));
        res.render('results.ejs');
});
app.listen(port);

http.createServer(function (req, res) {
    console.log('request received');
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    var response = (fs.readFileSync("data/concussiontracker.json", 'utf8')).replace(/(\r\n|\n|\r)/gm, "") 
    res.end('_concussiontracker(\'' + response + '\')');
}).listen(8124);
console.log("Server working");
