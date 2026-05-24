// Breadth-First Search (BFS) Algorithm Implementation
export function bfs(grid, startNode, endNode) {
    const queue = [];
    const visited = new Set();
    const prev = new Map();
    const visitedOrder = [];

    queue.push(startNode);
    visited.add(nodeToString(startNode));

    while (queue.length > 0) {
        const current = queue.shift();
        visitedOrder.push(current);
        if (isSameNode(current, endNode)) {
            return { visitedOrder, path: reconstructPath(prev, startNode, endNode) };
        }
        const neighbors = getNeighbors(grid, current);
        for (const neighbor of neighbors) {
            const key = nodeToString(neighbor);
            if (!visited.has(key)) {
                queue.push(neighbor);
                visited.add(key);
                prev.set(key, current);
            }
        }
    }
    return { visitedOrder, path: [] };
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
    // Prioritize direction
    const directions = [
        [-1, 0], // up
        [0, -1], // left
        [0, 1],  // right
        [1, 0]   // down
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
