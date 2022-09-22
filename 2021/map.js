module.exports = function (width, length, diagonalNeighbors = false) {
    return {
        indexToXY(i) {
            return [ i % width, Math.floor(i / width) ];
        },

        safeIndex(x, y) {
            if (x < 0 || x >= width) return -1;
            if (y < 0 || y >= length) return -1;
        
            return (y * width) + x;
        },

        neighbors(x, y) {
            return [
                this.safeIndex(x,     y - 1), // North
                this.safeIndex(x + 1, y - 1), // Northeast
                this.safeIndex(x + 1, y    ), // East
                this.safeIndex(x + 1, y + 1), // Southeast
                this.safeIndex(x,     y + 1), // South
                this.safeIndex(x - 1, y + 1), // Southwest
                this.safeIndex(x - 1, y    ), // West
                this.safeIndex(x - 1, y - 1), // Northwest
            ]
            .map((value, index) => {
                if (diagonalNeighbors) return value;
                return index % 2 == 0 ? value : -1;
            })
            .filter((i) => i >= 0);
        }
    };
};
