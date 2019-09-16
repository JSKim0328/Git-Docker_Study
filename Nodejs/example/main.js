var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


// var http = require('http');
// var fs = require('fs');
// var url = require('url');
// var qs = require('querystring');
// var template = require('./HTML_Template.js');
// var path = require('path');
// var sanitizeHtml = require('sanitize-html');

// var app = http.createServer(function (request, response) {
//   var _url = request.url;
//   var pathname = url.parse(_url, true).pathname;
//   var queryData, title;

//   if (pathname === '/') {
//     queryData = url.parse(_url, true).query;

//     if (_url == '/') {
//       title = "Welcome";
//     } else {
//       title = path.parse(queryData.id).base;
//     }

//     fs.readFile(`data/${title}`, 'utf8', function (err, description) {
//       if (err) {
//         response.writeHead(404);
//         response.end('Not Found');
//         return;
//       }

//       fs.readdir('./data/', function (err, flist) {
//         var list = template.list(flist);

//         response.writeHead(200);
//         if (title === 'Welcome') {
//           response.end(template.html(title, list,
//             `<button onclick="location.href='/create_page'">new page</button>`,
//             description));
//         } else {
//           response.end(template.html(title, list,
//             `<button onclick="location.href='/create_page'">new page</button>
//             <button onclick="location.href='/update_page?id=${title}'">update</button>
//             <form action="/delete_process" method="post" style="display: inline">
//               <input type="hidden" name='title' value='${title}'>
//               <button type="submit">delete</button>
//             <form>`,
//             description));
//         }
//       });

//     });


//   } else if (pathname === '/create_page') {
//     response.writeHead(200);
//     response.end(template.html('Create Page', '', '',
//       `
//       <form action="/create_process" method="post">
//         <input type="text" name="title" placeholder="title"> <br><br>
//         <textarea name="description" cols="30" rows="10" placeholder="description"></textarea> <br><br>
//         <button type="submit">생성</button>
//       </form>
//       `
//     ));

//   } else if (pathname === '/create_process') {

//     if (request.method === 'POST') {
//       var body = '';

//       request.on('data', function (data) {
//         body += data;
//       });

//       request.on('end', function () {
//         var post = qs.parse(body);

//         var sanitizedTitle = sanitizeHtml(path.parse(post.title).base);
//         var sanitizedDescription = sanitizeHtml(post.description);

//         fs.writeFile(`data/${sanitizedTitle}`, sanitizedDescription, 'utf8', function (err) {
//           response.writeHead(302, { Location: `/?id=${sanitizedTitle}` });
//           response.end();
//         });
        
//       });
//     } else {
//       response.writeHead(200);
//       response.end('data is not posted');
//     }

//   } else if (pathname === '/update_page') {
//     queryData = url.parse(_url, true).query;
//     sanitizedtitle = sanitizeHtml(path.parse(queryData.id).base);

//     fs.readFile(`data/${sanitizedtitle}`, 'utf8', function (err, description) {
//       if (err) {
//         response.writeHead(404);
//         response.end('Not Found');
//         return;
//       }

//       var sanitizedDescription = sanitizeHtml(description);

//       response.writeHead(200);
//       response.end(template.html(sanitizedtitle, '', '',
//         `
//         <form action="/update_process" method="post">
//           <input type='hidden' name='pre_title' value='${sanitizedtitle}'>
//           <input type="text" name="title" value="${sanitizedtitle}"> <br><br>
//           <textarea name="description" cols="30" rows="10">${sanitizedDescription}</textarea> <br><br>
//           <button type="submit">수정</button>
//         </form>
//         `
//       ));

//     });

//   } else if (pathname === '/update_process') {
//     if (request.method === 'POST') {
//       var body = '';

//       request.on('data', function (data) {
//         body += data;
//       });

//       request.on('end', function () {
//         var post = qs.parse(body);

//         fs.rename(`data/${post.pre_title}`, `data/${path.parse(post.title).base}`, function (err) {
//           fs.writeFile(`data/${path.parse(post.title).base}`, post.description, 'utf8', function (err) {
//             response.writeHead(302, { Location: `/?id=${path.parse(post.title).base}` });
//             response.end();
//           });
//         });
        
//       });
//     } else {
//       response.writeHead(200);
//       response.end('Invalid Access');
//     }

//   } else if (pathname === '/delete_process') {
//     if (request.method === 'POST') {
//       var body = '';

//       request.on('data', function (data) {
//         body += data;
//       });

//       request.on('end', function () {
//         var post = qs.parse(body);
        
//         fs.unlink(`data/${post.title}`, function (err) {
//           response.writeHead(302, { Location: `/` });
//           response.end();
//         })
//       });
//     } else {
//       response.writeHead(200);
//       response.end('Invalid Access');
//     }

//   } else {
//     response.writeHead(404);
//     response.end('Not Found');
//   }

// });
// app.listen(3000);