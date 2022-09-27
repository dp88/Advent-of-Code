const fs = require('fs');
const rows = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const map = rows.flatMap((row) => row.split(''));
const mapUtil = require('../map')(rows[0].length, rows.length);

const path = mapUtil.pathfind(
    mapUtil.safeIndex(0, 0),
    mapUtil.safeIndex(rows[0].length - 1, rows.length - 1),
    (current, neighbor, costSoFar) => parseInt(map[neighbor]) + costSoFar[current]
);

console.log('solution part 1)');
console.log(`lowest possible risk: ${path.reduce((sum, i) => sum + parseInt(map[i]))}`);

