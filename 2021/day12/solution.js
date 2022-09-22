const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

let map = {};

function addPairToMap(a, b) {
    if (a == 'end') return;

    if (map.hasOwnProperty(a) && map[a].indexOf(b)) map[a].push(b);
    else map[a] = [b];
}

for (const line of input) {
    const pair = line.split('-');
    addPairToMap(pair[0], pair[1]);
    addPairToMap(pair[1], pair[0]);
}

let allPaths = [];
function blindRecursiveTraverse(start, alreadyExplored = []) {
    const path = [...alreadyExplored, start];

    if (start == 'end') allPaths.push(path.join(','));
    else for (const neighbor of map[start].filter((n) => path.indexOf(n) < 0 || n != n.toLowerCase())) {
        blindRecursiveTraverse(neighbor, path);
    }
}

blindRecursiveTraverse('start');

console.log('solution part 1)');
console.log(`total paths: ${allPaths.length}`);
