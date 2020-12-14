const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const width = input[0].length;
const height = input.length;

const XYtoI = (x, y) => (y * width) + x;
const ItoX = (i) => i % width;
const ItoY = (i) => Math.floor(i / width);

let generations = [fs.readFileSync( __dirname + '/input.txt', 'utf8').replace(/\r\n/g, '')];

const getNeighbors = (seats, index) => {
    let n = [];

    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (x == 0 && y == 0) continue; // skip self

            const xx = ItoX(index) + x;
            const yy = ItoY(index) + y;

            // add to neighbor list if we're still in bounds
            if (xx > -1 && xx < width && yy > -1 && yy < height) {
                n.push(seats[XYtoI(xx, yy)]);
            }
        }
    }

    return n;
};

const tooCrowded = (neighbors) => {
    let people = 0;
    neighbors.forEach((neighbor) => {
        if (neighbor == '#') people++;
    });
    return people >= 4;
}

const advance = (seats) => {
    let nextGen = '';
    for (let i = 0; i < seats.length; i++) {
        if (seats[i] == 'L' && getNeighbors(seats, i).indexOf('#') == -1) {
            nextGen += '#';
        } else if (seats[i] == '#' && tooCrowded(getNeighbors(seats, i))) {
            nextGen += 'L';
        } else {
            nextGen += seats[i];
        }
    }

    return nextGen;
};

do {
    generations.push(advance(generations[generations.length - 1]));
} while(generations[generations.length - 1] != generations[generations.length - 2]);

let occupied = 0;
const final = generations[generations.length - 1];
for (let i = 0; i < final.length; i++) {
    if (final[i] == '#') occupied++;
}

console.log('solution part 1)');
console.log(`occupied seats: ${occupied}`);
