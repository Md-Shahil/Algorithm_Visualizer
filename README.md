# Algorithm Visualizer

A responsive and high‑performance web application designed to simplify complex computer science concepts. The platform delivers real‑time, 60 FPS visual simulations that illustrate pathfinding algorithms, graph theory, and sorting techniques. By converting abstract logic into clear, step‑by‑step visual states, it enables users to intuitively understand and engage with fundamental computational processes.
---

## 🚀 Live Demo & Repository

* **Production Deployment:** [Live Demo Link](https://algorithm-visualizer-1-ytu0.onrender.com)
* **Source Code:** [GitHub Repository](https://github.com/Md-Shahil/Algorithm_Visualizer.git)

---

## 🛠 Features

### 1. Pathfinding
Think of this like a interactive, mini Google Maps. The application finds the absolute best path between a start point and an end point using different mathematical strategies:

* 🧭 **Dijkstra’s Algorithm:** Safely explores every single option around it to guarantee it finds the absolute shortest path.
* 🧠 **A Star Search:** A smart search engine that uses a distance guessing trick (heuristics) to find the target significantly faster.
* 🌊 **Breadth-First Search (BFS):** Explores equally in all directions, layer by layer, like ripples spreading out in water.
* 🌲 **Depth-First Search (DFS):** Picks one direction and runs down it as far as possible before backing up to try another way.
* 🔍 **Iterative Deepening:** Starts like a cautious explorer, checking short distances first, then looking deeper step-by-step.

### 2. Sorting
This feature takes a messy bunch of vertical bars of different heights and organizes them from shortest to tallest right in front of your eyes:

* 🫧 **Bubble Sort:** Compares two bars side-by-side and swaps them if they are out of order, slowly bubbling the tallest bars to the very end.
* 🔎 **Selection Sort:** Scans the entire list to find the shortest remaining bar, moves it directly to the front, and repeats.
* 🃏 **Insertion Sort:** Picks up one bar at a time and slides it backward into its correct spot, just like sorting a hand of playing cards.
* 🪓 **Merge Sort:** Slices the messy bars into tiny groups, sorts those tiny groups, and smoothly glues them back together.
* ⚡ **Quick Sort:** Picks one bar as a benchmark, throws all shorter bars to the left and all taller bars to the right, then repeats.

### 3. Interactive Controls 
* 🧱 **Draw Your Own Walls:** Click and drag your mouse across the grid to build impenetrable walls. The pathfinders will automatically recalculate and navigate around your obstacles in real time.
* 🎲 **Randomize Data:** Instantly generate a completely randomized array of sorting bars or reset your maze grid layout with a single click.
* 🎛️ **Speed Slider:** Speed up the animation to see the final calculation instantly, or slow it down to watch how every single swap and node step happens.

### 4. Smooth & Fast Performance
* 🚫 **No Frozen Screens:** Sometimes running these heavy math calculations can freeze a webpage. This app uses a smart queuing system that calculates answers instantly in memory, keeping the interface fully responsive.
* 🎨 **Color-Coded Transitions:** The bars and grid squares use smooth, bright color changes to show exactly what the algorithm is thinking (e.g., green for checking, red for swapping/visiting, and yellow for the final perfect path).

---

## 📐 Architecture

The visualizer isolates core computational logic from direct DOM updates, ensuring clean data handling.

```text
                      ┌──────────────────────────────────────┐
                      │           User Interface             │
                      │  (Input Controls / Selection Menu)   │
                      └──────────────────┬───────────────────┘
                                         │
                     User Selects: Pathfinding OR Sorting Mode
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
                      │      Smooth 60 FPS Performance       │
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

## 💡 Challenges & Fixes

Building a real-time visualizer sounds easy, but scaling it revealed big performance and design issues. Here’s how they were solved:

---

### 1. The "Frozen Browser" Issue
- **Problem:** Algorithms run thousands of steps in seconds. Updating the screen at every step blocks the browser’s main thread, freezing the page.  
- **Examples:**  
  - **Pathfinding:** Coloring thousands of grid cells at once locks the UI.  
  - **Sorting:** Recursive loops in Merge Sort or Quick Sort stall the interface.  
- **Fix:** Split logic from visuals. The algorithm builds an **operation queue** instantly, while a timing controller (using Promises and `setTimeout`) plays it back slowly, keeping the UI smooth.

---

### 2. Screen Stuttering During Animations
- **Problem:** Rapid color changes or element swaps force the browser to recalculate pixels thousands of times, causing lag.  
- **Examples:**  
  - **Pathfinding:** Changing hundreds of grid block colors at once.  
  - **Sorting:** Moving bars or resizing them too quickly.  
- **Fix:** Use **GPU Hardware Acceleration**. Instead of recalculating positions in JavaScript, swap CSS class names (like `visited` or `swapping`). The graphics card handles smooth transitions at 60 FPS.

---

### 3. Interruptions Breaking Animations
- **Problem:** If a user resets or switches modes mid-animation, old loops keep running. This causes ghost paths, flashing blocks, or broken bar heights.  
- **Examples:**  
  - **Pathfinding:** Reset leaves leftover paths or clears walls unexpectedly.  
  - **Sorting:** Changing array size mid-sort crashes with “undefined” errors.  
- **Fix:** Added a global **Animation Abort Signal**. Reset instantly cancels all active promises and clears the queue, restoring a clean slate before new actions.

---

### 4. Scaling Limits with Large Data
- **Problem:** Works fine with small datasets, but huge grids or arrays overload memory and slow performance.  
- **Examples:**  
  - **Pathfinding:** Deep recursive loops hit memory limits.  
  - **Sorting:** Millions of micro-operations flood memory.  
- **Fix:** Added **Dynamic Scale Limits** and **Batch Updates**. The app caps slider sizes to safe limits and groups multiple steps into single-frame bursts, keeping performance stable even with large inputs.

---

## 🛠 How to run locally

Since this project runs entirely on native web standards, it has zero external dependencies or heavy build steps. You can set it up locally in under 60 seconds:

```bash
# 1. Clone the repository
git clone [https://github.com/Md-Shahil/algorithm-visualizer.git](https://github.com/Md-Shahil/algorithm-visualizer.git)

# 2. Navigate into the project directory
cd algorithm-visualizer

# 3. Open the project
code .
```

