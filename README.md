# Algorithm Visualizer

An interactive, responsive, and highly performant web application built to demystify complex computer science concepts. This tool provides real-time, 60 FPS visual simulations of pathfinding, graph theory, and sorting mechanics, transforming abstract logical executions into intuitive step-by-step visual states.

---

## 🚀 Live Demo & Repository

* **Production Deployment:** [Live Demo Link](https://algorithm-visualizer-1-ytu0.onrender.com)
* **Source Code:** [GitHub Repository](https://github.com/Md-Shahil/algorithm-visualizer)

---

## 🛠 Core Features

### 1. Pathfinding & Graph Search Suite
The visualizer handles multi-directional grid navigation with real-time tracking of open sets, closed sets, and shortest paths.

* **Dijkstra’s Algorithm:** Weighted search prioritizing the absolute shortest path; guarantees optimality.
* **A* Search:** Heuristic-driven optimized search using Manhattan/Euclidean distance calculations for rapid path targeting.
* **Breadth-First Search (BFS):** Unweighted search exploring level-by-level; guarantees the shortest path on unweighted grids.
* **Depth-First Search (DFS):** Unweighted search plunging deep into branches; optimal for structural exploration but does not guarantee the shortest path.
* **Iterative Deepening DFS (IDDFS):** Combines the space efficiency of DFS with the completeness of BFS by gradually incrementing depth limits.

### 2. Interactive Sandbox Controls
* **Dynamic Obstacle Placement:** Click and drag across the grid to draw impenetrable walls or dense terrain in real time.
* **Adjustable Grid Topologies:** Scale grid configurations dynamically to test how density impacts algorithmic time complexity.
* **Configurable Animation Speeds:** Step-by-step throttling controls driven by asynchronous delays, letting users analyze individual node evaluations or view instant computations.

### 3. Under the Hood Performance
* **60 FPS Non-Blocking Rendering:** Leverages JavaScript Promises and managed microtask queues instead of basic resource-heavy loops. This ensures the browser UI remains completely responsive during heavy graph traversals.
* **State-Driven CSS Architecture:** Grid nodes transition smoothly between unvisited, searching, visited, and shortest-path classes via lightweight, CSS-hardware-accelerated animations.

---

## 📐 Architecture & Structural Flow

The visualizer isolates core computational and mathematical logic from direct DOM modifications, routing both the Grid Engine and the Sorting Engine through a unified asynchronous animation manager.

```text
                      ┌──────────────────────────────────────┐
                      │           User Interface             │
                      │  (Input Controls / Selection Menu)   │
                      └──────────────────┬───────────────────┘
                                         │
                   Determines Mode (Pathfinding vs. Sorting)
                                         │
                    ┌────────────────────┴────────────────────┐
                    ▼                                         ▼
      ┌───────────────────────────┐             ┌───────────────────────────┐
      │    Pathfinding Engine     │             │      Sorting Engine       │
      │ ───────────────────────── │             │ ───────────────────────── │
      │  • Graph Node Matrix      │             │  • Dynamic Array States   │
      │  • Dijkstra, A*, BFS, DFS │             │  • Bubble, Merge, Quick   │
      │  • Wall/Obstacle Maps     │             │  • Swap/Compare Tracking  │
      └─────────────────────┬─────┘             └─────┬─────────────────────┘
                            │                         │
                            └────────────┬────────────┘
                                         │
                           Generates Operation Queue
                                         │
                                         ▼
                      ┌──────────────────────────────────────┐
                      │        Asynchronous Renderer         │
                      │   (Promises, setTimeout, UI Loops)   │
                      └──────────────────┬───────────────────┘
                                         │
                       Updates States and Triggers Classes
                                         ▼
                      ┌──────────────────────────────────────┐
                      │          Real-Time Viewport          │
                      │    (60 FPS Hardware-Accelerated DOM) │
                      └──────────────────────────────────────┘
```

---

## 💻 Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Core** | HTML5 / CSS3 | Structural layout, semantic control nodes, and responsive flex/grid wrappers. |
| **Logic & Engine** | JavaScript (ES6+) | Data structure state control (Adjacency evaluation, priority sorting, heuristics). |
| **Styling/Anim** | Modern CSS | Hardware-accelerated keyframe animations for ultra-smooth fluidic cell updates. |
| **DevOps** | Git & GitHub | Version management, branch tracking, and feature deployment pipelines. |
| **Hosting** | Render | Automated web service hosting tied directly to repository production builds. |

---

## 💡 Challenges & Solutions

Building a real-time visualizer sounds simple on paper, but scaling it exposed a couple of massive frontend performance and architectural bottlenecks. Here is how those challenges were solved:

### 1. The "Frozen Browser" Problem (UI Thread Blocking)
* **The Challenge:** Algorithms execute thousands of logical steps in milliseconds. When trying to animate these steps using standard loop structures, the massive influx of instant DOM updates completely choked the browser's single thread, causing the screen to freeze until the entire computation finished.
* **The Solution:** Decoupled the computational logic from the rendering engine. Instead of drawing on the fly, the algorithm runs instantly in memory and generates an sequential **operation queue**. This queue is then read by an asynchronous worker using JavaScript `Promises` and timed intervals to cleanly stagger the visual states without locking up the UI thread.

### 2. Managing Screen Synchronization at 60 FPS
* **The Challenge:** While animating heavy paths or shifting thousands of bars during a sorting algorithm, constant read/write layout thrashing caused noticeable screen stuttering, micro-lags, and inconsistent animation speeds.
* **The Solution:** Offloaded presentation physics to the GPU. Instead of changing dimensional properties (like heights or positions) via continuous JavaScript computation, the engine applies pre-optimized CSS structural classes. Transitioning states using hardware-accelerated CSS animations ensures buttery-smooth rendering locked right at 60 frames per second.

---

## 🛠 Installation & Local Setup

Since this project runs entirely on native web standards, it has zero external dependencies or heavy build steps. You can set it up locally in under 60 seconds:

```bash
# 1. Clone the repository
git clone [https://github.com/Md-Shahil/algorithm-visualizer.git](https://github.com/Md-Shahil/algorithm-visualizer.git)

# 2. Navigate into the project directory
cd algorithm-visualizer

# 3. Open the project
code .
```






