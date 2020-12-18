const fs = require('fs');
let numbers = fs.readFileSync( __dirname + '/input.txt', 'utf8').split(',');

for (let i = numbers.length - 1; i < 2020; i++) {
    if (numbers.indexOf(numbers[i]) == i) {
        numbers.push('0');
        continue;
    }

    for (let p = i - 1; p >= 0; p--) {
        if (numbers[p] == numbers[i]) {
            numbers.push(`${i - p}`);
            break;
        }
    }
}

console.log('solution part 1)');
console.log(`2020th number: ${numbers[2019]}`);
