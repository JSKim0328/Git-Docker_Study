var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHtml(title, list, list_button, description, ) {
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
      ${list_button}
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
  var pathname = url.parse(_url, true).pathname;

  if (pathname === '/') {
    var queryData = url.parse(_url, true).query;
    var title;

    if (_url == '/') {
      title = "Welcome";
    } else {
      title = queryData.id;
    }

    fs.readFile(`data/${title}`, 'utf8', function (err, description) {

      fs.readdir('./data/', function (err, flist) {
        var list = makeList(flist);

        response.writeHead(200);
        response.end(templateHtml(title, list,
          `<input type="button" onclick="location.href='http://localhost:3000/create_page'" value="new page">`,
          description));
      });

    });


  } else if (pathname === '/create_page') {
    response.writeHead(200);
    response.end(templateHtml('Create Page', '', '',
    `<form action="http://localhost:3000/create_process" method="post">
      <label for="title"></label> <br>
      <input type="text" name="title" placeholder="title"> <br><br>
      <label for="description"></label>
      <textarea name="description" cols="30" rows="10" placeholder="description"></textarea> <br><br>
      <button type="submit">생성</button>
    </form>
    `));

  } else if (pathname === '/create_process') {

    if (request.method === 'POST') {
      var body = '';

      request.on('data', function (data) {
        body += data;
      });

      request.on('end', function () {
        var post = qs.parse(body);
        fs.writeFile(`data/${post.title}`, post.description, 'utf8', function (err) {
          response.writeHead(302, { Location: `/?id=${post.title}` });
          response.end();
        });
        
      });
    } else {
      response.writeHead(200);
      response.end('data is not posted');
    }

  } else {
    response.writeHead(404);
    response.end('Not Found');
  }

});
app.listen(3000);