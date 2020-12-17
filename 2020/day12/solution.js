const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const go = (direction, distance) => {
    switch (direction) {
        case 'S': distance *= -1;
        case 'N': y += distance;       break;

        case 'W': distance *= -1;
        case 'E': x += distance;       break;

        case 'L': distance *= -1;
        case 'R': heading += distance; break;

        case 'F':
            switch ((heading % 360) / 90) {
                case 0: go ('N', distance); break;
                case 1: go ('E', distance); break;
                case 2: go ('S', distance); break;
                case 3: go ('W', distance); break;
            }
    }
}

const way = (direction, distance) => {
    if ('NESW'.indexOf(direction) > -1) {
        go(direction, distance);
    } else {
        switch (direction) {
            case 'L': distance = 360 - distance;
            case 'R':
                while (distance > 0) {
                    const newX = y;
                    const newY = 0 - x;
                    x = newX;
                    y = newY;

                    distance -= 90;
                }
                break;

            case 'F':
                for (let i = 0; i < distance; i++) {
                    shipX += x;
                    shipY += y;
                }
        }
    }
}

let heading = 90;
let x = 0, y = 0;

for (const instruction of input) {
    go(instruction[0], parseInt(instruction.substr(1)));
}

console.log('solution part 1)');
console.log(`x: ${x}, y: ${y}, manhattan: ${Math.abs(x) + Math.abs(y)}`);

let shipX = 0, shipY = 0;
x = 10;
y = 1;

for (const instruction of input) {
    way(instruction[0], parseInt(instruction.substr(1)));
}

console.log('solution part 2)');
console.log(`x: ${shipX}, y: ${shipY}, manhattan: ${Math.abs(shipX) + Math.abs(shipY)}`);
