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

function victory(part, score) {
    console.log(`solution part ${part})`);
    console.log(`winning score: ${score}`);
}

let winningBoards = [];
let calledSubset = [];

for (let i = 0; i < numbersToBeCalled.length && winningBoards.length < boards.length; i++) {
    calledSubset = numbersToBeCalled.slice(0, i + 1);

    for (let b = 0; b < boards.length; b++) {
        if (winningBoards.indexOf(boards[b]) > -1) continue;

        if (boards[b].finished(calledSubset)) {
            if (winningBoards.length == 0) {
                victory(1,
                    boards[b].unmatched(calledSubset).reduce((a, b) => a + b) *
                    calledSubset[calledSubset.length - 1]
                );
            }

            winningBoards.push(boards[b]);

            if (winningBoards.length == boards.length) {
                victory(2,
                    boards[b].unmatched(calledSubset).reduce((a, b) => a + b) *
                    calledSubset[calledSubset.length - 1]
                );
            }
        }
    }
}
