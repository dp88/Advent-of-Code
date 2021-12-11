const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const pairs = {
    '()': 3,
    '[]': 57,
    '{}': 1197,
    '<>': 25137,
};

const types = () => Object.keys(pairs);
const closerFor = (opener) => types().find((p) => p[0] == opener)[1];
const openerFor = (closer) => types().find((p) => p[1] == closer)[0];

let points = 0;

for (const line of input) {
    let stack = '';

    for (let i = 0; i < line.length; i++) {
        const pair = types().find((p) => p.indexOf(line[i]) > -1);

        if (pair[0] == line[i]) {
            stack += line[i];
            continue;
        }
        
        if (closerFor(stack[stack.length - 1]) != line[i]) {
            const type = types().find((t) => t.indexOf(line[i]) > -1);
            points += pairs[type];

            break;
        }

        stack = stack.slice(0, -1);
    }
}

console.log('solution part 1)');
console.log(`syntax error score: ${points}`);

// console.log('----------------------------------------------------------------------');

// console.log('solution part 2)');
// console.log(`product of largest basins ${basins}: ${basins.reduce((a, b) => a * b)}`);
