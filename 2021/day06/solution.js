const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split(',');

let BBQ = [0,0];
const adults = [0,0,0,0,0,0,0];

for (const fish of input) {
    adults[fish]++;
}

for (let i = 0; i < 256; i++) {
    const births = adults[i % 7];
    adults[i % 7] += BBQ[i % 2];
    BBQ[i % 2] = births;

    if (i == 79) {
        console.log('solution part 1)');
        console.log(`fish after 80 days: ${adults.reduce((a, b) => a + b) + BBQ[0] + BBQ[1]}`);

        console.log('----------------------------------------------------------------------');
    }
}

console.log('solution part 2)');
console.log(`fish after 256 days: ${adults.reduce((a, b) => a + b) + BBQ[0] + BBQ[1]}`);
