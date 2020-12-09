const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n\r\n');

let sum = 0;
for (const group of input) {
    let answers = '';

    for (const person of group.split('\r\n')) {
        for (const answer of person) {
            if (answers.indexOf(answer) == -1) {
                answers += answer;
            }
        }
    }

    sum += answers.length;
}

console.log('solution part 1)');
console.log(`total yes: ${sum}`);
