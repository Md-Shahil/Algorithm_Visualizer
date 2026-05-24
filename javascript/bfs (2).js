// Breadth-First Search (BFS) Algorithm Implementation
function bfs(grid, startNode, endNode) {
    // Simple and easy-to-understand BFS function
    let queue = [startNode];
    let visited = new Set();
    visited.add(nodeToString(startNode));

    while (queue.length > 0) {
        let current = queue.shift();
        // If we reached the end node, return true
        if (current.row === endNode.row && current.col === endNode.col) {
            return true;
        }
        // Get all neighbors of the current node
        let neighbors = getNeighbors(grid, current);
        // Check each neighbor
        for (let neighbor of neighbors) {
            let key = nodeToString(neighbor);
            // If neighbor is not visited, add to queue and mark as visited
            if (!visited.has(key)) {
                queue.push(neighbor);
                visited.add(key);
            }
        }
    }
    // If we finish the loop without finding the end, return false
    return false;
}
