const fs = require('fs');
const [start, ruleList] = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n\r\n');
const rules = Object.fromEntries(ruleList.split('\r\n').map((rule) => rule.split(' -> ')));

let pairs = {};

function incrementPair(pair, pairs, add = 1) {
    if (!pairs.hasOwnProperty(pair)) pairs[pair] = add;
    else pairs[pair] += add;
}

function elementCount(element) {
    let leftEl = 0, rightEl = 0;
    for (const [pair, count] of Object.entries(pairs)) {
        if (pair[0] == element) leftEl += count;
        if (pair[1] == element) rightEl += count;
    }

    return Math.max(leftEl, rightEl);
}

function printSolution(part) {
    let max = 0, min = Number.POSITIVE_INFINITY;
    for (const letter of [...new Set(Object.values(rules))]) {
        max = Math.max(elementCount(letter), max);
        min = Math.min(elementCount(letter), min);
    }

    console.log(`solution part ${part})`);
    console.log(`${max} - ${min}: ${max - min}`);
}

for (let i = start.length - 1; i > 0; i--) {
    incrementPair(`${start[i - 1]}${start[i]}`, pairs);
}

for (let step = 0; step < 40; step++) {
    const newPairs = {};

    for (const [pair, count] of Object.entries(pairs)) {
        incrementPair(pair[0] + rules[pair], newPairs, count);
        incrementPair(rules[pair] + pair[1], newPairs, count);
    }

    pairs = newPairs;

    if (step == 9) printSolution(1);
}

printSolution(2);
