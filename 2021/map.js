const PriorityQueue = require('js-priority-queue');

module.exports = function (width, height, diagonalNeighbors = false) {
    return {
        indexToXY(i) {
            return [ i % width, Math.floor(i / width) ];
        },

        safeIndex(x, y) {
            if (x < 0 || x >= width) return -1;
            if (y < 0 || y >= height) return -1;
        
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
        },

        pathfind(from, to, costToNeighbor) {
            const cameFrom = { [from]: null };
            const costSoFar = { [from]: 0 };
            const queue = new PriorityQueue({ comparator: (a, b) => a.priority - b.priority });
            queue.queue({ node: from, priority: 0 });

            const [tx, ty] = this.indexToXY(to);

            const enqueueOrUpdate = (neighbor, current, cost, distanceToGoal) => {
                if (!costSoFar.hasOwnProperty(neighbor) || cost < costSoFar[neighbor]) {
                    costSoFar[neighbor] = cost;
                    cameFrom[neighbor] = current;
                    queue.queue({ node: neighbor, priority: cost + distanceToGoal });
                }
            };

            const printIteration = this.iterationPrinter();
            do {
                const top = queue.dequeue();
                let current = parseInt(top.node);

                if (current == to) {
                    let path = [current];
                    while(cameFrom[current] != null) {
                        path.push(cameFrom[current]);
                        current = cameFrom[current];
                    }

                    return path.reverse();
                }

                const [x, y] = this.indexToXY(current);
                printIteration(queue, top);

                if (queue.length >= 111) {
                    this.dumpQueue(queue);
                    return [];
                }

                for (const neighbor of this.neighbors(x, y)) {
                    const [nx, ny] = this.indexToXY(neighbor);
                    
                    enqueueOrUpdate(
                        neighbor,
                        current,
                        costToNeighbor(current, neighbor, {...costSoFar}),
                        Math.sqrt(Math.pow(nx - tx, 2) + Math.pow(ny - ty, 2))
                    );
                }
            } while (queue.length > 0);
        },

        iterationPrinter() {
            let iteration = 0;

            return (function printIteration(queue, top) {
                const [x, y] = this.indexToXY(top.node);
                console.log(`${iteration++}> queue length: ${queue.length}, current node: (${x}, ${y}) @ ${top.priority}`);
            }).bind(this);
        },

        dumpQueue(queue) {
            while (queue.length > 0) {
                const n = queue.dequeue();
                const [x, y] = this.indexToXY(n.node);
                console.log({x, y, ...n});
            }
        }
    };
};
