const fs = require('fs');
const [start, ruleList] = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n\r\n');
const rules = Object.fromEntries(ruleList.split('\r\n').map((rule) => rule.split(' -> ')));

let polymer = start.split('');

for (let step = 0; step < 10; step++) {
    for (let i = polymer.length - 1; i > 0; i--) {
        polymer.splice(i, 0, rules[`${polymer[i - 1]}${polymer[i]}`]);
    }
}

const counts = polymer.reduce((c, element) => {
    if (!c.hasOwnProperty(element)) c[element] = 1;
    else c[element]++;
    return c;
}, {});

const max = Math.max(...Object.values(counts));
const min = Math.min(...Object.values(counts));

console.log('solution part 1)');
console.log(`${max} - ${min}: ${max - min}`);
