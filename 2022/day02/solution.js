const fs = require('fs');
const rounds = fs.readFileSync( __dirname + '/input.txt', 'utf8')
    .split('\r\n')
    .map(
        (round) => round.split(' ')
            .map((hand) => (["A", "B", "C", "X", "Y", "Z"].indexOf(hand) % 3) + 1)
    );

function scoreForRound(round) {
    const choice = round[1];
    let outcome;
    switch (Math.abs(round[1] - round[0])) {
        case 0: // Draw
            outcome = 3
            break;
        case 1: // Higher wins
            outcome = (round.indexOf(Math.max(...round)) == 1) ? 6 : 0;
            break;
        default: // Lower wins
            outcome = (round.indexOf(Math.min(...round)) == 1) ? 6 : 0;
            break;
    }

    return choice + outcome;
}

console.log('solution part 1)');
console.log(`total score: ${rounds.map(scoreForRound).reduce((sum, result) => sum + result, 0)}`);

console.log('----------------------------------------------------------------------');

const otherResults = rounds.map((round) => {
        const opponent = round[0] - 1 + 3; // Normalized to 0-2, then added 3 so negative results mod correctly.
        let player = 0;

        switch (round[1]) {
            case 1: // Loss required
                player = (opponent - 1) % 3;
                break;
            case 2: // Draw required
                player = opponent % 3;
                break;
            case 3: // Win required
                player = (opponent + 1) % 3;
                break;
        }

        return [(opponent % 3) + 1, player + 1];
    })
    .map(scoreForRound);

console.log('solution part 2)');
console.log(`total score: ${otherResults.reduce((sum, result) => sum + result, 0)}`);
