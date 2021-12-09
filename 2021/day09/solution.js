const fs = require('fs');

const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');
const width = input[0].length;

let map = [];
for (const line of input) {
    for (const digit of line.split('')) {
        map.push(parseInt(digit));
    }
}

const IndexToXY = (i) => [ i % width, Math.floor(i / width) ];

function safeIndex(x, y) {
    if (x < 0 || x >= input[0].length) return -1;
    if (y < 0 || y >= input.length) return -1;

    return (y * width) + x;
}

const neighbors = (x, y) => [
    safeIndex(x - 1, y), // West
    safeIndex(x + 1, y), // East
    safeIndex(x, y - 1), // North
    safeIndex(x, y + 1), // South
].filter((i) => i >= 0);

let lowPoints = [];
let riskSum = 0;

for (let i = 0; i < map.length; i++) {
    if (map[i] == 9) continue;

    const [x, y] = IndexToXY(i);
    if (neighbors(x, y).filter((n) => map[n] <= map[i]).length > 0) continue;

    riskSum += 1 + map[i];
    lowPoints.push(i);
}

console.log('solution part 1)');
console.log(`total risk: ${riskSum}`);

console.log('----------------------------------------------------------------------');

let basins = [];

for (const point of lowPoints) {
    let open = [point],
        found = [];

    while (open.length > 0) {
        const current = open[0];
        const [x, y] = IndexToXY(current);
        open = open.slice(1);
        found.push(current);

        open.push(...neighbors(x, y)
            .filter((n) => !open.includes(n) && !found.includes(n))
            .filter((n) => map[n] < 9)
        );
    }

    basins.push(found.length);
}

basins = basins.sort((a, b) => b - a).slice(0, 3);

console.log('solution part 2)');
console.log(`product of largest basins ${basins}: ${basins.reduce((a, b) => a * b)}`);
