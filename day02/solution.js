const fs = require('fs');
const input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split(',');

for (let i = 0; i < input.length; i++) {
    input[i] = parseInt(input[i]);
}

function runProgram (n, v) {
    let memory = input.slice(0);
    memory[1] = n;
    memory[2] = v;

    let instruction = 0;
    while (memory[instruction * 4] != 99) {
        const reg1 = memory[(instruction * 4) + 1],
              reg2 = memory[(instruction * 4) + 2],
              out  = memory[(instruction * 4) + 3];

        switch (memory[instruction * 4]) {
            case 1:
                memory[out] = memory[reg1] + memory[reg2];
                break;
            case 2:
                memory[out] = memory[reg1] * memory[reg2];
                break;
        }
        instruction++;
    }

    return memory[0];
}

console.log('solution part 1)');
console.log(`output: ${runProgram(12, 2)}`);

const goal = 19690720;
for (let n = 0; n < 100; n++) {
    for (let v = 0; v < 100; v++) {
        if (runProgram(n, v) === goal) {
            console.log('solution part 2)');
            console.log(`input required to reach ${goal}: ${n}, ${v}`);
            console.log(`formatted: ${100 * n + v}`);
            return;
        }
    }
}
