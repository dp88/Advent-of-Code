const fs = require('fs');
let input = fs.readFileSync( __dirname + '/input.txt', 'utf8').split('\r\n');

class Space {
    constructor (previous) {
        this.active = 0;
        this.data = {};
        this.bounds = {
            'x': { 'low': 0, 'high': 0 },
            'y': { 'low': 0, 'high': 0 },
            'z': { 'low': 0, 'high': 0 },
        };

        if (typeof previous != 'undefined') {
            for (let x = previous.bounds.x.low - 1; x <= previous.bounds.x.high + 1; x++) {
                for (let y = previous.bounds.y.low - 1; y <= previous.bounds.y.high + 1; y++) {
                    for (let z = previous.bounds.z.low - 1; z <= previous.bounds.z.high + 1; z++) {
                        const selfActive = previous.getCube(x, y, z);
                        let neighborsActive = 0;
                        previous.getNeighbors(x, y, z).forEach((n) => {
                            if (n) neighborsActive++;
                        });

                        if (selfActive && neighborsActive >= 2 && neighborsActive <= 3) {
                            this.setCube(x, y, z, true);
                        } else if (!selfActive && neighborsActive == 3) {
                            this.setCube(x, y, z, true);
                        } else {
                            this.setCube(x, y, z, false);
                        }
                    }
                }
            }
        }
    }

    setCube (x, y, z, on = false) {
        if (typeof this.data[x] == 'undefined') this.data[x] = {};
        if (typeof this.data[x][y] == 'undefined') this.data[x][y] = {};
        this.data[x][y][z] = on;

        if (on) this.active++;

        if (x > this.bounds.x.high) this.bounds.x.high = x;
        if (x < this.bounds.x.low)  this.bounds.x.low  = x;
        if (y > this.bounds.y.high) this.bounds.y.high = y;
        if (y < this.bounds.y.low)  this.bounds.y.low  = y;
        if (z > this.bounds.z.high) this.bounds.z.high = z;
        if (z < this.bounds.z.low)  this.bounds.z.low  = z;
    }

    getCube (x, y, z) {
        if (typeof this.data[x] == 'undefined') return false;
        if (typeof this.data[x][y] == 'undefined') return false;
        if (typeof this.data[x][y][z] == 'undefined') return false;
        
        return this.data[x][y][z] == true;
    }

    getNeighbors (x, y, z) {
        let neighbors = [];

        for (let xx = -1; xx < 2; xx++) {
            for (let yy = -1; yy < 2; yy++) {
                for (let zz = -1; zz < 2; zz++) {
                    if (xx == 0 && yy == 0 && zz == 0) continue;
                    neighbors.push(this.getCube(xx + x, yy + y, zz + z));
                }
            }
        }

        return neighbors;
    }

    dump () {
        for (let z = this.bounds.z.low - 1; z <= this.bounds.z.high + 1; z++) {
            console.log(`\r\nz=${z}`);

            for (let y = this.bounds.y.low - 1; y <= this.bounds.y.high + 1; y++) {
                let row = '';

                for (let x = this.bounds.x.low - 1; x <= this.bounds.x.high + 1; x++) {
                    row += this.getCube(x, y, z) ? '#' : '.';
                }

                console.log(row);
            }
        }
    }
}

let time = [new Space()];
for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        time[0].setCube(x, y, 0, input[y][x] == '#');
    }
}

for (let i = 1; i < 7; i++) {
    time.push(new Space(time[i - 1]));
}

console.log('solution part 1)');
console.log(`active: ${time[time.length - 1].active}`);
