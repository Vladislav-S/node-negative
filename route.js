var request = require('request');
var fs = require('fs');
var Jimp = require('jimp');

var count = 0;
var _path = 'public/uploaded/';
var _webPath = 'uploaded/';

function match(req, res){
  var mime = '.png';
  var sFile = req.files.img;
  var _imgName = "picture" + count + mime;
  if (!req.files) return res.status(400).send('No files were uploaded.');
  sFile.mv('./public/uploaded/' + _imgName, function (err){
    var currentImg = _webPath + _imgName;
    count++;
    if (err) return res.status(500).send(err);
    convertImage(_path + _imgName);
    res.status(200);
    res.send(currentImg);
  });
}

function matchURL(req, res){
  var _url = req.body.fUrl;
  var _imgName = 'picture'+count+'.png'
  var imgName = _path + _imgName;
  count++;
  //TODO: check url before getting img

  download(_url, imgName, function(){console.log("done");
    convertImage(imgName);
    res.status(200);
    //res.sendFile(imgName, {root: __dirname});
    res.send(_webPath+_imgName);
  });
  //
}

function download(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

function convertImage(path){
  Jimp.read(path, function(err, img){
    if(err) throw err;
    img.mirror(true, false);
    img.write(path);
  });
}

exports.download = download;
exports.match = match;
exports.matchURL = matchURL;
exports.count = count;
