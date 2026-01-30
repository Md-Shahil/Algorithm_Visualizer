export function greedyBFS(grid, startNode, endNode) {
    const visitedOrder = [];
    const ROWS = grid.length;
    const COLS = grid[0].length;
    
    // Manhattan Distance Heuristic
    const getHeuristic = (node) => {
        return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
    };

    const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    const prev = new Map();
    const nodeKey = (r, c) => `${r}-${c}`;

    // Priority Queue: sorted by heuristic only
    let pq = [{ 
        row: startNode.row, 
        col: startNode.col, 
        h: getHeuristic(startNode) 
    }];

    while (pq.length > 0) {
        // Always pick the node that looks closest to the end
        pq.sort((a, b) => a.h - b.h);
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

            if (nRow >= 0 && nRow < ROWS && nCol >= 0 && nCol < COLS && 
                !grid[nRow][nCol].isWall && !visited[nRow][nCol]) {
                
                const neighbor = grid[nRow][nCol];
                const key = nodeKey(nRow, nCol);
                
                // If we haven't seen this node or found it in the PQ, add it
                if (!prev.has(key)) {
                    prev.set(key, { row, col });
                    pq.push({ 
                        row: nRow, 
                        col: nCol, 
                        h: getHeuristic(neighbor) 
                    });
                }
            }
        }
    }

    // Path Reconstruction (Same as your working Dijkstra)
    const path = [];
    let curr = { row: endNode.row, col: endNode.col };
    while (curr) {
        path.unshift(grid[curr.row][curr.col]);
        if (curr.row === startNode.row && curr.col === startNode.col) break;
        curr = prev.get(nodeKey(curr.row, curr.col));
    }

    return { visitedOrder, path: path.length > 1 ? path : [] };
}