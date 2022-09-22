const fs = require('fs');
const [coordList, foldList] = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n\r\n');

function coordToDot (coord) {
    const [x, y] = coord.split(',');
    return { x: parseInt(x), y: parseInt(y) };
}

const dotToCoord = (dot) => Object.values(dot).join(',');

const startingDots = coordList.split('\r\n').map(coordToDot);

const folds = foldList.split('\r\n').map((fold) => {
    const [axis, value] = fold.split('=');
    return { axis: axis.slice(-1), value: parseInt(value) };
});

function fold(axis, value, dots) {
    let newDots = [];
    const edge = value * 2;

    for (const dot of dots) {
        let newDot = {...dot};

        if (newDot[axis] > value) {
            newDot[axis] = edge - newDot[axis];
        }

        newDots.push(newDot);
    }

    return newDots;
}

let dots = [];
let firstFold;

for (let i = 0; i < folds.length; i++) {
    dots = fold(folds[i].axis, folds[i].value, startingDots);
    if (i == 0) firstFold = [...dots];
}

console.log('solution part 1)');
console.log(`visible dots after one fold: ${[...new Set(firstFold.map(dotToCoord))].length}`);
