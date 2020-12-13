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
let target = 0;
for (let i = 25; i < input.length; i++) {
    if (!findMatch(i)) {
        console.log(`first number without a match: ${input[i]}`);
        target = parseInt(input[i]);
        break;
    }
}

console.log('solution part 2)');
for (let i = 0; i < input.length; i++) {
    let runTarget = target;

    for (let r = i; r < input.length; r++) {
        runTarget -= parseInt(input[r]);

        if (runTarget === 0 && parseInt(input[r]) != target) {
            let lowest = target;
            let highest = 0;

            for (let a = i; a <= r; a++) {
                const value = parseInt(input[a]);
                if (value < lowest) lowest = value;
                if (value > highest) highest = value;
            }

            console.log(`low: ${lowest}, high: ${highest}, sum: ${lowest + highest}`);
            break;
        } else if (runTarget < 0) {
            break;
        }
    }
}
