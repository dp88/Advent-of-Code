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

let highestID = 0;
for (const seat of input) {
    const id = (new SeatAssignment(seat)).id;
    if (id > highestID) {
        highestID = id;
    }
}

console.log('solution part 1)');
console.log(`highest seat ID: ${highestID}`);
