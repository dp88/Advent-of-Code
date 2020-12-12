const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

class Computer {
    operation = {
        'acc': (arg) => {
            this.accumulator.current += arg;
            return 1;
        },
        'jmp': (arg) => arg,
        'nop': (arg) => 1,
    };

    constructor () {
        this.instructions = [];
        this.accumulator = {
            current: 0,
            previous: 0,
        };
    }

    execute (switchInstruction = -1) {
        let i = 0;
        while (this.instructions.length == [...(new Set(this.instructions))].length) {
            const instruction = input[i].split(' ');

            if (switchInstruction == i) {
                if (instruction[0] == 'jmp') {
                    instruction[0] = 'nop';
                } else if (instruction[0] == 'nop') {
                    instruction[0] = 'jmp';
                }
            }
    
            this.instructions.push(i);
            this.accumulator.previous = this.accumulator.current;
            i += this.operation[instruction[0]](parseInt(instruction[1]));

            if (i >= input.length) {
                return true;
            }
        }

        return false;
    }
}

const computer = new Computer();
computer.execute();

console.log('solution part 1)');
console.log(`last valid accumulator value: ${computer.accumulator.previous}`);

console.log('solution part 2)');
for (let i = 0; i < input.length; i++) {
    const computer = new Computer();
    if (computer.execute(i)) {
        console.log(`accumulator result: ${computer.accumulator.current}`);
        break;
    }
}
