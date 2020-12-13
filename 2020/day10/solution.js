const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const parsed = [0]; // outlet is 0
for (let i = 0; i < input.length; i++) {
    parsed.push(parseInt(input[i]));
}

const sorted = parsed.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
});

sorted.push(sorted[sorted.length - 1] + 3); // my device

console.log(sorted);

let ones = 0;
let threes = 0;
for (let i = 1; i < sorted.length; i++) {
    const diff = parseInt(sorted[i]) - parseInt(sorted[i - 1]);
    if (diff == 1) ones++;
    if (diff == 3) threes++;
}

console.log('solution part 1)');
console.log(`ones: ${ones}, threes: ${threes}, product: ${ones * threes}`);
