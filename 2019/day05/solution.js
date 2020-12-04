const fs = require('fs');
const computer = require('../computer.js');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split(',');

computer(input);
