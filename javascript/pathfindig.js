import {aStar} from "./aStar.js";
import {greedyBFS} from "./greedyBFS.js";
import {iddfs} from "./iddfs.js";
import { dijkstra } from "./dijkstra.js";
import { bfs } from "./bfs.js";
import { dfs } from "./dfs.js";

// Grid Configuration
const ROWS = 20;
const COLS = 40;

const gridContainer = document.getElementById("grid-container");

let startNode = null;
let endNode = null;

function setNodeColor(nodeDiv, type) {
  nodeDiv.classList.remove("start-node", "end-node", "wall-node");
  if (type === "start") nodeDiv.classList.add("start-node");
  else if (type === "end") nodeDiv.classList.add("end-node");
  else if (type === "wall") nodeDiv.classList.add("wall-node");
}

function handleNodeClick(e) {
  const nodeDiv = e.target;
  if (!startNode) {
    startNode = nodeDiv;
    setNodeColor(nodeDiv, "start");
  } else if (!endNode && nodeDiv !== startNode) {
    endNode = nodeDiv;
    setNodeColor(nodeDiv, "end");
  } else if (nodeDiv !== startNode && nodeDiv !== endNode) {
    // Toggle wall
    if (nodeDiv.classList.contains("wall-node")) {
      nodeDiv.classList.remove("wall-node");
    } else {
      setNodeColor(nodeDiv, "wall");
    }
  }
}

function createGrid() {
  gridContainer.innerHTML = "";
  startNode = null;
  endNode = null;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const node = document.createElement("div");
      node.className = "node";
      node.dataset.row = row;
      node.dataset.col = col;
      node.addEventListener("click", handleNodeClick);
      gridContainer.appendChild(node);
    }
  }
}
createGrid();


// --- Random Maze Button Logic ---
function generateRandomMaze() {
  const nodeDivs = gridContainer.querySelectorAll(".node");
  // Find start and end nodes (if any)
  let start = null,
    end = null;
  nodeDivs.forEach((div) => {
    if (div.classList.contains("start-node")) start = div;
    if (div.classList.contains("end-node")) end = div;
  });
  // Clear all walls first
  nodeDivs.forEach((div) => div.classList.remove("wall-node"));
  // Add random walls (about 18% of the grid)
  const WALL_PROBABILITY = 0.2; // Adjust this value for density
  nodeDivs.forEach((div) => {
    if (div === start || div === end) return;
    if (Math.random() < WALL_PROBABILITY) {
      div.classList.add("wall-node");
    }
  });
}
document.getElementById("random-maze-btn").addEventListener("click", () => {
  generateRandomMaze();
});


// --- Reset Button Logic ---
function clearAnimations() {
  // Clear all timeouts for animations
  let id = window.setTimeout(() => {}, 0);
  while (id--) {
    window.clearTimeout(id);
  }
}
document.getElementById("reset-btn").addEventListener("click", () => {
  clearAnimations();
  createGrid();
});


// --- Visualization Logic ---
document.getElementById("visualize-btn").addEventListener("click", () => {
  // Build grid data structure
  const grid = [];
  const nodeDivs = gridContainer.querySelectorAll(".node");
  for (let row = 0; row < ROWS; row++) {
    const rowArr = [];
    for (let col = 0; col < COLS; col++) {
      const idx = row * COLS + col;
      const nodeDiv = nodeDivs[idx];
      rowArr.push({
        row,
        col,
        isWall: nodeDiv.classList.contains("wall-node"),
        div: nodeDiv,
      });
    }
    grid.push(rowArr);
  }


  // Find start and end nodes
  let start = null,
    end = null;
  nodeDivs.forEach((div) => {
    if (div.classList.contains("start-node")) {
      start = { row: +div.dataset.row, col: +div.dataset.col };
    }
    if (div.classList.contains("end-node")) {
      end = { row: +div.dataset.row, col: +div.dataset.col };
    }
  });
  if (!start || !end) {
    alert("Please select a start and end node!");
    return;
  }

  // Choose algorithm based on dropdown
  const algoSelect = document.getElementById("algorithm-select");

  let visitedOrder, path;

  const startNode = grid[start.row][start.col];
  const endNode = grid[end.row][end.col];

  if (algoSelect && algoSelect.value === "DFS") {
    ({ visitedOrder, path } = dfs(grid, startNode, endNode));
  } else if (algoSelect && algoSelect.value === "IDDFS") {
    ({ visitedOrder, path } = iddfs(grid, startNode, endNode));
  } else if (algoSelect && algoSelect.value === "Dijkstra") {
    ({ visitedOrder, path } = dijkstra(grid, startNode, endNode));
  } else if (algoSelect && algoSelect.value === "GreedyBFS") {
    ({ visitedOrder, path } = greedyBFS(grid, startNode, endNode));
  } else if (algoSelect && algoSelect.value === "AStar") {
    ({ visitedOrder, path } = aStar(grid, startNode, endNode));
  } else {
    ({ visitedOrder, path } = bfs(grid, startNode, endNode));
  }

  if (!path.length) {
    alert("No path found!");
    return;
  }
  // Animate visited nodes, then path
  animateVisitedAndPath(visitedOrder, path);
});

function animateVisitedAndPath(visitedOrder, path) {
  visitedOrder.forEach((node, i) => {
    if (
      node.div.classList.contains("start-node") ||
      node.div.classList.contains("end-node")
    )
      return;
    setTimeout(() => {
      node.div.style.backgroundColor = "#eed368"; // yellow for visited
    }, 20 * i);
  });
  // Animate path after all visited
  setTimeout(
    () => {
      path.forEach((node, i) => {
        if (i === 0 || i === path.length - 1) return; // skip start/end
        setTimeout(() => {
          node.div.style.backgroundColor = "#b794f4"; // purple for path
        }, 40 * i);
      });
    },
    20 * visitedOrder.length + 100,
  );
}
