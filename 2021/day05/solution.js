const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const straightMap = {},
      fullMap = {};

function range(n, o) {
    let result = [n],
        current = n;

    while (current != o) {
        if (n > o) current--;
        if (n < o) current++;
        result.push(current);
    }

    return result;
}

function plot(a, b, map) {
    const x = range(a[0], b[0]),
          y = range(a[1], b[1]),
          safe = (array, index) => index < array.length ? array[index] : array[0];

    for (let i = 0; i < Math.max(x.length, y.length); i++) {
        const xy = `${safe(x, i)},${safe(y, i)}`;
        map[xy] = typeof map[xy] == 'number' ? map[xy] + 1 : 1;
    }
}

for (let i = 0; i < input.length; i++) {
    let [a, b] = input[i]
        .split(' -> ')
        .map((coords) => coords
            .split(',')
            .map((xy) => parseInt(xy)));
    
    if (a[0] == b[0] || a[1] == b[1]) {
        plot(a, b, straightMap);
    }

    plot(a, b, fullMap);
}

console.log('solution part 1)');
console.log(`dangerous intersections: ${Object.values(straightMap).filter((value) => value > 1).length}`);

console.log('----------------------------------------------------------------------');

console.log('solution part 2)');
console.log(`super dangerous intersections: ${Object.values(fullMap).filter((value) => value > 1).length}`);
