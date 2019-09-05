var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHtml(title, list, control, description) {
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
      ${control}
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
  var queryData, title;

  if (pathname === '/') {
    queryData = url.parse(_url, true).query;

    if (_url == '/') {
      title = "Welcome";
    } else {
      title = queryData.id;
    }

    fs.readFile(`data/${title}`, 'utf8', function (err, description) {
      if (err) {
        response.writeHead(404);
        response.end('Not Found');
        return;
      }

      fs.readdir('./data/', function (err, flist) {
        var list = makeList(flist);

        response.writeHead(200);
        if (title === 'Welcome') {
          response.end(templateHtml(title, list,
            `<button onclick="location.href='/create_page'">new page</button>`,
            description));
        } else {
          response.end(templateHtml(title, list,
            `<button onclick="location.href='/create_page'">new page</button>
            <button onclick="location.href='/update_page?id=${title}'">update</button>
            <form action="/delete_process" method="post" style="display: inline">
              <input type="hidden" name='title' value='${title}'>
              <button type="submit">delete</button>
            <form>`,
            description));
        }
      });

    });


  } else if (pathname === '/create_page') {
    response.writeHead(200);
    response.end(templateHtml('Create Page', '', '',
      `
      <form action="/create_process" method="post">
        <input type="text" name="title" placeholder="title"> <br><br>
        <textarea name="description" cols="30" rows="10" placeholder="description"></textarea> <br><br>
        <button type="submit">생성</button>
      </form>
      `
    ));

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

  } else if (pathname === '/update_page') {
    queryData = url.parse(_url, true).query;
    title = queryData.id;

    fs.readFile(`data/${title}`, 'utf8', function (err, description) {
      if (err) {
        response.writeHead(404);
        response.end('Not Found');
        return;
      }

      response.writeHead(200);
      response.end(templateHtml(title, '', '',
        `
        <form action="/update_process" method="post">
          <input type='hidden' name='pre_title' value='${title}'>
          <input type="text" name="title" value="${title}"> <br><br>
          <textarea name="description" cols="30" rows="10">${description}</textarea> <br><br>
          <button type="submit">수정</button>
        </form>
        `
      ));

    });

  } else if (pathname === '/update_process') {
    if (request.method === 'POST') {
      var body = '';

      request.on('data', function (data) {
        body += data;
      });

      request.on('end', function () {
        var post = qs.parse(body);
        
        fs.rename(`data/${post.pre_title}`, `data/${post.title}`, function (err) {
          fs.writeFile(`data/${post.title}`, post.description, 'utf8', function (err) {
            response.writeHead(302, { Location: `/?id=${post.title}` });
            response.end();
          });
        });
        
      });
    } else {
      response.writeHead(200);
      response.end('data is not posted');
    }

  } else if (pathname === '/delete_process') {
    if (request.method === 'POST') {
      var body = '';

      request.on('data', function (data) {
        body += data;
      });

      request.on('end', function () {
        var post = qs.parse(body);
        
        fs.unlink(`data/${post.title}`, function (err) {
          response.writeHead(302, { Location: `/` });
          response.end();
        })
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