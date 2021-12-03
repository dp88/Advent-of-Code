const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const dumbEngine = {
    'horizontal': 0,
    'depth': 0,
    'forward': (value) => dumbEngine.horizontal += value,
    'up': (value) => dumbEngine.depth -= value,
    'down': (value) => dumbEngine.depth += value,
    'product': () => dumbEngine.horizontal * dumbEngine.depth,
};

const smartEngine = {
    'horizontal': 0,
    'depth': 0,
    'aim': 0,
    'forward': (value) => {
        smartEngine.horizontal += value;
        smartEngine.depth += (smartEngine.aim * value);
    },
    'up': (value) => smartEngine.aim -= value,
    'down': (value) => smartEngine.aim += value,
    'product': () => smartEngine.horizontal * smartEngine.depth,
};

for (let i = 0; i < input.length; i++) {
    const [command, value] = input[i].split(' ');
    dumbEngine[command](parseInt(value));
    smartEngine[command](parseInt(value));
}

console.log('solution part 1)');
console.log(`distance product: ${dumbEngine.product()}`);

console.log('----------------------------------------------------------------------');

console.log('solution part 2)');
console.log(`distance product: ${smartEngine.product()}`);
