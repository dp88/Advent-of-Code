const fs = require('fs');
const rows = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const map = rows.flatMap((row) => row.split(''));
const mapUtil = require('../map')(rows[0].length, rows.length);

const path = mapUtil.pathfind(
    0, map.length - 1,
    (current, neighbor, costSoFar) => parseInt(map[neighbor]) + costSoFar[current]
);

console.log('solution part 1)');
console.log(`lowest possible risk: ${path.reduce((sum, i) => sum + parseInt(map[i]))}`);

console.log('----------------------------------------------------------------------');

let bigMap = [];
const bigMapUtil = require('../map')(5 * rows[0].length, 5 * rows.length);

for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
        const additionalRisk = x + y;
        const offsetX = x * rows[0].length;
        const offsetY = y * rows.length;

        for (let i = 0; i < map.length; i++) {
            const [littleX, littleY] = mapUtil.indexToXY(i);

            let risk = parseInt(map[i]) + additionalRisk;
            if (risk > 9) risk -= 9;

            bigMap[bigMapUtil.safeIndex(littleX + offsetX, littleY + offsetY)] = risk;
        }
    }
}

const bigPath = bigMapUtil.pathfind(
    0, bigMap.length - 1,
    (current, neighbor, costSoFar) => parseInt(bigMap[neighbor]) + costSoFar[current]
);

console.log('solution part 2)');
console.log(`lowest possible risk on big map: ${bigPath.reduce((sum, i) => sum + parseInt(bigMap[i]))}`);
