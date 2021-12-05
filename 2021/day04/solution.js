const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n\r\n');

const numbersToBeCalled = input[0].split(',').map((x) => parseInt(x));
const boards = [];

function board(digits) {
    const rowMatches = (row, called) => {
        for (let i = 0; i < 5; i++) {
            if (called.indexOf(digits[(row * 5) + i]) == -1) return false;
        }

        return true;
    };

    const colMatches = (col, called) => {
        for (let i = 0; i < 5; i++) {
            if (called.indexOf(digits[(i * 5) + col]) == -1) return false;
        }

        return true;
    };

    return {
        finished: (called) => {
            for (let i = 0; i < 5; i++) {
                if (rowMatches(i, called)) return true;
                if (colMatches(i, called)) return true;
            }

            return false;
        },
        unmatched: (called) => digits.filter((digit) => called.indexOf(digit) == -1),
    };
}

for (let i = 1; i < input.length; i++) {
    boards.push(
        board(input[i]
            .replace(/\r\n/g, ' ')
            .replace(/  /g, ' ')
            .split(' ')
            .filter((x) => x != '')
            .map((digit) => parseInt(digit))
        )
    );
}

let matchingBoard = null;
let calledSubset = [];

for (let i = 0; i < numbersToBeCalled.length && matchingBoard == null; i++) {
    calledSubset = numbersToBeCalled.slice(0, i + 1);

    for (let b = 0; b < boards.length; b++) {
        if (boards[b].finished(calledSubset)) {
            console.log(`finished board ${b}!!`);
            matchingBoard = boards[b];
            break;
        }
    }
}

const unmatchedSum = matchingBoard.unmatched(calledSubset).reduce((a, b) => a + b);
const lastNumber = calledSubset[calledSubset.length - 1];

console.log('solution part 1)');
console.log(`winning score: ${unmatchedSum * lastNumber}`);
