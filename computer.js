const readline = require('readline-sync');

module.exports = function computer (program, noun = null, verb = null) {
    let mem = program.slice(0);
    if (noun !== null) mem[1] = noun;
    if (verb !== null) mem[2] = verb;
    for (let i = 0; i < mem.length; i++) {
        mem[i] = parseInt(mem[i]);
    }

    const value = (m, p) => m == 1 ? mem[p] : mem[mem[p]];
    const pos   = (m, p) => m == 1 ? p : mem[p];
    const operation = [
        // 00
        () => 0,
        // 01 - addition
        (mode) => {
            mem[mem[position + 3]] = value(mode[0], position + 1) + value(mode[1], position + 2);
            return 4;
        },
        // 02 - multiply
        (mode) => {
            mem[mem[position + 3]] = value(mode[0], position + 1) * value(mode[1], position + 2);
            return 4;
        },
        // 03 - get input
        (mode) => {
            const input = readline.question('>');
            mem[mem[position + 1]] = parseInt(input);
            return 2;
        },
        // 04 - print
        (mode) => {
            console.log(value(mode[0], position + 1));
            return 2;
        },
        // 05 - t-jump
        (mode) => value(mode[0], position + 1) != 0 ? value(mode[1], position + 2) - position : 3,
        // 06 - f-jump
        (mode) => value(mode[0], position + 1) == 0 ? value(mode[1], position + 2) - position : 3,
        // 07 - test <
        (mode) => {
            mem[mem[position + 3]] = value(mode[0], position + 1) < value(mode[1], position + 2) ? 1 : 0;
            return 4;
        },
        // 08 - test =
        (mode) => {
            mem[mem[position + 3]] = value(mode[0], position + 1) == value(mode[1], position + 2) ? 1 : 0;
            return 4;
        },
    ];

    let position = 0;
    while (true) {
        let instruction = mem[position].toString(10);
        while (instruction.length < 5) {
            instruction = `0${instruction}`;
        }

        const opcode = parseInt(instruction.substring(3));
        if (opcode == 99) {
            return mem[0];
        } else {
            const mode = instruction.substring(0, 3).split('').reverse();
            position += operation[opcode](mode);
        }
    }
}
