// Depth-First Search (DFS) Algorithm Implementation
export function dfs(grid, startNode, endNode) {
    const visited = new Set();
    const prev = new Map();
    const visitedOrder = [];

    function dfs(node) {
        let key = nodeToString(node);
        if (visited.has(key) || node.isWall) return false;
        visited.add(key);
        visitedOrder.push(node);

        if (node.row === endNode.row && node.col === endNode.col) {
            return true;
        }

        // Always go down, right, up, left
        let neighbors = [];
        const directions = [
            [-1, 0],  // up
            [0, -1],  // left
            [1, 0], // down
            [0, 1]  // right
        ];
        for (const [dr, dc] of directions) {
            const newRow = node.row + dr;
            const newCol = node.col + dc;
            if (
                newRow >= 0 && newRow < grid.length &&
                newCol >= 0 && newCol < grid[0].length &&
                !grid[newRow][newCol].isWall
            ) {
                neighbors.push(grid[newRow][newCol]);
            }
        }
        for (let neighbor of neighbors) {
            let neighborKey = nodeToString(neighbor);
            if (!visited.has(neighborKey)) {
                prev.set(neighborKey, node);
                if (dfs(neighbor)) {
                    return true;
                }
            }
        }
        return false;
    }

    const found = dfs(startNode);
    const path = found ? reconstructPath(prev, startNode, endNode) : [];
    return { visitedOrder, path };
}



// Helper to convert node to string for Set/Map
function nodeToString(node) {
    return `${node.row},${node.col}`;
}

// Helper to check if two nodes are the same
function isSameNode(a, b) { 
    return a.row === b.row && a.col === b.col;
}

// Helper to get valid neighbors (up, down, left, right, not walls)
function getNeighbors(grid, node) {
    const { row, col } = node;
    const neighbors = [];
    const directions = [
        [0, 1], [1, 0], [0, -1], [-1, 0]
    ];
    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (
            newRow >= 0 && newRow < grid.length &&
            newCol >= 0 && newCol < grid[0].length &&
            !grid[newRow][newCol].isWall
        ) {
            neighbors.push(grid[newRow][newCol]);
        }
    }
    return neighbors;
}

// Helper to reconstruct path from prev map
function reconstructPath(prev, startNode, endNode) {
    const path = [];
    let current = endNode;
    while (!isSameNode(current, startNode)) {
        path.unshift(current);
        const key = nodeToString(current);
        current = prev.get(key);
        if (!current) return [];
    }
    path.unshift(startNode);
    return path;
}