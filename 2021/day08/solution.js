const fs = require('fs');

const everything = (except = []) => ['a', 'b', 'c', 'd', 'e', 'f', 'g'].filter((l) => !except.includes(l));

const reference = [
    ['a', 'b', 'c', 'e', 'f', 'g'],      // 0
    ['c', 'f',],                         // 1
    ['a', 'c', 'd', 'e', 'g'],           // 2
    ['a', 'c', 'd', 'f', 'g'],           // 3
    ['b', 'c', 'd', 'f'],                // 4
    ['a', 'b', 'd', 'f', 'g'],           // 5
    ['a', 'b', 'd', 'e', 'f', 'g'],      // 6
    ['a', 'c', 'f'],                     // 7
    ['a', 'b', 'c', 'd', 'e', 'f', 'g'], // 8
    ['a', 'b', 'c', 'd', 'f', 'g'],      // 9
];

class PossibilityGrid {                                     //   a b c
    constructor() {                                         // a o x o
        this.grid = [];                                     // b x o o
        for (let i = 0; i < 49; i++) this.grid.push(true);  // c o o o
    }

    falsify(letterOne, letterTwo) {
        if (Array.isArray(letterTwo)) {
            for (const letter of letterTwo) {
                this.falsify(letterOne, letter);
            }

            return;
        }

        const one = everything().indexOf(letterOne),
              two = everything().indexOf(letterTwo);

        this.grid[(two * 7) + one] = false;
        this.grid[(one * 7) + two] = false;
    }

}

class Signal {
    constructor(signal) {
        const io = signal.split(' | ');
        this.input = io[0].split(' ');
        this.output = io[1].split(' ');
        this.wires = new PossibilityGrid();

        this.partOneMatches = 0;

        for (const combination of this.output) {
            // filter first on unique lengths
            switch (combination.length) {
                case 2: // Is one
                    combination.split('').forEach((l) => this.wires.falsify(l, everything(reference[1])));
                    this.partOneMatches++;
                    break;
                case 4: // Is four
                    combination.split('').forEach((l) => this.wires.falsify(l, everything(reference[4])));
                    this.partOneMatches++;
                    break;
                case 3: // Is seven
                    combination.split('').forEach((l) => this.wires.falsify(l, everything(reference[7])));
                    this.partOneMatches++;
                    break;
                case 7: // Is eight
                    combination.split('').forEach((l) => this.wires.falsify(l, everything(reference[8])));
                    this.partOneMatches++;
                    break;
            }
        }
    }
}

const signals = fs.readFileSync( __dirname + '/input.txt', 'utf8')
    .split('\r\n')
    .map((signal) => new Signal(signal));

console.log('solution part 1)');
console.log(`instances of 1, 4, 7, or 8: ${signals.reduce((sum, signal) => sum + signal.partOneMatches, 0)}`);
