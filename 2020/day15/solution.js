const fs = require('fs');
let numbers = fs.readFileSync( __dirname + '/input.txt', 'utf8').split(',');

const map = {};
for (let n = 0; n < 10; n++) {
    map[`${n}`] = {};
}

const getIndex = (n) => (typeof map[n[0]][n] == 'undefined') ? -1 : map[n[0]][n];
const store = (n, i) => map[n[0]][n] = i;

let i;
for (i = 0; i < numbers.length; i++) {
    store(numbers[i], i);
}

let prev = '0';
let next;

const nextNumber = () => {
    const prevOccurrence = getIndex(prev);
    next = prevOccurrence == -1 ? '0' : `${i - prevOccurrence}`;
    store(prev, i);
    prev = next;
};

for (; i < 2019; i++) nextNumber();

console.log('solution part 1)');
console.log(`2020th number: ${prev}`);

for (; i < 29999999; i++) nextNumber();

console.log('solution part 2)');
console.log(`30000000th number: ${prev}`);
