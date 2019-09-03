var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  console.log(queryData.id);
  if (_url == '/') {
    _url = '/index.html';
  }
  if (_url == '/favicon.ico') {
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200);

  if (queryData.id === 'HTML') {
    _url = '/1.html';
  } else if (queryData.id === "CSS") {
    _url = '/2.html';
  } else if ("JavaScript") {
    _url = '/3.html';
  }

  response.end(fs.readFileSync(__dirname + _url));

});
app.listen(3000);