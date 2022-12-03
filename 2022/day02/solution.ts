const rounds = (new TextDecoder('utf-8'))
    .decode(Deno.readFileSync('./2022/day02/input.txt'))
    .split('\r\n').map(
        (round) => round.split(' ')
            .map((hand) => (["A", "B", "C", "X", "Y", "Z"].indexOf(hand) % 3) + 1)
    );

const results = rounds.map((round) => {
    const result = [round[1]];
    switch (Math.abs(round[1] - round[0])) {
        case 0: // Draw
            result[1] = 3
            break;
        case 1: // Higher wins
            result[1] = (round.indexOf(Math.max(...round)) == 1) ? 6 : 0;
            break;
        default: // Lower wins
            result[1] = (round.indexOf(Math.min(...round)) == 1) ? 6 : 0;
            break;
    }

    return result;
});

console.log('solution part 1)');
console.log(`total score: ${results.reduce((sum, resultSet) => sum + resultSet[0] + resultSet[1], 0)}`);
