const fs = require('fs');
const rules = fs.readFileSync( __dirname + '/rules.txt', 'utf8').split('\r\n');
const ticket = fs.readFileSync( __dirname + '/ticket.txt', 'utf8').split('\r\n');
const others = fs.readFileSync( __dirname + '/others.txt', 'utf8').split('\r\n');

let validValues = [];

for (const rule of rules) {
    const ranges = rule.split(': ')[1].split(' or ');
    for (let r = 0; r < ranges.length; r++) {
        const range = ranges[r].split('-');

        for (let a = parseInt(range[0]); a <= parseInt(range[1]); a++) {
            if (validValues.indexOf(a) == -1) validValues.push(a);
        }
    }
}

let sum = 0;
for (const ticket of others) {
    const values = ticket.split(',');
    for (const value of values) {
        const parsed = parseInt(value);
        if (validValues.indexOf(parsed) == -1) sum += parsed;
    }
}

console.log('solution part 1)');
console.log(`sum: ${sum}`);
