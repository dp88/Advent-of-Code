const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

let increases = 0;
for (let i = 1; i < input.length; i++) {
    if (parseInt(input[i]) > parseInt(input[i - 1])) {
        increases++;
    }
}

console.log('solution part 1)');
console.log(`number of increases: ${increases}`);
