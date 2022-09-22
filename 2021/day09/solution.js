const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

let map = [];
for (const line of input) {
    for (const digit of line.split('')) {
        map.push(parseInt(digit));
    }
}

const mapUtil = require('../map')(input[0].length, input.length);

let lowPoints = [];
let riskSum = 0;

for (let i = 0; i < map.length; i++) {
    if (map[i] == 9) continue;

    const [x, y] = mapUtil.indexToXY(i);
    if (mapUtil.neighbors(x, y).filter((n) => map[n] <= map[i]).length > 0) continue;

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
        const [x, y] = mapUtil.indexToXY(current);
        open = open.slice(1);
        found.push(current);

        open.push(...mapUtil.neighbors(x, y)
            .filter((n) => !open.includes(n) && !found.includes(n))
            .filter((n) => map[n] < 9)
        );
    }

    basins.push(found.length);
}

basins = basins.sort((a, b) => b - a).slice(0, 3);

console.log('solution part 2)');
console.log(`product of largest basins ${basins}: ${basins.reduce((a, b) => a * b)}`);
