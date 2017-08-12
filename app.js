var fs = require('fs');
var express = require('express');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var request = require('request');
var options = require('./sconfig');
var r = require('./route')
var app = express();

//https://i.vimeocdn.com/portrait/58832_300x300

//-----------
app.use(fileUpload());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static('public'));

//------------
app.get('/', function (req, res){  //return main page
  res.sendFile("index.html");
});
app.post('/action', r.match); //working with uploaded file

app.post('/action/url', r.matchURL); //working with uploaded by url image

//------------
app.listen(options['port'], function(){
  console.log("listening port: " + options['port']);
});



//fUrl

/*
download('https://i.vimeocdn.com/portrait/58832_300x300', 'public/uploaded/test.png', function(){
  console.log('done');
});
*/
