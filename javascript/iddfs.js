export function iddfs(grid, startNode, endNode) {
  const ROWS = grid.length;
  const COLS = grid[0].length;
  const visitedOrder = [];

  for (let limit = 0; limit < ROWS * COLS; limit++) {
    // We use a Local Visited set for this specific depth run
    const visitedInThisIteration = new Set();
    const path = [];

    if (dls(startNode, limit, visitedInThisIteration, path, limit)) {
      return { visitedOrder, path };
    }
  }
  return { visitedOrder, path: [] };

  function dls(node, limit, visitedInThisIteration, path, currentMaxDepth) {
    const { row, col } = node;
    const key = `${row}-${col}`;

    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return false;
    if (grid[row][col].isWall || visitedInThisIteration.has(key)) return false;

    // VISUALIZER OPTIMIZATION:
    // Only push to visitedOrder if we are at the "new" depth
    // or if you want to see the "pulse", keep it as is.
    visitedOrder.push(grid[row][col]);

    visitedInThisIteration.add(key);
    path.push(grid[row][col]);

    if (row === endNode.row && col === endNode.col) return true;
    if (limit <= 0) {
      path.pop();
      return false;
    }

    // DIRECTION BIAS FIX:
    // Sort directions so it moves toward the endNode first
    // Calculate which directions actually move us closer to the goal
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    directions.sort((a, b) => {
      const distA = Math.abs(row + a[0] - endNode.row) + Math.abs(col + a[1] - endNode.col);
      const distB = Math.abs(row + b[0] - endNode.row) + Math.abs(col + b[1] - endNode.col);
      return distA - distB; // Try the direction with the smaller distance first
    });

    for (const [dr, dc] of directions) {
      const nextNode = { row: row + dr, col: col + dc };
      if (
        dls(nextNode, limit - 1, visitedInThisIteration, path, currentMaxDepth)
      ) {
        return true;
      }
    }

    path.pop();
    // Crucial for DFS performance in grids:
    // We don't "unvisit" here unless we want to find ALL paths.
    return false;
  }
}
