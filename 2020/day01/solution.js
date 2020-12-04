const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const search = function search (depth, currentSum = 0, otherFactors = []) {
    for (let factorIndex = 0; factorIndex < input.length; factorIndex++) {
        if (otherFactors.includes(factorIndex)) { // we're already looking at this number - skip
            continue;
        }

        const factor = parseInt(input[factorIndex]); // whats the value at this index?

        if (depth == 1) { // we're considering the number of factors requested.
            if (factor + currentSum == 2020) { // found it!
                return [factorIndex, ...otherFactors];
            }
        } else { // we have to go deeper!
            const nextLevel = search(depth - 1, currentSum + factor, [factorIndex, ...otherFactors]);
            if (nextLevel == false) {
                // keep looking
                continue;
            } else { // ride the kick back up
                return nextLevel;
            }
        }
    }

    return false;
};


const factors1 = search(2);
const numA = parseInt(input[factors1[0]]),
      numB = parseInt(input[factors1[1]]);

console.log('solution part 1)');
console.log(`first number (${factors1[0]}) is ${numA}`);
console.log(`second number (${factors1[1]}) is ${numB}`);
console.log(`${numA} + ${numB} = 2020? ${numA + numB == 2020 ? 'yes' : 'no'}`);
console.log(`solution: ${numA * numB}`);

console.log('----------------------------------------------------------------------');

const factors2 = search(3);
const numX = parseInt(input[factors2[0]]),
      numY = parseInt(input[factors2[1]]),
      numZ = parseInt(input[factors2[2]]);

console.log('solution part 1)');
console.log(`first number (${factors2[0]}) is ${numX}`);
console.log(`second number (${factors2[1]}) is ${numY}`);
console.log(`third number (${factors2[2]}) is ${numZ}`);
console.log(`${numX} + ${numY} + ${numZ} = 2020? ${numX + numY + numZ == 2020 ? 'yes' : 'no'}`);
console.log(`solution: ${numX * numY * numZ}`);
