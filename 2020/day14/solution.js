const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

let mask = '';
let mem = [];

for (const instruction of input) {
    const code = instruction.split(' = ')[0];
    const data = instruction.split(' = ')[1];

    if (code == 'mask') {
        mask = data;
    } else {
        const address = parseInt(code.substr(4));
        let bin = parseInt(data).toString(2);
        while (bin.length < mask.length) bin = `0${bin}`;

        mem[address] = 0n;
        for (let i = 0; i < mask.length; i++) {
            mem[address] = mem[address] << 1n;
            mem[address] |= mask[i] == 'X' ? BigInt(bin[i]) : BigInt(mask[i]);
        }
    }
}

let sum = 0n;
for (const value of mem) {
    if (typeof value == "bigint") {
        sum += value;
    }
}

console.log('solution part 1)');
console.log(`sum: ${sum}`);
