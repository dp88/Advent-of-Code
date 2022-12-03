const input = (new TextDecoder('utf-8')).decode(Deno.readFileSync('./2022/day01/input.txt'));

const backpacks = input.split('\r\n\r\n')
    .map((rawPack) => {
        const contents = rawPack.split('\r\n');
        return contents.map((str) => parseInt(str));
    });

const sorted = backpacks
    .map((pack) => pack.reduce((sum, food) => sum + food, 0))
    .sort((a, b) => b - a)
    .slice(0, 3);

console.log('solution part 1)');
console.log(`highest caloric content: ${sorted[0]}`);

console.log('----------------------------------------------------------------------');

console.log('solution part 2)');
console.log(`top 3 caloric sum: ${sorted.reduce((sum, calories) => sum + calories, 0)}`);
