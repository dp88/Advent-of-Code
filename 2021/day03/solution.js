const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

let bits = [];

for (let bit = 0; bit < input[0].length; bit++) {
    bits[bit] = 0;
}

for (let i = 0; i < input.length; i++) {
    for (let bit = 0; bit < input[i].length; bit++) {
        if (input[i][bit] == '1') {
            bits[bit]++;
        }
    }
}

let γ = 0, ε = 0;

for (let bit = 0; bit < bits.length; bit++) {
    const shift = bits.length - 1 - bit;

    if (bits[bit] / input.length > 0.5) {
        γ |= 0b1 << shift;
    } else {
        ε |= 0b1 << shift;
    }
}

console.log('solution part 1)');
console.log(`power consumption: ${γ * ε}`);
