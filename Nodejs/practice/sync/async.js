var fs = require('fs');

console.log('A');
fs.readFile('tmp.txt', 'utf-8', function(err, res) {
  console.log(res);
})
console.log('C');