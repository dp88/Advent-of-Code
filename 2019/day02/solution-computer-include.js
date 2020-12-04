const fs = require('fs');
const computer = require('../computer.js');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split(',');

console.log('solution part 1)');
console.log(`output: ${computer(input, 12, 2)}`);
