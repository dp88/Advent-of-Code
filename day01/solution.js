const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

let moduleFuel = 0;
let addedFuel = 0;

for (let i = 0; i < input.length; i++) {
    const weight = parseInt(input[i]);
    if (Number.isNaN(weight)) continue;
    let fuel = Math.floor(weight / 3) - 2;
    moduleFuel += fuel;
    
    while (fuel > 0) {
        fuel = Math.floor(fuel / 3) - 2;
        if (fuel > 0) {
            addedFuel += fuel;
        }
    }
}

console.log('solution part 1)');
console.log(`fuel required for modules: ${moduleFuel}`);

console.log('solution part 2)');
console.log(`fuel required for fuel weight: ${addedFuel}`);
console.log(`total fuel: ${moduleFuel + addedFuel}`);
