const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');
const wire = [input[0].split(','), input[1].split(',')];

let grid = {}, stepCounts = {};
let intersections = [];

for (let w = 0; w < 2; w++) {
    let position = {'x': 0, 'y': 0};
    const wireIndex = w + 1;
    let stepsSoFar = 0;

    for (let turn = 0; turn < wire[w].length; turn++) {
        const direction = wire[w][turn].substring(0, 1);
        const axis        = direction == 'U' || direction == 'D' ? 'y' : 'x';
        const incrementer = direction == 'U' || direction == 'R' ?  1  : -1;

        for (let steps = parseInt(wire[w][turn].substring(1)); steps > 0; steps--) {
            position[axis] += incrementer;
            stepsSoFar++;
            const coords = `${position['x']},${position['y']}`;

            if (typeof grid[coords] == 'undefined') {
                grid[coords] = 0;
            }
            grid[coords] = grid[coords] | wireIndex;

            if (typeof stepCounts[coords] == 'undefined') {
                stepCounts[coords] = 0;
            }
            stepCounts[coords] += stepsSoFar;

            if (grid[coords] == parseInt('11', 2)) {
                intersections.push(coords);
            }
        }
    }
}

let shortest = { 'pair': '0,0', 'distance': 0 };
let first    = { 'pair': '0,0', 'steps': 0 };
for (let i = 0; i < intersections.length; i++) {
    const [x, y] = intersections[i].split(',');

    const totalDistance = Math.abs(parseInt(x)) + Math.abs(parseInt(y));
    if (shortest['distance'] == 0 || totalDistance < shortest['distance']) {
        shortest['pair'] = intersections[i];
        shortest['distance'] = totalDistance;
    }

    const totalSteps = stepCounts[intersections[i]];
    if (first['steps'] == 0 || totalSteps < first['steps']) {
        first['pair'] = intersections[i];
        first['steps'] = totalSteps;
    }
}

console.log('solution part 1)');
console.log(`shortest: ${shortest['distance']} (${shortest['pair']})`);

console.log('solution part 2)');
console.log(`fewest steps: ${first['steps']} (${first['pair']})`);
