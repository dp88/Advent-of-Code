const fs = require('fs');
const rules = fs.readFileSync( __dirname + '/rules.txt', 'utf8').split('\r\n');
const ticket = fs.readFileSync( __dirname + '/ticket.txt', 'utf8').split(',');
const others = fs.readFileSync( __dirname + '/others.txt', 'utf8').split('\r\n');

let allValidValues = [];
let ruleValues = {};

for (const rule of rules) {
    const name = rule.split(': ')[0];
    ruleValues[name] = [];

    const ranges = rule.split(': ')[1].split(' or ');
    for (let r = 0; r < ranges.length; r++) {
        const range = ranges[r].split('-');

        for (let a = parseInt(range[0]); a <= parseInt(range[1]); a++) {
            if (allValidValues.indexOf(a) == -1) allValidValues.push(a);
            if (ruleValues[name].indexOf(a) == -1) ruleValues[name].push(a);
        }
    }
}

let validTickets = [];

let sum = 0;
for (const ticket of others) {
    const values = ticket.split(',');
    let ticketIsValid = true;

    for (const value of values) {
        const parsed = parseInt(value);
        if (allValidValues.indexOf(parsed) == -1) {
            sum += parsed;
            ticketIsValid = false;
        }
    }

    if (ticketIsValid) {
        validTickets.push(ticket);
    }
}

console.log('solution part 1)');
console.log(`sum: ${sum}`);

let columns = [];
for (let i = 0; i < ticket.length; i++) {
    columns[i] = [];

    let columnValues = [];
    for (const otherTicket of validTickets) {
        columnValues.push(parseInt(otherTicket.split(',')[i]));
    }

    for (const ruleName in ruleValues) {
        let columnPossible = true;

        for (const value of columnValues) {
            if (ruleValues[ruleName].indexOf(value) == -1) {
                columnPossible = false;
                break;
            }
        }

        if (columnPossible) {
            columns[i].push(ruleName);
        }
    }
}

let c = 0;
while (c < columns.length) {
    if (columns[c].length == 1) {
        let needsReset = false;

        for (let p = 0; p < columns.length; p++) {
            if (p == c) continue;

            const dupeIndex = columns[p].indexOf(columns[c][0]);
            if (dupeIndex > -1) {
                columns[p].splice(dupeIndex, 1);
                needsReset = true;
            }
        }

        if (needsReset) {
            c = 0;
        }
    }

    if (++c == columns.length) {
        let allSorted = true;
        columns.forEach((c) => {
            if (c.length > 1) allSorted = false;
        });
    
        if (!allSorted) c = 0;
    }
}

let product = 1;
for (c = 0; c < columns.length; c++) {
    if (columns[c][0].indexOf('departure') == 0) {
        product *= parseInt(ticket[c]);
    }
}

console.log('solution part 2)');
console.log(`product: ${product}`);
