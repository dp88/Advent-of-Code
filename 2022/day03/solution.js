const fs = require('fs');

const priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const backpacks = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const compartments = backpacks
    .map((b) => [
        b.substring(0, b.length / 2).split('').sort((a, b) => priority.indexOf(a) - priority.indexOf(b)).join(''),
        b.substring(b.length / 2).split('').sort((a, b) => priority.indexOf(a) - priority.indexOf(b)).join('')
    ]);

const duplicates = compartments
    .map((backpack) => {
        for (const item of backpack[0]) {
            if (backpack[1].indexOf(item) > -1) return priority.indexOf(item) + 1;
        }
    });

function findBadgePriority(group) {
    const sorted = group.sort((a, b) => a.length - b.length);

    for (const char of sorted[0]) {
        if (sorted[1].indexOf(char) >= 0 && sorted[2].indexOf(char) >= 0) {
            return priority.indexOf(char) + 1;
        }
    }
}

console.log('solution part 1)');
console.log(`sum of dupe priorities: ${duplicates.reduce((sum, priority) => sum + priority, 0)}`);

console.log('----------------------------------------------------------------------');

let badgePriorities = 0;
for (let i = 0; i < backpacks.length; i += 3) {
    badgePriorities += findBadgePriority([backpacks[i], backpacks[i + 1], backpacks[i + 2]]);
}

console.log('solution part 2)');
console.log(`sum of badge priorities: ${badgePriorities}`);
