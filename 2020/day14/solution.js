const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

let mask = '';
let mem = {};
let mem2 = {};

const toBin = (num) => {
    let bin = parseInt(num).toString(2);
    while (bin.length < mask.length) bin = `0${bin}`;
    return bin;
};

const maskValue = (value) => {
    const bin = toBin(value);

    let toWrite = 0n;
    for (let i = 0; i < mask.length; i++) {
        toWrite = toWrite << 1n;
        toWrite |= mask[i] == 'X' ? BigInt(bin[i]) : BigInt(mask[i]);
    }

    return toWrite;
};

const maskAddress = (address) => {
    const bin = toBin(address);
    let addresses = [''];

    for (let i = 0; i < mask.length; i++) {
        addresses[0] += mask[i] == "0" ? bin[i] : mask[i];
    }

    let a = 0;
    while (a < addresses.length) {
        if (addresses[a].indexOf('X') > -1 ) {
            const wild = addresses.splice(a, 1)[0];
            
            addresses.push(
                wild.replace('X', '0'),
                wild.replace('X', '1')
            );

            a = 0;
        } else {
            a++;
        }
    }

    return addresses;
};

for (const instruction of input) {
    const code = instruction.split(' = ')[0];
    const data = instruction.split(' = ')[1];

    if (code == 'mask') {
        mask = data;
    } else {
        mem[parseInt(code.substr(4))] = maskValue(data);

        for (const address of maskAddress(parseInt(code.substr(4)))) {
            mem2[address.toString()] = BigInt(data);
        }
    }
}

let sum = 0n;
for (const address in mem) {
    sum += mem[address];
}

console.log('solution part 1)');
console.log(`sum: ${sum}`);

let sum2 = 0n;
for (const address in mem2) {
    sum2 += mem2[address];
}

console.log('solution part 2)');
console.log(`sum: ${sum2}`);
