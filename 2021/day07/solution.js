const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8')
    .split(',')
    .map((crab) => parseInt(crab))
    .sort((a, b) => a - b);

function calculateFuel(formula) {
    let fuelSpent = 0;
    for (const crab of input) {
        fuelSpent += formula(crab);
    }
    return fuelSpent;
}

const mean = input[input.length / 2];
console.log('solution part 1)');
console.log(`estimated fuel spent to move to ${mean}: ${calculateFuel((crab) => Math.abs(mean - crab))}`);

console.log('----------------------------------------------------------------------');

const average = input.reduce((a,b) => a + b) / input.length;
const growingDistance = (distance) => (distance * (distance + 1)) / 2;

const target = [
    calculateFuel((crab) => growingDistance(Math.abs(Math.floor(average) - crab))),
    calculateFuel((crab) => growingDistance(Math.abs(Math.ceil(average) - crab)))
];

console.log('solution part 2)');
if (target[0] < target[1]) {
    console.log(`actual fuel spent to move to ${Math.floor(average)}: ${target[0]}`);
} else {
    console.log(`actual fuel spent to move to ${Math.ceil(average)}: ${target[1]}`);
}
