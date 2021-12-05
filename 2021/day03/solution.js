const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

function average() {
    let sum = 0,
        denominator = 0;
    
    return {
        add: (digit) => { sum += digit; denominator++; },
        value: () => sum / denominator,
        count: () => denominator,
    }
}

function compliment(value) {
    let inverse = '';
    for (let i = 0; i < value.length; i++) {
        inverse += value[i] == '1' ? '0' : '1';
    }
    return inverse;
}

let bits = [];

for (let bit = 0; bit < input[0].length; bit++) {
    bits[bit] = average();
}

for (let i = 0; i < input.length; i++) {
    for (let bit = 0; bit < input[i].length; bit++) {
        bits[bit].add(parseInt(input[i][bit]));
    }
}

let γ = '';
for (let bit = 0; bit < bits.length; bit++) {
    γ += Math.round(bits[bit].value()).toString();
}

function lifeSupport(predicate) {
    let searchPrefix = '';
    let lastCheck = '';
    let done = false;
    let avg = average();

    return {
        addIfPrefixMatches: (value) => {
            if (!value.startsWith(searchPrefix) || done) return;

            lastCheck = value;
            avg.add(parseInt(value.substr(searchPrefix.length, 1)));
        },
        store: () => {
            searchPrefix += predicate(avg.value()) ? '1' : '0';
            done = done || avg.count() == 1;
            avg = average();
        },
        finalValue: () => done ? lastCheck : false,
    };
}

const O2 = lifeSupport((x) => x >= 0.5),
      CO2 = lifeSupport((x) => x < 0.5);

while (!O2.finalValue() || !CO2.finalValue()) {
    for (let i = 0; i < input.length; i++) {
        O2.addIfPrefixMatches(input[i]);
        CO2.addIfPrefixMatches(input[i]);
    }

    O2.store();
    CO2.store();
}

console.log('solution part 1)');
console.log(`power consumption: ${parseInt(γ, 2) * parseInt(compliment(γ), 2)}`);

console.log('----------------------------------------------------------------------');

console.log('solution part 2)');
console.log(`life support rating: ${parseInt(O2.finalValue(), 2) * parseInt(CO2.finalValue(), 2)}`);
