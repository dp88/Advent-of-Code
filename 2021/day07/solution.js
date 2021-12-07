const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8')
    .split(',')
    .map((crab) => parseInt(crab))
    .sort((a, b) => a - b);

const mean = input[input.length / 2];
let fuelSpent = 0;
for (const crab of input) {
    fuelSpent += Math.abs(mean - crab);
}

console.log('solution part 1)');
console.log(`fuel spent to move to ${mean}: ${fuelSpent}`);

// console.log('----------------------------------------------------------------------');

// console.log('solution part 2)');
// console.log(`fish after 256 days: ${adults.reduce((a, b) => a + b) + BBQ[0] + BBQ[1]}`);
