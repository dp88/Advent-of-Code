const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

class Bag {
    static all = {};

    constructor(name) {
        this.name = name;
        this.contains = {};
        this.containsQty = {};
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

    getChildren() {
        const children = {};

        for (const c in this.containsQty) {
            if (typeof children[c] == 'undefined') {
                children[c] = 0;
            }

            children[c] += this.containsQty[c];

            const grandchildren = this.contains[c].getChildren();
            const multiple = this.containsQty[c];

            for (const gc in grandchildren) {
                if (typeof children[gc] == 'undefined') {
                    children[gc] = 0;
                }

                children[gc] += grandchildren[gc] * multiple;
            }
        }

        return children;
    }
}

for (const rule of input) {
    const split = rule.split(' bags contain ');
    const container = Bag.getOrCreate(split[0]);

    for (const bag of split[1].split(', ')) {
        const name = bag.replace(/[0-9\.]|(bags|bag)/g, '').trim();
        if (name == 'no other') continue;

        const containee = Bag.getOrCreate(name);
        containee.containedIn[container.name] = container;
        container.contains[containee.name] = containee;
        container.containsQty[containee.name] = parseInt(bag);
    }
}

console.log('solution part 1)');
console.log(`shiny gold container possibilities: ${Bag.all['shiny gold'].getParents().length - 1}`);

let shinyGoldChildren = 0;
Object.values(Bag.all['shiny gold'].getChildren()).forEach((qty) => shinyGoldChildren += qty);
console.log('solution part 2)');
console.log(`a shiny gold bag contains ${shinyGoldChildren} other bags... oof`);
