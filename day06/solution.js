const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

let system = { 'COM': {}};
function findSatellites (searchBody, parentSystem, depth = 0) {
    let orbits = 0;
    for (let i = 0; i < input.length; i++) {
        const orbit = input[i].split(')');
        if (orbit[0] == searchBody) {
            parentSystem[searchBody][orbit[1]] = {};
            orbits += depth + 1;
            orbits += findSatellites(orbit[1], parentSystem[searchBody], depth + 1);
        }
    }
    return orbits;
}

console.log('solution part 1)');
console.log('total orbits: ' + findSatellites('COM', system));

function findPath (tail) {
    let path = [];
    let body = tail;
    while (body != 'COM') {
        for (let i = 0; i < input.length; i++) {
            const orbit = input[i].split(')');
            if (orbit[1] == body) {
                body = orbit[0];
                path.push(body);
                break;
            }
        }
    }

    return path;
}


console.log('solution part 2)');
const yourPath = findPath('YOU');
const santasPath = findPath('SAN')
for (let y = 0; y < yourPath.length; y++) {
    for (let s = 0; s < santasPath.length; s++) {
        if (yourPath[y] == santasPath[s]) {
            console.log(`common ancestor path length: ${y + s}`);
            return;
        }
    }
}
