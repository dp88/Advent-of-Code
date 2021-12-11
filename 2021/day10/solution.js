const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const symbol = [
    { opener: '(', closer: ')', error: 3,     complete: 1 },
    { opener: '[', closer: ']', error: 57,    complete: 2 },
    { opener: '{', closer: '}', error: 1197,  complete: 3 },
    { opener: '<', closer: '>', error: 25137, complete: 4 },
];
symbol.__proto__.for = (character) => symbol.find((s) => [s.opener, s.closer].includes(character));

function points(line) {
    let stack = '';

    for (const char of line) {
        // line is a new opener
        if (char == symbol.for(char).opener) {
            stack += char;
            continue;
        }

        // line matches the expected closer
        if (char == symbol.for(stack[stack.length - 1]).closer) {
            stack = stack.slice(0, -1);
            continue;
        }

        return [symbol.for(char).error, true];
    }

    return [
        stack.split('').reverse().reduce((points, character) => (points * 5) + symbol.for(character).complete, 0),
        false
    ];
}

const scored = input.map((line) => points(line));
console.log('solution part 1)');
console.log(`syntax error score: ${scored.filter((score) => score[1]).reduce((sum, score) => sum + score[0], 0)}`);

console.log('----------------------------------------------------------------------');

const fixed = scored.filter((score) => !score[1]).map((score) => score[0]).sort((a, b) => a - b);
console.log('solution part 2)');
console.log(`middle fixed score: ${fixed[(fixed.length - 1) / 2]}`);
