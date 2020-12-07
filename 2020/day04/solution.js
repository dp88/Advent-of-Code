const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n\r\n');

class Passport {
    required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

    rules = {
        'byr': (value) => parseInt(value) >= 1920 && parseInt(value) <= 2002,
        'iyr': (value) => parseInt(value) >= 2010 && parseInt(value) <= 2020,
        'eyr': (value) => parseInt(value) >= 2020 && parseInt(value) <= 2030,
        'hgt': (value) => {
            if (value.indexOf('cm') > -1) {
                return parseInt(value) >= 150 && parseInt(value) <= 193;
            } else if (value.indexOf('in') > -1) {
                return parseInt(value) >= 59 && parseInt(value) <= 76;
            }
    
            return false;
        },
        'hcl': (value) => {
            if (value.indexOf('#') != 0) return false;
            if (value.length != 7) return false;
            if (value.replace(/[0-9a-f]/g, '') != '#') return false;
    
            return true;
        },
        'ecl': (value) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(value) > -1,
        'pid': (value) => {
            if (value.replace(/[0-9]/g, '') != '') return false;
            return value.length == 9;
        },
    };

    constructor (text) {
        this.fields = {};

        const pairs = text.replace(/\r\n/g, ' ').split(' ');
        for (const pair of pairs) { 
            const p = pair.split(':');
            this.fields[p[0]] = p[1];
        }
    }

    hasAllFields () {
        let validation = {};
        for (const field of this.required) {
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

    presentFieldsValid () {
        
        for (const field in this.fields) {
            if (typeof this.rules[field] == 'undefined') continue;
            if (this.rules[field](this.fields[field]) != true) return false; 
        }

        return true;
    }
}

const passports = [];
for (const i of input) {
    passports.push(new Passport(i));
}

let correctFields = 0;
for (const passport of passports) {
    if (passport.hasAllFields()) {
        correctFields++;
    }
}

console.log('solution part 1)');
console.log(`passports with correct fields: ${correctFields}`);

let valid = 0;
for (const passport of passports) {
    if (passport.hasAllFields() && passport.presentFieldsValid()) {
        valid++;
    }
}

console.log('solution part 2)');
console.log(`valid passports: ${valid}`);
