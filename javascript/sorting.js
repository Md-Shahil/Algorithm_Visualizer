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

    // Bubble sort
    async function bubbleSort() {
    const bars = document.querySelectorAll(".bar");

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            // Reset all previous highlights except sorted bars
            for (let k = 0; k < array.length - i; k++) {
                bars[k].style.backgroundColor = "#38bdf8"; // default color
            }

            // Highlight only the current bar
            bars[j].style.backgroundColor = "#facc15";

            // Swap if needed
            comparisons++;
            if (array[j] > array[j + 1]) { 
                swaps++;
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                bars[j].style.height = array[j] + "px";
                bars[j + 1].style.height = array[j + 1] + "px";
            }

            await sleep(SPEED);
        }

        // Mark last sorted bar as green
        bars[array.length - i - 1].style.backgroundColor = "#22c55e";
    }
}


    // Selection sort
    async function selectionSort() {
        const bars = document.querySelectorAll(".bar");

        for (let i = 0; i < array.length; i++) {
            let min = i;
            bars[min].style.backgroundColor = "#ef4444";

            for (let j = i + 1; j < array.length; j++) {
                comparisons++;         
                updateMetrics(); 

                bars[j].style.backgroundColor = "#facc15";

                if (array[j] < array[min]) {
                    bars[min].style.backgroundColor = "#38bdf8";
                    min = j;
                    bars[min].style.backgroundColor = "#ef4444";
                }

                await sleep(SPEED);
                if (j !== min) bars[j].style.backgroundColor = "#38bdf8";
            }

            if (min !== i) {            
                swaps++;                
                updateMetrics();        
            }

            [array[i], array[min]] = [array[min], array[i]];
            bars[i].style.height = array[i] + "px";
            bars[min].style.height = array[min] + "px";

            bars[min].style.backgroundColor = "#38bdf8";
            bars[i].style.backgroundColor = "#22c55e";
    }
}

    // Insertion sort
    async function insertionSort() {
    const bars = document.querySelectorAll(".bar");

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = "#facc15";

        while (j >= 0) {
            comparisons++;              // comparison happens here

            if (array[j] > key) {
                array[j + 1] = array[j];
                bars[j + 1].style.height = array[j] + "px";
                j--;
                updateMetrics();
                await sleep(SPEED);
            } else {
                break;
            }
        }

        array[j + 1] = key;
        bars[j + 1].style.height = key + "px";

        swaps++;                       
        updateMetrics();

        bars[i].style.backgroundColor = "#38bdf8";
    }

    bars.forEach(bar => bar.style.backgroundColor = "#22c55e");
}

    // Merge sort
    async function mergeSortWrapper() {
    await mergeSort(0, array.length - 1);

    document.querySelectorAll(".bar").forEach(bar => {
        bar.style.backgroundColor = "#22c55e";
    });
}

async function mergeSort(l, r) {
        if (l >= r) return;

        const mid = Math.floor((l + r) / 2);
        await mergeSort(l, mid);
        await mergeSort(mid + 1, r);
        await merge(l, mid, r);
}       

async function merge(l, mid, r) {
            const bars = document.querySelectorAll(".bar");

            const left = array.slice(l, mid + 1);
            const right = array.slice(mid + 1, r + 1);

            let i = 0, j = 0, k = l;

            while (i < left.length && j < right.length) {
                comparisons++;
                bars[k].style.backgroundColor = "#facc15";
                updateMetrics();

                await sleep(SPEED);

            if (left[i] <= right[j]) {
                array[k] = left[i++];
            } else {
                 array[k] = right[j++];
            }
                swaps++;
                bars[k].style.height = array[k] + "px";
                bars[k].style.backgroundColor = "#ef4444";
                updateMetrics();

            await sleep(SPEED);

            bars[k].style.backgroundColor = "#38bdf8";
            k++;
        }

        while (i < left.length) {
            array[k] = left[i++];
            bars[k].style.height = array[k] + "px";
            k++;
        }

        while (j < right.length) {
            array[k] = right[j++];
            bars[k].style.height = array[k] + "px";
            k++;
    }
}

    // Quick sort 
    async function quickSortWrapper() {
    await quickSort(0, array.length - 1);

    document.querySelectorAll(".bar").forEach(bar => {
        bar.style.backgroundColor = "#22c55e";
    });
}

async function quickSort(low, high) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    const bars = document.querySelectorAll(".bar");
    const pivot = array[high];
    bars[high].style.backgroundColor = "#ef4444";

    let i = low - 1;

    for (let j = low; j < high; j++) {
        comparisons++;
        bars[j].style.backgroundColor = "#facc15";
        updateMetrics();
        await sleep(SPEED);

        if (array[j] < pivot) {
            i++;
            swaps++;

            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = array[i] + "px";
            bars[j].style.height = array[j] + "px";
            updateMetrics();
        }

        bars[j].style.backgroundColor = "#38bdf8";
    }

    swaps++;
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    bars[i + 1].style.height = array[i + 1] + "px";
    bars[high].style.height = array[high] + "px";
    updateMetrics();

    bars[high].style.backgroundColor = "#38bdf8";
    bars[i + 1].style.backgroundColor = "#22c55e";

    await sleep(SPEED);
    return i + 1;
}

    //Heap sort
    async function heapSort() {
    const bars = document.querySelectorAll(".bar");

    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        await heapify(array.length, i);
    }

    for (let i = array.length - 1; i > 0; i--) {
        swaps++;
        [array[0], array[i]] = [array[i], array[0]];
        bars[0].style.height = array[0] + "px";
        bars[i].style.height = array[i] + "px";
        bars[i].style.backgroundColor = "#22c55e";
        updateMetrics();

        await sleep(SPEED);
        await heapify(i, 0);
    }

    bars[0].style.backgroundColor = "#22c55e";
}

async function heapify(n, i) {
    const bars = document.querySelectorAll(".bar");

    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n) {
        comparisons++;
        bars[l].style.backgroundColor = "#facc15";
        updateMetrics();
        await sleep(SPEED);

        if (array[l] > array[largest]) largest = l;
        bars[l].style.backgroundColor = "#38bdf8";
    }

    if (r < n) {
        comparisons++;
        bars[r].style.backgroundColor = "#facc15";
        updateMetrics();
        await sleep(SPEED);

        if (array[r] > array[largest]) largest = r;
        bars[r].style.backgroundColor = "#38bdf8";
    }

    if (largest !== i) {
        swaps++;
        [array[i], array[largest]] = [array[largest], array[i]];
        bars[i].style.height = array[i] + "px";
        bars[largest].style.height = array[largest] + "px";
        bars[i].style.backgroundColor = "#ef4444";
        bars[largest].style.backgroundColor = "#ef4444";
        updateMetrics();

        await sleep(SPEED);

        bars[i].style.backgroundColor = "#38bdf8";
        bars[largest].style.backgroundColor = "#38bdf8";

        await heapify(n, largest);
    }
}

    generateArray();
});

