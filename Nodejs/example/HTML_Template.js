var template = {
  html: function (title, list, control, description) {
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
  },

  list: function (flist) {
    var list = '<ol>';
  
    for (var i = 0; i < flist.length; ++i) {
      if (flist[i] === 'Welcome') continue;
      list += `<li><a href="/page/${flist[i]}">${flist[i]}</a></li>`;
    }
  
    list += '</ol>';
    return list;
  }
}

module.exports = template;