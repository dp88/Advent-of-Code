const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

class Bag {
    static all = {};

    constructor(name) {
        this.name = name;
        this.contains = {};
        this.containedIn = {};
    }

    static getOrCreate(name) {
        if (typeof Bag.all[name] == 'undefined') {
            Bag.all[name] = new Bag(name);
        }
    
        return Bag.all[name];
    }

    getParents() {
        let parents = [this.name];
        for (const p in this.containedIn) {
            parents = [...parents, ...this.containedIn[p].getParents()];
        }

        return parents.filter((value, index, self) => self.indexOf(value) === index);
    }
}

for (const rule of input) {
    const split = rule.split(' bags contain ');
    const container = Bag.getOrCreate(split[0]);

    for (const bag of split[1].split(', ')) {
        const containee = Bag.getOrCreate(bag.replace(/[0-9\.]|(bags|bag)/g, '').trim());

        containee.containedIn[container.name] = container;
        container.contains[containee.name] = containee;
    }
}

console.log('solution part 1)')
console.log(`shiny gold container possibilities: ${Bag.all['shiny gold'].getParents().length - 1}`);
