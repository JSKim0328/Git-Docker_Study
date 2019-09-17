const express = require('express');
const app = express();
const fs = require('fs');
const template = require('./HTML_Template');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const qs = require('querystring');

app.get('/', function (request, response) {
  fs.readdir('./data/', function (err, flist) {
    fs.readFile('./data/Welcome', function (err, data) {
      var title = 'Welcome';
      var list = template.list(flist);
      var html_template = template.html(title, list, 
        `
        <button onclick="location.href='/create'">new page</button>
        `, 
      data);

      response.send(html_template);
    });
  });
});

app.get('/page/:pageID', function (request, response) {
  fs.readdir('./data/', function (err, flist) {
    var pageID = path.parse(request.params.pageID).base;

    fs.readFile(`./data/${pageID}`, function (err, data) {

      if (err) {
        response.writeHead(404);
        response.end("Not Found");
        return;
      }

      var title = sanitizeHtml(request.params.pageID);
      var list = template.list(flist);
      var description = sanitizeHtml(data);
      var html_template = template.html(title, list, 
        `
        <button onclick="location.href='/create'">new page</button>
        <button onclick="location.href='/update/${title}'">update</button>
        <form action="/delete" method="post" style="display: inline">
          <input type="hidden" name='title' value='${title}'>
          <button type="submit">delete</button>
        </form>
        `, 
      description);

      response.send(html_template);
    });
  });
});

app.get('/create', function (request, response) {

  response.send(template.html('Create Page', '', '',
  `
    <form action="/create" method="post">
      <input type="text" name="title" placeholder="title"> <br><br>
      <textarea name="description" cols="30" rows="10" placeholder="description"></textarea> <br><br>
      <button type="submit">생성</button>
    </form>
  `
  ));
});

app.post('/create', function(request, response) {
  var body = '';

  request.on('data', function (data) {
    body += data;
  });

  request.on('end', function () {
    var post = qs.parse(body);
    var title = sanitizeHtml(path.parse(post.title).base);
    var description = sanitizeHtml(post.description);

    fs.writeFile(`./data/${title}`, description, 'utf8', function (err) {
      response.redirect(302, `/page/${title}`);
    });
    
  });
});

app.get('/update/:pageID', function (request, response) {
  var pageID = path.parse(request.params.pageID).base;

  fs.readFile(`./data/${pageID}`, function (err, data) {

    if (err) {
      response.writeHead(404);
      response.end("Not Found");
      return;
    }

    var title = sanitizeHtml(pageID);
    var description = sanitizeHtml(data);

    response.send(template.html('title', '', '',
    `
    <form action="/update" method="post">
      <input type='hidden' name='pre_title' value='${title}'>
      <input type="text" name="title" value="${title}"> <br><br>
      <textarea name="description" cols="30" rows="10">${description}</textarea> <br><br>
      <button type="submit">수정</button>
    </form>
    `
    ));
  });
});

app.post('/update', function (request, response) {
  var body = '';

  request.on('data', function (data) {
    body += data;
  });

  request.on('end', function () {
    var post = qs.parse(body);

    var title = sanitizeHtml(path.parse(post.title).base);
    var description = sanitizeHtml(post.description);
    
    fs.rename(`./data/${post.pre_title}`, `./data/${title}`, function (err) {
      fs.writeFile(`./data/${title}`, description, 'utf8', function (err) {
        response.redirect(302, `/page/${title}`);
      })
    });
  });
});

app.post('/delete', function (request, response) {
  var body = '';

  request.on('data', function (data) {
    body += data;
  });

  request.on('end', function () {
    var post = qs.parse(body);

    var title = path.parse(post.title).base;

    fs.unlink(`./data/${title}`, function (err) {
      response.redirect(302, `/`);
    });
    
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


// no express 버전
/*
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./HTML_Template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var pathname = url.parse(_url, true).pathname;
  var queryData, title;

  if (pathname === '/') {
    queryData = url.parse(_url, true).query;

    if (_url == '/') {
      title = "Welcome";
    } else {
      title = path.parse(queryData.id).base;
    }

    fs.readFile(`data/${title}`, 'utf8', function (err, description) {
      if (err) {
        response.writeHead(404);
        response.end('Not Found');
        return;
      }

      fs.readdir('./data/', function (err, flist) {
        var list = template.list(flist);

        response.writeHead(200);
        if (title === 'Welcome') {
          response.end(template.html(title, list,
            `<button onclick="location.href='/create_page'">new page</button>`,
            description));
        } else {
          response.end(template.html(title, list,
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
    response.end(template.html('Create Page', '', '',
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

        var sanitizedTitle = sanitizeHtml(path.parse(post.title).base);
        var sanitizedDescription = sanitizeHtml(post.description);

        fs.writeFile(`data/${sanitizedTitle}`, sanitizedDescription, 'utf8', function (err) {
          response.writeHead(302, { Location: `/?id=${sanitizedTitle}` });
          response.end();
        });
        
      });
    } else {
      response.writeHead(200);
      response.end('data is not posted');
    }

  } else if (pathname === '/update_page') {
    queryData = url.parse(_url, true).query;
    sanitizedtitle = sanitizeHtml(path.parse(queryData.id).base);

    fs.readFile(`data/${sanitizedtitle}`, 'utf8', function (err, description) {
      if (err) {
        response.writeHead(404);
        response.end('Not Found');
        return;
      }

      var sanitizedDescription = sanitizeHtml(description);

      response.writeHead(200);
      response.end(template.html(sanitizedtitle, '', '',
        `
        <form action="/update_process" method="post">
          <input type='hidden' name='pre_title' value='${sanitizedtitle}'>
          <input type="text" name="title" value="${sanitizedtitle}"> <br><br>
          <textarea name="description" cols="30" rows="10">${sanitizedDescription}</textarea> <br><br>
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

        fs.rename(`data/${post.pre_title}`, `data/${path.parse(post.title).base}`, function (err) {
          fs.writeFile(`data/${path.parse(post.title).base}`, post.description, 'utf8', function (err) {
            response.writeHead(302, { Location: `/?id=${path.parse(post.title).base}` });
            response.end();
          });
        });
        
      });
    } else {
      response.writeHead(200);
      response.end('Invalid Access');
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
      response.end('Invalid Access');
    }

  } else {
    response.writeHead(404);
    response.end('Not Found');
  }

});
app.listen(3000);
*/