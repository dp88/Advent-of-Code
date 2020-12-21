const fs = require('fs');
const Space = require('./space');
const Hyperspace = require('./hyperspace');
let input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

let time = [new Space()];
let hypertime = [new Hyperspace()];

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        time[0].setCube(x, y, 0, input[y][x] == '#');
        hypertime[0].setCube(x, y, 0, 0, input[y][x] == '#');
    }
}

for (let i = 1; i < 7; i++) {
    time.push(new Space(time[i - 1]));
    hypertime.push(new Hyperspace(hypertime[i - 1]));
}

console.log('solution part 1)');
console.log(`active: ${time[time.length - 1].active}`);

console.log('solution part 2)');
console.log(`active: ${hypertime[hypertime.length - 1].active}`);
