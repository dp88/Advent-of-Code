const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const findMatch = (i) => {
    const current = parseInt(input[i]);

    for (let a = 1; a < 26; a++) {
        for (let b = 1; b < 26; b++) {
            if (a == b) continue;
            if (parseInt(input[i - a]) + parseInt(input[i - b]) == current) return true;
        }
    }

    return false;
}

console.log('solution part 1)');
for (let i = 25; i < input.length; i++) {
    if (!findMatch(i)) {
        console.log(`first number without a match: ${input[i]}`);
        break;
    }
}
