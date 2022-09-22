const fs = require('fs');
const map = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n')
    .map((line) => line.split('-'))
    .flatMap((pair) => [[pair[0], pair[1]], [pair[1], pair[0]]])
    .reduce((m, [from, to]) => {
        if (from != 'end') {
            if (m.hasOwnProperty(from)) m[from].push(to);
            else m[from] = [to];
        }

        return m;
    }, {});

function traverse(filter, cave = 'start', alreadyExplored = []) {
    const currentPath = [...alreadyExplored, cave];

    return cave == 'end' ?
        [currentPath.join(',')] :
        map[cave]
            .filter((n) => n != 'start')
            .filter((n) => filter(n, currentPath))
            .flatMap((n) => traverse(filter, n, currentPath));
}

const haveNotVisited = (n, path) => path.indexOf(n) < 0;
const isSmallCave = (n) => n == n.toLowerCase();
const canRevisitSmall = (path) => path.length == [...new Set(path)].length;

console.log('solution part 1)');
console.log(`total paths: ${traverse((n, path) => haveNotVisited(n, path) || !isSmallCave(n)).length}`);

console.log('----------------------------------------------------------------------');

console.log('solution part 2)');
console.log(`total longer paths: ${traverse((n, path) => haveNotVisited(n, path) || !isSmallCave(n) || canRevisitSmall(path.filter(isSmallCave))).length}`);
