const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

let map = [];
for (const line of input) {
    for (const digit of line.split('')) {
        map.push(parseInt(digit));
    }
}

const mapUtil = require('../map')(input[0].length, input.length, true);

let partOneFlashes = 0;

function draw(step, map) {
    console.log(`\n\nAfter step ${step}:`);
    for (let i = 0; i < map.length; i++) {
        if (i > 0 && i % 10 == 0) process.stdout.write('\n');
        process.stdout.write(`${map[i]}`);
    }
}

let step = 0;
while (true) {
    let flashes = [];

    // draw(step, map);

    const bump = (i) => {
        if (flashes.indexOf(i) > -1) return;

        map[i]++;
        if (map[i] <= 9) return;

        flashes.push(i);
        map[i] = 0;
        const [x, y] = mapUtil.indexToXY(i);
        mapUtil.neighbors(x, y).forEach((n) => bump(n));
    };

    for (let i = 0; i < map.length; i++) bump(i);

    if (step++ < 100) {
        partOneFlashes += flashes.length;
    }

    if (map.reduce((a, b) => a + b) === 0) break;
}

console.log('solution part 1)');
console.log(`total flashes: ${partOneFlashes}`);

console.log('----------------------------------------------------------------------');

console.log('solution part 2)');
console.log(`first synchronized flash: ${step}`);
