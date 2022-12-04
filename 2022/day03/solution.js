const fs = require('fs');

const priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const backpacks = fs.readFileSync( __dirname + '/input.txt', 'utf8')
    .split('\r\n')
    .map((b) => [
        b.substring(0, b.length / 2).split('').sort((a, b) => priority.indexOf(a) - priority.indexOf(b)).join(''),
        b.substring(b.length / 2).split('').sort((a, b) => priority.indexOf(a) - priority.indexOf(b)).join('')
    ]);

const duplicates = backpacks
    .map((backpack) => {
        for (const item of backpack[0]) {
            if (backpack[1].indexOf(item) > -1) return priority.indexOf(item) + 1;
        }
    });

console.log('solution part 1)');
console.log(`sum of dupe priorities: ${duplicates.reduce((sum, priority) => sum + priority, 0)}`);
