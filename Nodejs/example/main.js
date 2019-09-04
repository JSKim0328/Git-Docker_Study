var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHtml(title, list, description) {
  return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      <h2>${title}</h2>
      <p>
      ${description}
      </p>
    </body>
    </html>
    `;
}

function makeList(flist) {
  var list = '<ol>';

  for (var i = 0; i < flist.length; ++i) {
    if (flist[i] === 'Welcome') continue;
    list += `<li><a href="/?id=${flist[i]}">${flist[i]}</a></li>`;
  }

  list += '</ol>';
  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;

  if (url.parse(_url, true).pathname !== '/') {
    response.writeHead(404);
    response.end('Not Found');
    return;
  }

  var queryData = url.parse(_url, true).query;
  var title;

  if (_url == '/') {
    title = "Welcome";
  } else {
    title = queryData.id;
  }

  fs.readFile(`data/${title}`, 'utf-8', function (err, description) {

    fs.readdir('./data/', function (err, flist) {
      var list = makeList(flist);

      response.writeHead(200);
      response.end(templateHtml(title, list, description));
    });
    
  });


});
app.listen(3000);