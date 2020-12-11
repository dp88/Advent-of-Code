const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

let instructions = [];
let accumulator = 0;
let accumulatorPrev = 0;
const computer = {
    'acc': (arg) => {
        accumulator += arg;
        return 1;
    },
    'jmp': (arg) => arg,
    'nop': (arg) => 1,
};

let i = 0;
while (instructions.length == [...(new Set(instructions))].length) {
    const instruction = input[i].split(' ');

    instructions.push(i);
    accumulatorPrev = accumulator;
    i += computer[instruction[0]](parseInt(instruction[1]));
}

console.log('solution part 1)');
console.log(`last valid accumulator value: ${accumulatorPrev}`);
