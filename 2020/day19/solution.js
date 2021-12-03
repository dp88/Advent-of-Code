const fs = require('fs');
const ruleInput = fs.readFileSync( __dirname + '/rules.txt', 'utf8').split('\r\n');
const messages = fs.readFileSync( __dirname + '/messages.txt', 'utf8').split('\r\n');

const rules = {};

for (const rule of ruleInput) {
    const key = rule.split(': ')[0];
    const value = rule.split(': ')[1];

    if (value.indexOf('"') > -1) {
        rules[key] = value.replace(/\"/g, '');
    } else if (value.indexOf(" | ") > -1) {
        rules[key] = [
            value.split(" | ")[0].split(" "),
            value.split(" | ")[1].split(" "),
        ];
    } else {
        rules[key] = value.split(" ");
    }
}

const applyRule = (message, rule, index = 0) => {
    if (typeof rules[rule] == string) {
        return message[index] == rules[rule];
    }

    if (Array.isArray(rules[rule][0])) {
        // return applyRule(rules)
    }

    for (let i = 0; i < rules[rule].length; i++) {
        
    }
}

let count = 0;
for (const message in messages) {
    if (applyRule(message, '0')) count++;
}

console.log('solution part 1)');
console.log(`correct messages: ${count}`);
