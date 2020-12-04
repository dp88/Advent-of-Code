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

    isValid() {
        let characterCount = 0;
        for (let i = 0; i < this.text.length; i++) {
            if (this.text[i] == this.rule.character) {
                characterCount++;
            }
        }

        return characterCount >= this.rule.min &&
               characterCount <= this.rule.max;
    }
}

let validPasswords = 0;
for (let i = 0; i < input.length; i++) {
    if ((new Password(input[i])).isValid()) {
        validPasswords++;
    }
}

console.log('solution part 1)');
console.log(`valid passwords: ${validPasswords}`);
