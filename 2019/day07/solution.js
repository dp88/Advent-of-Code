const fs = require('fs');
const computer = require('../computer.js');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split(',');

let combinations = [];
(function iterate (options, sequence = '') {
    if (options.length == 1) {
        combinations.push(sequence + options);
    } else {
        for (let i = 0; i < options.length; i++) {
            let digit = options[i];
            let remaining = options.replace(digit, '');
            iterate(remaining, sequence + digit);
        }
    }
})('01234');

let highest = { combination: '', signal: 0 };
for (let c = 0; c < combinations.length; c++) {
    let ampOutput = 0;

    for (let amp = 0; amp < 5; amp++) {
        let inputRequest = 0;

        computer(input, {
            inputModule: () => {
                if (inputRequest == 0) {
                    inputRequest++;
                    return combinations[c][amp];
                } else {
                    return ampOutput;
                }
            },
            outputModule: (out) => {
                ampOutput = out;
            }
        });
    }

    if (ampOutput > highest.signal) {
        highest.combination = combinations[c];
        highest.signal = ampOutput;
    }
}

console.log('solution part 1)');
console.log(highest);
