const fs = require('fs');
let fish = fs.readFileSync( __dirname + '/input.txt', 'utf8').split(',');

let BBQ = 0;

for (let i = 0; i < 80; i++) {
    fish = fish.map((f) => {
        if (f == 0) {
            BBQ++;
            return 6;
        }

        return f - 1;
    });

    while (BBQ > 0) {
        fish.push(8);
        BBQ--;
    }
}

console.log('solution part 1)');
console.log(`fish after 80 days: ${fish.length}`);
