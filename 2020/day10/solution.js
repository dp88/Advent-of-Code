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

let ones = 0;
let threes = 0;
let permutations = 1;

let run = 0;

for (let i = 1; i < sorted.length; i++) {
    const diff = sorted[i] - sorted[i - 1];
    if (diff == 1) {
        ones++;
        run++;
    }
    if (diff == 3) {
        threes++;
        if (run == 2) permutations *= 2; // a run of 3 single jolt differences (e.g. 4, 5, 6) adds another 2 permutations
        if (run == 3) permutations *= 4; // a run of 4 single jolt differences (e.g. 10, 11, 12, 13) adds another 4 permutations
        if (run == 4) permutations *= 7; // a run of 5 single jolt differences (e.h. 20, 21, 22, 23, 24) adds another 7 permutations
                                         // no longer run exists in my puzzle input
        run = 0;
    }
}

console.log('solution part 1)');
console.log(`ones: ${ones}, threes: ${threes}, product: ${ones * threes}`);

console.log('solution part 2)');
console.log(`permutations: ${permutations}`);
