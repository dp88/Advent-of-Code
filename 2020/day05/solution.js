const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

class SeatAssignment {
    constructor(code) {
        const rowTree = code.substr(0, 7);
        const colTree = code.substr(7);

        this.row = this.treeSearch(rowTree, 'B');
        this.col = this.treeSearch(colTree, 'R');
        this.id = this.row * 8 + this.col;
    }

    treeSearch(tree, upperChar) {
        let value = 0;
        let partitionSize = Math.pow(2, tree.length) / 2;

        for (let i = 0; i < tree.length; i++) {
            if (tree[i] == upperChar) { 
                value += partitionSize;
            }
            partitionSize /= 2;
        }

        return value;
    }
}

const seats = {};
for (const seat of input) {
    const sa = new SeatAssignment(seat);
    seats[sa.id] = sa;
}

const highestID = Object.keys(seats)[Object.keys(seats).length - 1];

console.log('solution part 1)');
console.log(`highest seat ID: ${highestID}`);

let id = 0;
for (id = 0; id < parseInt(highestID); id++) {
    if (typeof seats[id - 1] != 'undefined' &&
        typeof seats[id]     == 'undefined' &&
        typeof seats[id + 1] != 'undefined') {
            break;
    }
}

console.log('solution part 2)');
console.log(`your boarding pass: ${id}`);
