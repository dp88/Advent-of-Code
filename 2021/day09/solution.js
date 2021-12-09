const fs = require('fs');

const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');
const width = input[0].length;

let map = [];
for (const line of input) {
    for (const digit of line.split('')) {
        map.push(parseInt(digit));
    }
}

function safeAccess(x, y) {
    if (x < 0 || x >= map.length) return 9;
    if (y < 0 || y >= input.length) return 9;

    const i = (y * width) + x;
    return i >= 0 && i < map.length ? map[i] : 10;
}

let riskSum = 0;

for (let i = 0; i < map.length; i++) {
    if (map[i] == 9) continue;

    const x = i % width,
          y = Math.floor(i / width);

    if (safeAccess(x - 1, y) <= map[i]) continue; // West
    if (safeAccess(x + 1, y) <= map[i]) continue; // East
    if (safeAccess(x, y - 1) <= map[i]) continue; // North
    if (safeAccess(x, y + 1) <= map[i]) continue; // South

    riskSum += 1 + map[i];
}

console.log('solution part 1)');
console.log(`total risk: ${riskSum}`);
