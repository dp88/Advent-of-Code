const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

let a = 0,
    b = 0;

let multipleA;

(() => {
    for (a = 0; a < input.length; a++) {
        for (b = 0; b < input.length; b++) {
            if (a == b) continue;

            const numA = parseInt(input[a]),
                  numB = parseInt(input[b]);

            if (numA + numB == 2020) {
                multipleA = numA * numB;

                console.log('solution part 1)');
                console.log(`first number (${a}) is ${numA}`);
                console.log(`second number (${b}) is ${numB}`);
                console.log(`${numA} + ${numB} = 2020? ${numA + numB == 2020 ? 'yes' : 'no'}`);

                return;
            }
        }
    }
})();

console.log(`solution: ${multipleA}`);

let x = 0,
    y = 0,
    z = 0;

let multipleB;

(() => {
    for (x = 0; x < input.length; x++) {
        for (y = 0; y < input.length; y++) {
            if (x == y) continue;

            for (z = 0; z < input.length; z++) {
                if (x == z || y == z) continue;

                const numX = parseInt(input[x]),
                      numY = parseInt(input[y]),
                      numZ = parseInt(input[z])

                if (numX + numY + numZ == 2020) {
                    multipleB = numX * numY * numZ;

                    console.log('solution part 2)');
                    console.log(`first number (${x}) is ${numX}`);
                    console.log(`second number (${y}) is ${numY}`);
                    console.log(`second number (${z}) is ${numZ}`);
                    console.log(`${numX} + ${numY} + ${numZ} = 2020? ${numX + numY + numZ == 2020 ? 'yes' : 'no'}`);

                    return;
                }
            }
        }
    }
})();

console.log(`solution: ${multipleB}`);
