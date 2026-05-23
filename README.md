# Algorithm Visualizer

An interactive web application built to make complex computer science algorithms easy to see and understand. This tool provides smooth, real-time visual simulations of both **map-navigation (pathfinding)** and **data-sorting** mechanics. Instead of just looking at raw code or numbers, users can watch exactly how these algorithms make decisions, step-by-step, through clear color-coded animations.

---

## 🚀 Live Demo & Repository

* **Production Deployment:** [Live Demo Link](https://algorithm-visualizer-1-ytu0.onrender.com)
* **Source Code:** [GitHub Repository](https://github.com/Md-Shahil/algorithm-visualizer)

---

## 🛠 Core Features

### 1. Map Navigation & Pathfinding
Think of this like a mini Google Maps. The app finds the best path between a start point and an end point using different mathematical strategies:

* **Dijkstra’s Algorithm:** Safely explores every option around it to guarantee it finds the absolute shortest path.
* **A* Search:** A smart search engine that uses a "compass" trick to guess where the target is, finding the path much faster.
* **Breadth-First Search (BFS):** Explores equally in all directions, layer by layer, like ripples in water.
* **Depth-First Search (DFS):** Picks one direction and runs down it as far as possible before backing up to try another way.
* **Iterative Deepening:** Starts like a cautious explorer, checking short distances first, then looking deeper step-by-step.

### 2. Data Sorting Visualizer
This feature takes a messy bunch of vertical bars of different heights and organizes them from shortest to tallest right in front of your eyes:

* **Bubble Sort:** Compares two bars side-by-side and swaps them if they are in the wrong order, slowly bubbling the tallest bars to the end.
* **Selection Sort:** Scans the whole list to find the shortest bar, moves it to the front, and repeats.
* **Insertion Sort:** Picks up one bar at a time and slides it backward into its correct spot, like sorting a hand of playing cards.
* **Merge Sort:** Slices the messy bars into tiny groups, sorts those tiny groups, and smoothly glues them back together.
* **Quick Sort:** Picks one bar as a benchmark, throws all shorter bars to the left and all taller bars to the right, then repeats.

### 3. Interactive Controls (The Sandbox)
* **Draw Your Own Walls:** Click and drag your mouse across the grid to build walls. The pathfinders will have to recalculate and navigate around your obstacles in real time.
* **Randomize Data:** Instantly generate a completely randomized array of sorting bars or reset your maze grid with a single click.
* **Speed Slider:** Speed up the animation to see the final result instantly, or slow it down to watch how every single swap and step happens.

### 4. Smooth & Fast Performance
* **No Frozen Screens:** Sometimes running these math calculations can freeze a web page. This app uses a smart queuing system that calculates the answer instantly in the background, keeping the screen fully responsive.
* **Color-Coded Transitions:** The bars and grid squares use smooth, bright color changes to show exactly what the algorithm is thinking (e.g., Green for checking, Red for swapping, and Yellow for the final perfect path).

---

## 📐 Architecture & Structural Flow

The visualizer isolates core computational and mathematical logic from direct DOM modifications, routing both the Grid Engine and the Sorting Engine through a unified asynchronous animation manager.

```text
                      ┌──────────────────────────────────────┐
                      │           User Interface             │
                      │  (Choose your mode and animation)    │
                      └──────────────────┬───────────────────┘
                                         │
                     You choose either Pathfinding or Sorting
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
                       Sends Color & Smooth Movement Updates
                                         ▼
                      ┌──────────────────────────────────────┐
                      │          Live Visual Screen          │
                      │  (Hardware-Accelerated UI Rendering) │
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
* **The Challenge:** Algorithms execute thousands of logical steps in a split second. Trying to update the screen on every single step using standard loops chokes the browser's single main thread. This causes the entire webpage to lock up and freeze until the calculation is completely finished.
* **Separation of Impact:**
  * **In Pathfinding:** When searching a massive grid, algorithms like Dijkstra or BFS loop through thousands of cells to check neighbors. Trying to color those cells inside the loop freezes the page.
  * **In Sorting:** When organizing data, algorithms like Merge Sort or Quick Sort perform thousands of rapid value comparisons. Running these heavy recursive loops causes the interface to stall.
* **The Solution:** Separated the core computational logic from the visual rendering engine. Instead of drawing elements on the fly, the algorithm runs instantly in the background and builds a step-by-step master plan called an **operation queue**. A timing controller then reads this queue slowly using JavaScript `Promises` and `setTimeout`, cleanly pacing out the visuals without locking up the user interface.

### 2. Eliminating Screen Stuttering during Swaps & Graph Searches
* **The Challenge:** Constantly changing element sizes or altering colors across a massive layout in rapid succession causes severe visual lag. Forcing the browser to manually recalculate pixel positions thousands of times creates noticeable micro-lags, ruining the animation smoothness.
* **Separation of Impact:**
  * **In Pathfinding:** The stutter happens when changing the background colors of hundreds of grid blocks simultaneously as the search wave expands across the matrix.
  * **In Sorting:** The stutter happens when physically moving bar elements around or changing their heights on the screen during high-speed element swaps.
* **The Solution:** Offloaded the heavy visual drawing from the main processor (CPU) to the graphics card (GPU) using **Hardware Acceleration**. Instead of using JavaScript to constantly recalculate individual element positions, the engine simply swaps pre-optimized CSS class names (like `swapping` or `visited`). The browser's graphics hardware then handles the smooth color transitions and movements, keeping the display locked at a seamless 60 frames per second.

### 3. Handling Mid-Animation Interruptions (State Corruption)
* **The Challenge:** If a user clicks "Reset" or switches modes while an animation is actively running, the background timer loops don't automatically stop. New animations clash with old ones still trapped in the pipeline, causing random flashing blocks on the grid and broken, corrupted bar heights on the sorting canvas.
* **Separation of Impact:**
  * **In Pathfinding:** Resetting mid-search leaves ghost paths floating around, or causes walls to unexpectedly clear themselves because the old algorithm is still running in the background.
  * **In Sorting:** Changing the array size mid-sort causes the old running loop to look for bar elements that no longer exist, crashing the application with an "undefined" reference error.
* **The Solution:** Implemented a global **Animation Abort Signal**. When a user clicks Reset or switches modes, a cancel token instantly kills all active promises and flushes out the pending operation queue. This cleanly resets the state of both the grid matrix and the array data back to a clean slate before any new actions can begin.

### 4. Scale & Input Limitations (The Data Influx Bottleneck)
* **The Challenge:** The visualizer works perfectly with small datasets. However, if a user generates a massive grid or hundreds of sorting bars, the browser has to track and manipulate thousands of individual elements simultaneously, causing the app's performance to crawl to a painful halt.
* **Separation of Impact:**
  * **In Pathfinding:** On massive grids, algorithms like Depth-First Search (DFS) can go so deep into recursive loops that they hit browser memory limits, while rendering the thousands of resulting grid blocks causes heavy layout lag.
  * **In Sorting:** Complex algorithms execute so fast that a large array creates millions of micro-operations, completely flooding the computer's memory with animation steps.
* **The Solution:** Added **Dynamic Scale Capping** and **Batch Updates**. The application automatically matches the maximum slider limits to what the browser can safely handle without dropping performance. Furthermore, when rendering massive datasets, the visualizer stops animating every single tiny swap individually. Instead, it groups multiple steps together and updates them in single-frame bursts, keeping the application fast and responsive regardless of data size.

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






