var express = require('express'),
app = express(),
http = require('http'),
server = http.createServer(app),
fs = require('fs'),
ejs = require('ejs'),
port = process.env.PORT || 3000;

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.get('/', function(req, res){
        res.render('index.ejs');
});

app.get('/concussionhistory', function(req, res){
        res.locals.data = JSON.parse(fs.readFileSync("data/concussiontracker.json", 'utf8'));
        res.render('concussionhistory.ejs');
});

app.get('/summary', function(req, res){
        res.locals.data = JSON.parse(fs.readFileSync("data/concussiontracker.json", 'utf8'));
        res.render('summary.ejs');
});


app.get('/symptoms', function(req, res){
        res.locals.data = JSON.parse(fs.readFileSync("data/concussiontracker.json", 'utf8'));
        res.render('symptoms.ejs');
});
app.listen(port);

console.log("Server working");
