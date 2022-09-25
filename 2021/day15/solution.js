const fs = require('fs');
const rows = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const map = rows.flatMap((row) => row.split(''));
const mapUtil = require('../map')(rows[0].length, rows.length);

const path = mapUtil.pathfind(
    mapUtil.safeIndex(0, 0),
    mapUtil.safeIndex(rows[0].length - 1, rows.length - 1),
    (current, neighbor) => parseInt(map[neighbor]) + 1
);

console.log(path);
console.log(path.map((i) => parseInt(map[i])));