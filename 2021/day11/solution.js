const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');
const width = input[0].length;

let map = [];
for (const line of input) {
    for (const digit of line.split('')) {
        map.push(parseInt(digit));
    }
}

let partOneFlashes = 0;

const IndexToXY = (i) => [ i % width, Math.floor(i / width) ];

function safeIndex(x, y) {
    if (x < 0 || x >= width) return -1;
    if (y < 0 || y >= input.length) return -1;

    return (y * width) + x;
}

const neighbors = (x, y) => [
    safeIndex(x,     y - 1), // North
    safeIndex(x + 1, y - 1), // Northeast
    safeIndex(x + 1, y    ), // East
    safeIndex(x + 1, y + 1), // Southeast
    safeIndex(x,     y + 1), // South
    safeIndex(x - 1, y + 1), // Southwest
    safeIndex(x - 1, y    ), // West
    safeIndex(x - 1, y - 1), // Northwest
].filter((i) => i >= 0);

function draw(step, map) {
    console.log(`\n\nAfter step ${step}:`);
    for (let i = 0; i < map.length; i++) {
        if (i > 0 && i % 10 == 0) process.stdout.write('\n');
        process.stdout.write(`${map[i]}`);
    }
}

for (let step = 0; step < 100; step++) {
    let flashes = [];

    // draw(step, map);

    const bump = (i) => {
        if (flashes.indexOf(i) > -1) return;

        map[i]++;
        if (map[i] <= 9) return;

        flashes.push(i);
        map[i] = 0;
        const [x, y] = IndexToXY(i);
        neighbors(x, y).forEach((n) => bump(n));
    };

    for (let i = 0; i < map.length; i++) bump(i);
    partOneFlashes += flashes.length;
}

console.log('solution part 1)');
console.log(`total flashes: ${partOneFlashes}`);
