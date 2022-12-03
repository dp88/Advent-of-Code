const input = (new TextDecoder('utf-8')).decode(Deno.readFileSync('./2022/day01/input.txt'));

const backpacks = input.split('\r\n\r\n')
    .map((rawPack) => {
        const contents = rawPack.split('\r\n');
        return contents.map((str) => parseInt(str));
    });

const largest = backpacks
    .map((pack) => pack.reduce((sum, food) => sum + food, 0))
    .sort((a, b) => b - a)[0];

console.log('solution part 1)');
console.log(`highest caloric content: ${largest}`);
