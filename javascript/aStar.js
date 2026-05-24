export function aStar(grid, startNode, endNode) {
    const visitedOrder = [];
    const ROWS = grid.length;
    const COLS = grid[0].length;

    // Manhattan distance heuristic
    const getHeuristic = (node, target) => {
        return Math.abs(node.row - target.row) + Math.abs(node.col - target.col);
    };

    const dist = Array.from({ length: ROWS }, () => Array(COLS).fill(Infinity));
    const fScore = Array.from({ length: ROWS }, () => Array(COLS).fill(Infinity));
    const prev = new Map();
    const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

    dist[startNode.row][startNode.col] = 0;
    fScore[startNode.row][startNode.col] = getHeuristic(startNode, endNode);

    // PQ stores: row, col, f (total cost), g (distance from start)
    let pq = [{ 
        row: startNode.row, 
        col: startNode.col, 
        f: fScore[startNode.row][startNode.col],
        g: 0 
    }];

    while (pq.length > 0) {
        // Sort by total estimated cost (f)
        pq.sort((a, b) => a.f - b.f);
        const { row, col, g } = pq.shift();

        if (visited[row][col]) continue;
        visited[row][col] = true;

        visitedOrder.push(grid[row][col]);

        if (row === endNode.row && col === endNode.col) break;

        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        for (const [dr, dc] of directions) {
            const nRow = row + dr;
            const nCol = col + dc;

            if (nRow >= 0 && nRow < ROWS && nCol >= 0 && nCol < COLS && !grid[nRow][nCol].isWall) {
                const weight = grid[nRow][nCol].weight || 1;
                const tentativeGScore = g + weight;

                if (tentativeGScore < dist[nRow][nCol]) {
                    dist[nRow][nCol] = tentativeGScore;
                    const h = getHeuristic({row: nRow, col: nCol}, endNode);
                    fScore[nRow][nCol] = tentativeGScore + h;
                    
                    prev.set(`${nRow}-${nCol}`, { row, col });
                    pq.push({ 
                        row: nRow, 
                        col: nCol, 
                        f: fScore[nRow][nCol], 
                        g: tentativeGScore 
                    });
                }
            }
        }
    }

    // Reconstruction
    let path = [];
    let curr = { row: endNode.row, col: endNode.col };
    while (curr) {
        path.unshift(grid[curr.row][curr.col]);
        if (curr.row === startNode.row && curr.col === startNode.col) break;
        curr = prev.get(`${curr.row}-${curr.col}`);
    }

    return { visitedOrder, path: path.length > 1 ? path : [] };
}