const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

let heading = 90;
let x = 0;
let y = 0;

const go = (direction, distance) => {
    switch (direction) {
        case 'S':
            distance *= -1;
        case 'N':
            y += distance;
            break;

        case 'W':
            distance *= -1;
        case 'E':
            x += distance;
            break;

        case 'L':
            distance *= -1;
        case 'R':
            heading += distance;
            break;

        case 'F':
            switch ((heading % 360) / 90) {
                case 0:
                    go ('N', distance);
                    break;
                case 1:
                    go ('E', distance);
                    break;
                case 2:
                    go ('S', distance);
                    break;
                case 3:
                    go ('W', distance);
                    break;
            }
    }
}

for (const instruction of input) {
    go(instruction[0], parseInt(instruction.substr(1)));
}

console.log('solution part 1)');
console.log(`x: ${x}, y: ${y}, manhattan: ${Math.abs(x) + Math.abs(y)}`);
