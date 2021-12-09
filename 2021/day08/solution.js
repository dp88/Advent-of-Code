const fs = require('fs');

function unscramble(input) {
    const io = {
        in: input.split(' | ')[0].split(' ').sort((a, b) => a.length - b.length),
        out: input.split(' | ')[1].split(' '),
    };

    let wires = ['', '', '', '', '', '', '', '', '', ''];
    let output = [];

    const sorted = (scrambled) => scrambled.split('').sort().join('');

    // 1, 4, 7, 8
    wires[1] = sorted(io.in[0]);
    wires[4] = sorted(io.in[2]);
    wires[7] = sorted(io.in[1]);
    wires[8] = sorted(io.in[9]);

    // 2, 3, 5
    for (let i = 3; i < 6; i++) {
        if (wires[4].split('').filter((segment) => io.in[i].split('').includes(segment)).length == 2) {
            // 2 is missing 2 segments of 4
            wires[2] = sorted(io.in[i]);
        } else if (wires[1].split('').filter((segment) => io.in[i].split('').includes(segment)).length == 2) {
            // 3 contains all of 1
            wires[3] = sorted(io.in[i]);
        } else {
            // it's 5
            wires[5] = sorted(io.in[i]);
        }
    }

    // 0, 6, 9
    for (let i = 6; i < 9; i++) {
        if (wires[4].split('').filter((segment) => io.in[i].split('').includes(segment)).length == 4) {
            // 9 contains all of 4
            wires[9] = sorted(io.in[i]);
        } else if (wires[5].split('').filter((segment) => io.in[i].split('').includes(segment)).length == 5) {
            // 6 contains all of 5
            wires[6] = sorted(io.in[i]);
        } else {
            // it's 0
            wires[0] = sorted(io.in[i]);
        }
    }

    for (let i = 0; i < io.out.length; i++) {
        output.push(wires.indexOf(sorted(io.out[i])));
    }

    return output;
}

const signals = fs.readFileSync( __dirname + '/input.txt', 'utf8')
    .split('\r\n')
    .map((signal) => unscramble(signal));

console.log('solution part 1)');
console.log(`instances of 1, 4, 7, or 8: ${signals.reduce((sum, signal) => sum + signal.filter((part) => [1, 4, 7, 8].includes(part)).length, 0)}`);

console.log('----------------------------------------------------------------------');

console.log('solution part 2)');
console.log(`big sum: ${signals.reduce((sum, signal) => sum + parseInt(signal.join('')), 0)}`);
