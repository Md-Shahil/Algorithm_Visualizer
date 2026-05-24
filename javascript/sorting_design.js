document.addEventListener("DOMContentLoaded", () => {
    
    const sizeSlider = document.getElementById("size");
    const sizeValue = document.getElementById("sizeValue");
    const arrayContainer = document.getElementById("array");
    const startBtn = document.getElementById("start");
    const resetBtn = document.getElementById("reset");
    const algoSelect = document.getElementById("algo");
    const speedSlider = document.getElementById("speed");

    let array = [];
    let isSorting = false;
    let SPEED = speedSlider.value;
    let SIZE = sizeSlider.value;

    // Performamce matrix
    let comparisons = 0;
    let swaps = 0;
    let startTime = 0;
    let endTime = 0;

    sizeValue.textContent = SIZE;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    } 

    function updateMetrics() {
    document.getElementById("comparisons").textContent = comparisons;
    document.getElementById("swaps").textContent = swaps;

    // live time while sorting
    const currentTime = isSorting
        ? performance.now() - startTime
        : endTime - startTime;

    document.getElementById("time").textContent =
        Math.max(0, Math.floor(currentTime)) + " ms";
    } 

    // Generate randome array
    function generateArray() {
        if (isSorting) return;

        array = [];
        arrayContainer.innerHTML = "";

        for (let i = 0; i < SIZE; i++) {
            const value = Math.floor(Math.random() * 250) + 20;
            array.push(value);

            const bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.height = value + "px";
            bar.style.width = `${100 / SIZE}%`;

            arrayContainer.appendChild(bar);
        }
    }

    // Working of Size button
    sizeSlider.addEventListener("input", () => {
        SIZE = sizeSlider.value;
        sizeValue.textContent = SIZE;
        generateArray();
    });

    // Speed Slider event
    const MAX_SPEED = 300;
    speedSlider.addEventListener("input", () => {
    SPEED = MAX_SPEED - speedSlider.value;
    });

    // Working of Reset button
    resetBtn.addEventListener("click", () => {
    if (isSorting) return;

    // Reset metrics
    comparisons = 0;
    swaps = 0;
    startTime = 0;
    endTime = 0;
    
    // Update UI
    document.getElementById("comparisons").textContent = 0;
    document.getElementById("swaps").textContent = 0;
    document.getElementById("time").textContent = "0 ms";

    generateArray();
});


    // Working of Start button
    startBtn.addEventListener("click", async () => {
        if (isSorting) return;
        isSorting = true;

        comparisons = 0;
        swaps = 0;
        startTime = performance.now();
        updateMetrics(); 

        const algo = algoSelect.value;

        if (algo === "bubble") await bubbleSort();
        else if (algo === "selection") await selectionSort();
        else if (algo === "insertion") await insertionSort();
        else if (algo === "merge") await mergeSortWrapper();
        else if (algo === "quick") await quickSortWrapper();
        else if (algo === "heap") await heapSort();

        endTime = performance.now();
        updateMetrics();

        isSorting = false;
    });

     generateArray();

});