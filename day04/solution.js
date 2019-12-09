const bounds = [307237, 769058];
let possibilities = 0, strictPossibilities = 0;

for (let i = bounds[0]; i <= bounds[1]; i++) {
    let digits = `${i}`.split('');
    for (let j = 0; j < 6; j++) {
        digits[j] = parseInt(digits[j]);
    }

    let onlyIncreases = true, hasDouble = false, hasTrueDouble = false;
    let sequenceCounter = 0;
    for (let j = 1; j < 6; j++) {
        if (digits[j] < digits[j - 1]) {
            onlyIncreases = false;
        }

        if (digits[j] == digits[j - 1]) {
            hasDouble = true;
            sequenceCounter++;
        } else {
            if (sequenceCounter == 1) {
                hasTrueDouble = true;
            }
            sequenceCounter = 0;
        }
    }

    if (sequenceCounter == 1) {
        hasTrueDouble = true;
    }

    if (onlyIncreases && hasDouble) {
        possibilities++;

        if (hasTrueDouble) {
            strictPossibilities++;
        }
    }
}

console.log('solution part 1)');
console.log(`possibilities: ${possibilities}`);

console.log('solution part 2)');
console.log(`possibilities: ${strictPossibilities}`);
