var request = require('request');
var fs = require('fs');

var count = 0;

function match(req, res){
  var sFile = req.files.img;
  if (!req.files)
      return res.status(400).send('No files were uploaded.');
  sFile.mv('./public/uploaded/picture'+count+'.png', function (err){
    count++;
    if (err)
      return res.status(500).send(err);
    res.sendStatus(200);
  });
}

function matchURL(req, res){
  var _url = req.body.fUrl;
  var imgName = 'public/uploaded/'+'picture'+count+'.png';
  count++;
  //TODO: check url before getting img

  download(_url, imgName, function(){console.log("done");});
  res.sendStatus(200);
}

function download(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

exports.download = download;
exports.match = match;
exports.matchURL = matchURL;
exports.count = count;
