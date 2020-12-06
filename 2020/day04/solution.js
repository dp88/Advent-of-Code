const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n\r\n');

const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
let valid = 0;

class Passport {
    constructor (text) {
        this.fields = {};

        const pairs = text.replace(/\r\n/g, ' ').split(' ');
        for (const pair of pairs) {
            const p = pair.split(':');
            this.fields[p[0]] = p[1];
        }
    }

    isValid () {
        let validation = {};
        for (const field of required) {
            validation[field] = false;
        }

        for (const field in this.fields) {
            validation[field] = true;
        }

        for (const field in validation) {

            if (validation[field] != true) return false;
        }

        return true;
    }
}

for (const i of input) {
    if ((new Passport(i)).isValid()) {
        valid++;
    }
}

console.log('solution part 1)');
console.log(`valid passports: ${valid}`);
