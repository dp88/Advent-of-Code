const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const width = input[0].length;
let trees = 0;

let column = 3;
for (let row = 1; row < input.length; row++) {
    if (input[row][column % width] == '#') trees++;

    column += 3;
}

console.log('solution part 1)');
console.log(`trees: ${trees}`);
