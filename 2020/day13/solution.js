const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const currentTime = parseInt(input[0]);
const bus = input[1].split(',');

let soonestDeparture = currentTime + 999;
let soonestID = -1;

for (let i = 0; i < bus.length; i++) {
    if (bus[i] == 'x') continue;
    const ID = parseInt(bus[i]);

    const lastDeparture = currentTime % ID;
    const nextDeparture = ID - lastDeparture;

    if (nextDeparture < soonestDeparture) {
        soonestDeparture = nextDeparture;
        soonestID = ID;
    }
}

console.log('solution part 1)');
console.log(`bus ID: ${soonestID}, departs in: ${soonestDeparture}, product: ${soonestID * soonestDeparture}`);
