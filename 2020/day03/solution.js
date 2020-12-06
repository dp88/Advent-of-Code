const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const width = input[0].length;

const countPath = function countPath (right, down) {
    let trees = 0;

    let column = right;
    for (let row = down; row < input.length; row += down) {
        if (input[row][column % width] == '#') trees++;

        column += right;
    }

    return trees;
}

console.log('solution part 1)');
console.log(`trees: ${countPath(3, 1)}`);

const part2 = countPath(1, 1) *
              countPath(3, 1) *
              countPath(5, 1) *
              countPath(7, 1) *
              countPath(1, 2);

console.log('solution part 2)');
console.log(`trees: ${part2}`);
