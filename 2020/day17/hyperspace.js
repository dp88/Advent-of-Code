module.exports = class Hyperspace {
    constructor (previous) {
        this.active = 0;
        this.data = {};
        this.bounds = {
            'x': { 'low': 0, 'high': 0 },
            'y': { 'low': 0, 'high': 0 },
            'z': { 'low': 0, 'high': 0 },
            'w': { 'low': 0, 'high': 0 },
        };

        if (typeof previous != 'undefined') {
            for (let x = previous.bounds.x.low - 1; x <= previous.bounds.x.high + 1; x++) {
                for (let y = previous.bounds.y.low - 1; y <= previous.bounds.y.high + 1; y++) {
                    for (let z = previous.bounds.z.low - 1; z <= previous.bounds.z.high + 1; z++) {
                        for (let w = previous.bounds.w.low - 1; w <= previous.bounds.w.high + 1; w++) {
                            const selfActive = previous.getCube(x, y, z, w);
                            let neighborsActive = 0;
                            previous.getNeighbors(x, y, z, w).forEach((n) => {
                                if (n) neighborsActive++;
                            });

                            if (selfActive && neighborsActive >= 2 && neighborsActive <= 3) {
                                this.setCube(x, y, z, w, true);
                            } else if (!selfActive && neighborsActive == 3) {
                                this.setCube(x, y, z, w, true);
                            } else {
                                this.setCube(x, y, z, w, false);
                            }
                        }
                    }
                }
            }
        }
    }

    setCube (x, y, z, w, on = false) {
        if (typeof this.data[x] == 'undefined') this.data[x] = {};
        if (typeof this.data[x][y] == 'undefined') this.data[x][y] = {};
        if (typeof this.data[x][y][z] == 'undefined') this.data[x][y][z] = {};
        this.data[x][y][z][w] = on;

        if (on) this.active++;

        if (x > this.bounds.x.high) this.bounds.x.high = x;
        if (x < this.bounds.x.low)  this.bounds.x.low  = x;
        if (y > this.bounds.y.high) this.bounds.y.high = y;
        if (y < this.bounds.y.low)  this.bounds.y.low  = y;
        if (z > this.bounds.z.high) this.bounds.z.high = z;
        if (z < this.bounds.z.low)  this.bounds.z.low  = z;
        if (w > this.bounds.w.high) this.bounds.w.high = w;
        if (w < this.bounds.w.low)  this.bounds.w.low  = w;
    }

    getCube (x, y, z, w) {
        if (typeof this.data[x] == 'undefined') return false;
        if (typeof this.data[x][y] == 'undefined') return false;
        if (typeof this.data[x][y][z] == 'undefined') return false;
        if (typeof this.data[x][y][z][w] == 'undefined') return false;
        
        return this.data[x][y][z][w] == true;
    }

    getNeighbors (x, y, z, w) {
        let neighbors = [];

        for (let xx = -1; xx < 2; xx++) {
            for (let yy = -1; yy < 2; yy++) {
                for (let zz = -1; zz < 2; zz++) {
                    for (let ww = -1; ww < 2; ww++) {
                        if (xx == 0 && yy == 0 && zz == 0 && ww == 0) continue;
                        neighbors.push(this.getCube(xx + x, yy + y, zz + z, ww + w));
                    }
                }
            }
        }

        return neighbors;
    }
}
