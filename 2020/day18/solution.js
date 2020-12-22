const fs = require('fs');
let input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

const calculate = (parameters, start = 0) => {
    let result = 0;
    let nextOperator = '+';
    parameters = parameters.replace(/ /g, '');
    
    const applyOperator = (number) => {
        if (nextOperator == '+') result += number;
        if (nextOperator == '*') result *= number;
    };

    let i = start;
    while (i < parameters.length) {
        const part = parameters[i];

        if (part == '(') {
            const { subResult, advanceTo } = calculate(parameters, i + 1);
            applyOperator(subResult);
            i = advanceTo;
        } else if (part == ')') {
            return { subResult: result, advanceTo: i + 1 };
        } else {
            if (part == '+' || part == '*') {
                nextOperator = part;
            } else if (typeof parseInt(part) == 'number') {
                applyOperator(parseInt(part));
            }

            i++;
        }
    }

    return result;
};

let sum = 0;
for (const equation of input) {
    sum += calculate(equation);
}

console.log('solution part 1)');
console.log(`sum: ${sum}`);
