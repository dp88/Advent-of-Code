const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

let a = 0,
    b = 0;

let multiple;

(() => {
    for (a = 0; a < input.length; a++) {
        for (b = 0; b < input.length; b++) {
            if (a == b) continue;

            const numA = parseInt(input[a]),
                  numB = parseInt(input[b]);

            if (numA + numB == 2020) {
                multiple = numA * numB;

                console.log('solution part 1)');
                console.log(`first number (${a}) is ${numA}`);
                console.log(`second number (${b}) is ${numB}`);
                console.log(`${numA} + ${numB} = 2020? ${numA + numB == 2020 ? 'yes' : 'no'}`);

                return;
            }
        }
    }
})();

console.log(`solution: ${multiple}`);
