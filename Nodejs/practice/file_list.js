var path = './';
var fs = require('fs');

fs.readdir(path, function(err, list) {
  console.log(list);
});