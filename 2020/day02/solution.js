const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

class Password {
    constructor (entry) {
        const rulepass = entry.split(': ');
        const numberCharacter = rulepass[0].split(' ');

        this.text = rulepass[1];
        this.rule = {
            min: parseInt(numberCharacter[0].split('-')[0]),
            max: parseInt(numberCharacter[0].split('-')[1]),
            character: numberCharacter[1],
        };
    }

    isValidOld() {
        let characterCount = 0;
        for (let i = 0; i < this.text.length; i++) {
            if (this.text[i] == this.rule.character) {
                characterCount++;
            }
        }

        return characterCount >= this.rule.min &&
               characterCount <= this.rule.max;
    }

    isValidNew() {
        let correctPositions = 0;
        if (this.text[this.rule.min - 1] == this.rule.character) correctPositions++;
        if (this.text[this.rule.max - 1] == this.rule.character) correctPositions++;

        return correctPositions == 1;
    }
}

const passwords = [];
for (const i of input) {
    passwords.push(new Password(i));
}

let validOldPasswords = 0;
for (const password of passwords) {
    if (password.isValidOld()) {
        validOldPasswords++;
    }
}

console.log('solution part 1)');
console.log(`valid passwords: ${validOldPasswords}`);

let validNewPasswords = 0;
for (const password of passwords) {
    if (password.isValidNew()) {
        validNewPasswords++;
    }
}

console.log('solution part 2)');
console.log(`valid passwords: ${validNewPasswords}`);
