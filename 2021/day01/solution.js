const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

function measureWindow(start, windowSize = 1) {
    let sum = 0;

    for (let i = 0; i < windowSize; i++) {
        sum += parseInt(input[start + i]);
    }

    return sum / windowSize;
}

function countIncreases(windowSize = 1) {
    let increases = 0;

    for (let i = 0; i < input.length - windowSize; i++) {
        if (measureWindow(i + 1, windowSize) > measureWindow(i, windowSize)) {
            increases++;
        }
    }

    return increases;
}

console.log('solution part 1)');
console.log(`number of increases: ${countIncreases()}`);

console.log('----------------------------------------------------------------------');

console.log('solution part 2)');
console.log(`averaged number of increases: ${countIncreases(3)}`);
