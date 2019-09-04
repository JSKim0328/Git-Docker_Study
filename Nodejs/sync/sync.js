var fs = require('fs');

console.log('A');
console.log(fs.readFileSync('tmp.txt', 'utf8'));
console.log('C');