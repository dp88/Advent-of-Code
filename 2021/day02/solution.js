const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

let horizontal = 0,
    depth = 0;

const engine = {
    'forward': (value) => horizontal += value,
    'up': (value) => depth -= value,
    'down': (value) => depth += value,
};

for (let i = 0; i < input.length; i++) {
    const [command, value] = input[i].split(' ');
    engine[command](parseInt(value));
}

console.log('solution part 1)');
console.log(`distance product: ${horizontal * depth}`);
