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

const findDeparture = (firstDeparture, firstInterval, secondInterval, delay) => {
    const patternRepeats = firstInterval * secondInterval;
    // console.log(`first bus leaves at ${firstDeparture}, departs every ${firstInterval} minutes`);
    // console.log(`second bus leaves at 0, departs every ${secondInterval} minutes`);

    for (let departureTime = firstDeparture; departureTime <= patternRepeats; departureTime += firstInterval) {
        if ((departureTime + delay) % secondInterval == 0) {
            // console.log(`${delay} minute delay at ${departureTime}, repeats every ${patternRepeats}\n`);

            return { departureTime, repeat: patternRepeats };
        }
    }
};

let workingInterval = {
    departureTime: 0,
    repeat: parseInt(bus[0]),
};

for (let b = 1; b < bus.length; b++) {
    if (bus[b] == 'x') continue;

    workingInterval = findDeparture(workingInterval.departureTime, workingInterval.repeat, parseInt(bus[b]), b);
}

console.log('solution part 2)');
console.log(`the awesomest departure time is: ${workingInterval.departureTime}`);
