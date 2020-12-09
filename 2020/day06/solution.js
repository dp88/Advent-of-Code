const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n\r\n');

let anyYesSum = 0;
let consensusYesSum = 0;

for (const group of input) {
    let answers = {};
    let people = 0;

    for (const person of group.split('\r\n')) {
        people++;

        for (const answer of person) {
            if (typeof answers[answer] == 'undefined') {
                answers[answer] = 0;
            }

            answers[answer]++;
        }
    }

    anyYesSum += Object.keys(answers).length;
    
    for (const i in answers) {
        if (answers[i] == people) {
            consensusYesSum += 1;
        }
    }
}

console.log('solution part 1)');
console.log(`total yes: ${anyYesSum}`);

console.log('solution part 2)');
console.log(`consensus yes: ${consensusYesSum}`);
