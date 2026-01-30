// Dijkstra's Algorithm Implementation (with visited order)
export function dijkstra(grid, startNode, endNode) {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    const visitedOrder = [];
    const prev = new Map();
    const dist = Array.from({ length: ROWS }, () => Array(COLS).fill(Infinity));
    const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

    dist[startNode.row][startNode.col] = 0;
    let pq = [{ row: startNode.row, col: startNode.col, dist: 0 }];

    function nodeKey(r, c) { return `${r}-${c}`; }

    while (pq.length > 0) {
        pq.sort((a, b) => a.dist - b.dist);
        const { row, col } = pq.shift();

        if (visited[row][col]) continue;
        visited[row][col] = true;
        
        const node = grid[row][col];
        visitedOrder.push(node);

        if (row === endNode.row && col === endNode.col) break;

        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        for (const [dr, dc] of directions) {
            const nRow = row + dr;
            const nCol = col + dc;

            if (nRow >= 0 && nRow < ROWS && nCol >= 0 && nCol < COLS && !grid[nRow][nCol].isWall) {
                if (!visited[nRow][nCol]) {
                    const weight = grid[nRow][nCol].weight || 1; 
                    const alt = dist[row][col] + weight;

                    if (alt < dist[nRow][nCol]) {
                        dist[nRow][nCol] = alt;
                        // Store the coordinates of the parent
                        prev.set(nodeKey(nRow, nCol), { row, col }); 
                        pq.push({ row: nRow, col: nCol, dist: alt });
                    }
                }
            }
        }
    }

    // Path Reconstruction
    const path = [];
    let curr = { row: endNode.row, col: endNode.col };

    // This loop is now safe from infinite runs
    while (curr) {
        path.unshift(grid[curr.row][curr.col]);
        if (curr.row === startNode.row && curr.col === startNode.col) break;
        
        const key = nodeKey(curr.row, curr.col);
        curr = prev.get(key); // If no path, curr becomes undefined and loop ends
    }

    // If the first node in path isn't the startNode, no path was found
    if (path.length > 0 && (path[0].row !== startNode.row || path[0].col !== startNode.col)) {
        return { visitedOrder, path: [] };
    }

    return { visitedOrder, path };
}