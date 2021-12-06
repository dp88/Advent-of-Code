const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const map = {};

for (let i = 0; i < input.length; i++) {
    let [a, b] = input[i]
        .split(' -> ')
        .map((coords) => coords
            .split(',')
            .map((xy) => parseInt(xy)));
    
    if (a[0] == b[0]) {
        for (let y = Math.min(a[1], b[1]); y < Math.max(a[1], b[1]) + 1; y++) {
            const xy = `${a[0]},${y}`;
            map[xy] = typeof map[xy] == 'number' ? map[xy] + 1 : 1;
        }
    } else if (a[1] == b[1]) {
        for (let x = Math.min(a[0], b[0]); x < Math.max(a[0], b[0]) + 1; x++) {
            const xy = `${x},${a[1]}`;
            map[xy] = typeof map[xy] == 'number' ? map[xy] + 1 : 1;
        }
    }
}

console.log('solution part 1)');
console.log(`dangerous intersections: ${Object.values(map).filter((value) => value > 1).length}`);
